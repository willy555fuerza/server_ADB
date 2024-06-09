const routerproducto = require('./src/routes/productos_routes');
const { server } = require('.');

server.use('/ADB', routerproducto);

/* const routerproducto = require('./src/routes/egreso_routes');
const { server } = require('.');

server.use('/ADB', routeringreso); */
