    /*****************conection 4 servidor*********************/

    const express = require ('express')
   const session = require('express-session');
    const dotenv = require('dotenv')
    const cookie = require('cookie-parser')
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const jwt = require('jsonwebtoken');

    dotenv.config()

    const server = express()

    const PORT = process.env.PORT || 3000 

    const router_login_logout_verify = require('./src/routes/login_routes')
    const routerusuario = require('./src/routes/usuario_routes')
    const routerperfil = require('./src/routes/perfil_routes')
    const routerdashboard = require('./src/routes/dashboard_routes')
    const routermiembro = require('./src/routes/miembro_routes')
    const routerministerio = require('./src/routes/ministerio_routes')
    const routertipo_egreso = require('./src/routes/tipo_egresos_router')
    const routertipo_ingreso = require('./src/routes/tipo_ingresos_routes')    
    const routeringreso = require('./src/routes/ingreso_routes')
    const routerlista = require('./src/routes/lista_routes')
    const routeregreso = require('./src/routes/egreso_routes')


    // Configurar express-session
    server.use(session({
        secret: 'secretkey', // Clave secreta para firmar las cookies de sesión
        resave: true,
        saveUninitialized: true
    }));
  
    // Habilitar CORS para permitir solicitudes desde http://127.0.0.1:5500
    const corsOptions = {
        origin: 'http://127.0.0.1:5500', // Permitir solicitudes solo desde este origen
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'], // Métodos permitidos
        allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization'], // Encabezados permitidos
        credentials: true // Permitir el intercambio de cookies entre orígenes
    }
    /* server.use((req,res , next)=>{
        res.setHeader("Access-Control-Allow-Origin","*")
        res.setHeader("Access-Control-Allow-Methods","*")
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Allow-Credentials",true)
        next()
    }) */

    server.use(cookie());
    server.use(bodyParser.json());
    server.use(cors(corsOptions)); // Habilitar CORS con las opciones definidas

    // Define un middleware de autenticación
    const authMiddleware = (req, res, next) => {
        // Obtener el token de la solicitud (desde el encabezado Authorization)
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        //console.log("Token JWT:", token); // Imprimir el token JWT en la consola

        if (!token) {
        // Si no hay token, el usuario no está autenticado
        return res.status(401).json({ message: "Acceso no autorizado" });
        }
    
        try {
        // Verificar el token
        const decoded = jwt.verify(token, 'secretkey');
        //console.log(decoded)

        //console.log("Token JWT:", decoded); // Imprimir el token JWT en la consola
        req.user = decoded;
        // Verificar si isAuthenticated está presente y es true
        if (decoded.isAuthenticated === true) {
            // El usuario está autenticado, continuar con la solicitud
            next();
        } else {
            // Si no hay token, el usuario no está autenticado
            // Redirigir al usuario a la página de inicio de sesión
            console.log("REDIRECCIONAR")
            return res.redirect("http://127.0.0.1:5500/frond/Z.administrador/usuarios.html");
        }
        } catch (error) {
        // Error al verificar el token
        return res.status(401).json({ message: "Token inválido" });
        } 
    }; 

    server.use('/ADB', router_login_logout_verify )
    server.use('/ADB',authMiddleware, routerusuario )
    server.use('/ADB',authMiddleware, routerperfil)
    server.use('/ADB',authMiddleware, routerdashboard)
    server.use('/ADB',authMiddleware, routermiembro )
    server.use('/ADB',authMiddleware, routerministerio )
    server.use('/ADB',authMiddleware, routertipo_egreso )
    server.use('/ADB',authMiddleware, routertipo_ingreso )
    server.use('/ADB',authMiddleware, routeringreso )
    server.use('/ADB',authMiddleware, routerlista )
    server.use('/ADB',authMiddleware, routeregreso )



    server.get ('/', (req, res) => {
        res.send('Api Proyect')
    })

    server.listen(PORT,() =>{
        console.log(`servidor corriendo en http://localhost:${PORT}`);
    })
