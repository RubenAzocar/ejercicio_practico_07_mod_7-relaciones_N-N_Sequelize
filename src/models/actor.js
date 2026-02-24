// [BLOQUE: Modelo de Actor]
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

/**
 * Definición del modelo Actor utilizando la sintaxis moderna de Sequelize.
 * Representa a los profesionales del cine vinculados a películas.
 */
const Actor = sequelize.define('Actor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(120),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 120]
        }
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true,
            isBefore: new Date().toISOString() // Debe ser una fecha en el pasado
        }
    }
}, {
    tableName: 'actores',
    underscored: true
});

export default Actor;
