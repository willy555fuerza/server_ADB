// login_routes.js
const express = require("express");
const router = express.Router();
const Token = require("../token/token");
const jwt = require("jsonwebtoken");

// Ruta para iniciar sesión y generar token
router.post("/login", Token.token);

// Endpoint para verificar autenticación
router.get("/verify-auth", (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (authorizationHeader) {
            const token = authorizationHeader.split(" ")[1];
            const decoded = jwt.verify(token, 'secretkey');
        
            if (decoded.isAuthenticated === true) {
                // Incluir el perfil del usuario en la respuesta si la autenticación es exitosa
                const perfil = decoded.perfil;
                res.status(200).json({ message: "Acceso autorizado", perfil });
            } else {
                res.status(401).json({ message: "Acceso no autorizado" });
            }
        } else {
            res.status(401).json({ message: "Token de autorización no proporcionado" });
        }
    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
    }
});

// Ruta para cerrar sesión
router.post("/logout", (req, res) => {
    try {
        req.session.destroy();
        res.status(200).json({ message: "Sesión cerrada exitosamente" });
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        res.status(500).json({ error: "Error al cerrar sesión" });
    }
});

module.exports = router;
