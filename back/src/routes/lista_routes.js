/*****************conection 3*********************/

const express = require('express')
const router = express.Router()
const Users = require('../controller/lista_controller')
const multer = require('multer');

const storage = multer.memoryStorage(); // Almacenar el archivo en la memoria


const upload = multer({ storage: storage });


// Ruta para obtener todos los usuarios
router.get('/lista',Users.getAll)
// Ruta para cambiar el estado de un usuario
router.put('/lista/:userId/state', Users.changeState);
/* // Ruta para crear un nuevo usuario
router.post('/create_users', upload.single("foto"), Users.createUser); */
// Ruta para crear un nuevo usuario
router.post('/create_lista', Users.createUser);
// Ruta para actualizar un usuario existente
router.put('/lista/:id_lista', Users.updateUser); 
// Ruta para eliminar un usuario
router.delete('/lista_delete/:userId', Users.deleteUser);

module.exports = router