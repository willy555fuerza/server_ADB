/*****************conection 1*********************/

//consultas para obtener datos de base de la db
const {connectToPostgres,disconnectFromPostgres,} = require("../config/index");
  
class DashboardModel {
    static async getUsuariosCount(req, res) {
        try {
            const pool = await connectToPostgres();
            const result = await pool.query('SELECT COUNT(*) AS count FROM usuario');
            await disconnectFromPostgres(pool); // Disconnect from the database
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Error al obtener el conteo de usuarios:', error);
            res.status(500).json({ error: 'Error al obtener el conteo de usuarios' });
        }
    }

    static async getClientesCount(req, res) {
        try {
            const pool = await connectToPostgres();
            const result = await pool.query('SELECT COUNT(*) AS count FROM miembro');
            await disconnectFromPostgres(pool); // Disconnect from the database
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Error al obtener el conteo de clientes:', error);
            res.status(500).json({ error: 'Error al obtener el conteo de clientes' });
        }
    }

    static async getMinisterioCount(req, res) {
        try {
            const pool = await connectToPostgres();
            const result = await pool.query('SELECT COUNT(*) AS count FROM ministerio');
            await disconnectFromPostgres(pool); // Disconnect from the database
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Error al obtener el conteo de productos:', error);
            res.status(500).json({ error: 'Error al obtener el conteo de ministerio' });
        }
    }


    static async getListaCount(req, res) {
        try {
            const pool = await connectToPostgres();
            const result = await pool.query('SELECT COUNT(*) AS count FROM lista');
            await disconnectFromPostgres(pool); // Disconnect from the database
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Error al obtener el conteo de productos:', error);
            res.status(500).json({ error: 'Error al obtener el conteo de ministerio' });
        }
    }

 
}

module.exports = DashboardModel;
