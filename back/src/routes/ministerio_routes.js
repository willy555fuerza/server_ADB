/*****************conection 3*********************/

const express = require('express')
const router = express.Router()
const Users = require('../controller/ministerio_controller')


// Ruta para obtener todas las medidas
router.get('/ministerio',Users.getAll)
// Ruta para cambiar el estado de una medida
router.put('/ministerio/:userId/state', Users.changeState);
// Ruta para crear una nueva medida
router.post('/create_ministerio', Users.createUser);
// Ruta para actualizar una medida existente
router.put('/ministerio/:id_ministerio', Users.updateUser);
// Ruta para eliminar una medida
router.delete('/ministerio_delete/:userId', Users.deleteUser);
 
module.exports = router 