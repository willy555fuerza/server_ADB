/*****************conection 3*********************/

const express = require('express')
const router = express.Router()
const Users = require('../controller/tipo_ingresos_controller')


// Ruta para obtener todos los usuarios
router.get('/tipo_ingresos',Users.getAll)
// Ruta para cambiar el estado de un usuario
router.put('/tipo_ingresos/:userId/state', Users.changeState);
// Ruta para crear un nuevo usuario
router.post('/create_tipo_ingresos', Users.createUser);
// Ruta para actualizar un usuario existente
router.put('/tipo_ingresos/:id_tipo_ingresos', Users.updateUser);
// Ruta para eliminar un proveedor
router.delete('/tipo_ingresos_delete/:userId', Users.deleteUser);
 
 
module.exports = router 