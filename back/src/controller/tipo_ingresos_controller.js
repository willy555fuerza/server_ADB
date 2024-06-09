/*****************conection 2*********************/

const Usersmodel = require('../model/tipo_ingresos_model') // Importa el modelo ProductosModel

class Users {
    // Método para obtener todos los proveedores
    static async getAll(req, res) {
        try {
            /* const { data, error, message } = await Usersmodel.getAll(); */
            const data = await Usersmodel.getAll();

            if (!data) {
                return res.status(404).json({ error: message });
            }
            /* console.log(data) */
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Método para agregar unu nuevo proveedor
    static async createUser(req, res) {
        try {
            const { nombre } = req.body;

            // Llamar al método para crear el proveedor en el modelo
            const result = await Usersmodel.createUser(nombre);

            // Verificar si el proveedor se creó correctamente en el modelo
            if (result) {
                // Proveedor creado correctamente
                res.status(200).json({ message: 'Tipo de ingreso creado correctamente' });
            } else {
                // Error al crear el proveedor en el modelo
                res.status(500).json({ error: 'Error al crear al tipo de ingreso' });
            }
        } catch (error) {
            console.error('Error al crear al tipo de ingreso:', error);
            res.status(500).json({ error: 'Error al crear al tipo de ingreso' });
        }
    }

    static async updateUser(req, res) {
        try {
            const { id_tipo_ingresos } = req.params;
            const { nombre } = req.body;

            // Llamar al método para actualizar el proveedor en el modelo
            const result = await Usersmodel.updateUser(id_tipo_ingresos, nombre );

            // Verificar si el proveedor se actualizó correctamente en el modelo
            if (result) {
                // Proveedor actualizado correctamente
                res.status(200).json({ message: 'tipo de ingreso actualizado correctamente' });
            } else {
                // Error al actualizar el provedor en el modelo
                res.status(500).json({ error: 'Error al actualizar el tipo de ingreso' });
            }
        } catch (error) {
            console.error('Error al actualizar el tipo de ingreso:', error);
            res.status(500).json({ error: 'Error al actualizar el tipo de ingresos' });
        }
    }
    // Método para cambiar el estado de un usuario
    static async changeState(req, res) {
        try {
            const userId = req.params.userId;
            const { state } = req.body;
            // Llamar al método para cambiar el estado del usuario en el modelo
            const result = await Usersmodel.changeState(userId, state);
            
            res.status(200).json({ message: 'Estado del tipo de ingreso cambiado correctamente' });
        } catch (error) {
            console.error('Error al cambiar el estado del tipo de ingreso:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    // Método para eliminar usuario de la data base
    static async deleteUser(req, res) {
        try {
            const userId = req.params.userId;

            // Llamar al método para eliminar el usuario en el modelo
            const result = await Usersmodel.deleteUser(userId);

            // Crear el objeto de respuesta
            const responseObj = { message: "Tipo de Ingreso eliminado correctamente" };

            // Enviar la respuesta
            res.status(200).json(responseObj);
        } catch (error) {
            console.error("Error al eliminar el tipo de ingreso:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

module.exports = Users 