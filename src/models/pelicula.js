// [BLOQUE: Modelo de Película]
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

/**
 * Definición del modelo Pelicula.
 * Centraliza la información básica de los largometrajes.
 */
const Pelicula = sequelize.define('Pelicula', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1888, // Año de la primera película conocida
            max: new Date().getFullYear() + 10 // Permitir películas en producción cercana
        }
    }
}, {
    tableName: 'peliculas',
    underscored: true
});

export default Pelicula;
