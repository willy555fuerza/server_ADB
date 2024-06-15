/*****************conection 1*********************/

//consultas para obtener datos de base de la db
const { connectToPostgres, disconnectFromPostgres } = require('../config/index');
const bcrypt = require('bcryptjs');
const pg = require('pg');


class Usersmodel {
  // Método para obtener todos los usuarios
  static async getAll() {
    try {
      const pool = await connectToPostgres();
      if (!pool) {
        throw new Error('Error al conectar con PostgreSQL');
      }
      const result = await pool.query('SELECT * FROM ingreso');
      await disconnectFromPostgres(pool);
      /* console.log(result.rows) */
      if (result.rows.length === 0) {
        return { data: null, error: true, message: 'No hay ingreso registrados' };
      }

      return { data: result.rows, error: false };
    } catch (error) {
      return { data: null, error: true, message: error.message };
    }
  }

  // Método para agregar un nuevo usuario
  static async createUser(fecha_ingreso, id_usuario, tipo_ingresos, miembro, monto ) {
    let pool;
    try {
        // Conectar a la base de datos PostgreSQL
        pool = await connectToPostgres();
        if (!pool) {
            throw new Error('Error al conectar con PostgreSQL');
        }
        // Obtener la fecha actual para la fecha de registro
        /* const currentDate = new Date();
        const fecha_registro = currentDate.toISOString(); */
        const currentDate = new Date();
        const fecha_registro = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

        const stock = 0
        // Consulta para insertar un nuevo usuario en la base de datos
        const query = `
            INSERT INTO ingreso (fecha_ingreso, id_usuario, id_tipo_ingresos, id_miembro, monto, fecha_registro)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

        // Ejecutar la consulta con parámetros
        const result = await pool.query(query, [
          fecha_ingreso,
          id_usuario,
          tipo_ingresos,
          miembro,
          monto,
          fecha_registro
        ]);

        console.log('Ingreso creado correctamente');
        return true;
    } catch (error) {
        console.error('Error al crear el ingreso:', error);
        return false;
    } finally {
        // Desconectar de la base de datos
        if (pool) {
            await disconnectFromPostgres(pool);
        }
    }
}

  // Metodo para actualizar el usuario
  static async updateUser(id_ingreso, monto) {
    let pool;
    try {
      console.log(id_ingreso, monto)
      // Conectar a la base de datos PostgreSQL
      pool = await connectToPostgres();
      if (!pool) {
        throw new Error('Error al conectar con PostgreSQL');
      }

      // Consulta para actualizar un usuario en la base de datos
      const query = `
            UPDATE ingreso
            SET monto = $1 
            WHERE id_ingreso = $2;
          `;

      // Ejecutar la consulta con parámetros
      const result = await pool.query(query, [monto, id_ingreso]);


      console.log('Ingreso actualizado correctamente');
      return true;
    } catch (error) {
      console.error('Error al actualizar el ingeresos:', error);
      return false;
    } finally {
      // Desconectar de la base de datos
      if (pool) {
        await disconnectFromPostgres(pool);
      }
    }
  }
  // Método para cambiar el estado de un usuario
  static async changeState(userId, state) {
    try {
      const pool = await connectToPostgres();
      if (!pool) {
        throw new Error('Error al conectar con PostgreSQL');
      }
      //const request = pool.request(); 
      // Actualizar el estado del usuario en la base de datos
      await pool.query(`UPDATE ingreso SET estado = ${state} WHERE id_ingreso = ${userId}`);
      await disconnectFromPostgres(pool);
      return true;
    } catch (error) {
      return false;
    }
  }
  // Método para eliminar usuario de la data base
  static async deleteUser(userId) {
    try {
      const pool = await connectToPostgres();
      if (!pool) {
        throw new Error("Error al conectar con PostgreSQL");
      }

      // Eliminar el usuario de la base de datos
      await pool.query(`DELETE FROM ingreso WHERE id_ingreso = ${userId}`);

      await disconnectFromPostgres(pool);
      return true;
    } catch (error) {
      console.error("Error al eliminar el ingreso:", error);
      return false;
    }
  }
}


module.exports = Usersmodel