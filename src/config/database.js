// [BLOQUE: Configuración de Base de Datos (Sequelize)]
import 'dotenv/config';
import { Sequelize } from 'sequelize';

// [REFACTOR] 20y MODE: funcionalidad+optimización+mantenibilidad

/**
 * Configuración centralizada de la instancia de Sequelize.
 * Implementa el patrón Singleton implícito al exportar la instancia.
 */
// Forzamos la base de datos específica del ejercicio para evitar conflictos de variables de entorno
const DB_NAME = 'n_n_sequalize_db';
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT || 5432;
const DB_HOST = process.env['DB-HOST'] || 'localhost';

console.log(`📡 Intentando conectar a la BD: ${DB_NAME}`);

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: false, // Deshabilitado para mantener la limpieza en consola, activar solo en depuración
    define: {
        underscored: true, // Convierte camelCase a snake_case en la BD automáticamente
        timestamps: false  // Deshabilitado globalmente según requerimiento original
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
