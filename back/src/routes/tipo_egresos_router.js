/*****************conection 3*********************/

const express = require('express')
const router = express.Router()
const Users = require('../controller/tipo_egresos_controller')


// Ruta para obtener todos los usuarios
router.get('/tipo_egresos',Users.getAll)
// Ruta para cambiar el estado de un usuario
router.put('/tipo_egresos/:userId/state', Users.changeState);
// Ruta para crear un nuevo usuario
router.post('/create_tipo_egresos', Users.createUser);
// Ruta para actualizar un usuario existente
router.put('/tipo_egresos/:id_tipo_egresos', Users.updateUser);
// Ruta para eliminar un proveedor
router.delete('/tipo_egresos_delete/:userId', Users.deleteUser);
 
 
module.exports = router 