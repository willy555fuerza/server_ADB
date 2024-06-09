/*****************conection 3*********************/

const express = require('express');
const router = express.Router();
const DashboardModel = require('../model/dashboard_model');

// Endpoint para obtener el conteo de usuarios
router.get('/usuarios/count', DashboardModel.getUsuariosCount);

// Endpoint para obtener el conteo de clientes
router.get('/miembro/count', DashboardModel.getClientesCount);

router.get('/ministerio/count', DashboardModel.getMinisterioCount);

router.get('/lista/count', DashboardModel.getListaCount);


// Endpoint para obtener el conteo de productos
/* router.get('/productos/count', DashboardModel.getProductosCount);

// Endpoint para obtener el conteo de ventas
router.get('/ventas/count', DashboardModel.getVentasCount); */

module.exports = router;