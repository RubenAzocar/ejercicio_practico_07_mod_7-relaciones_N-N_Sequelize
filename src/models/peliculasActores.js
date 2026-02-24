// [BLOQUE: Tabla Intermedia Películas-Actores]
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

/**
 * Modelo de unión para la relación Muchos-a-Muchos (N:N).
 * Conecta actores con sus respectivas participaciones en películas.
 */
const PeliculasActores = sequelize.define('PeliculasActores', {
    pelicula_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'peliculas',
            key: 'id'
        }
    },
    actor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'actores',
            key: 'id'
        }
    }
}, {
    tableName: 'peliculas_actores',
    underscored: true,
    timestamps: false
});

export default PeliculasActores;
