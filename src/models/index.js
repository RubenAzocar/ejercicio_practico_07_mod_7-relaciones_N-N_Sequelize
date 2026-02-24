// [BLOQUE: Punto de Entrada Modelos y Asociaciones]
import { sequelize } from '../config/database.js';
import Actor from './actor.js';
import Pelicula from './pelicula.js';
import PeliculasActores from './peliculasActores.js';

// [REFACTOR] 20y MODE: funcionalidad+optimización+mantenibilidad

/**
 * Configuración de relaciones N:N entre Películas y Actores.
 * El uso de belongsToMany a través de una tabla intermedia permite modelar participaciones cruzadas.
 */
Pelicula.belongsToMany(Actor, {
    through: PeliculasActores,
    foreignKey: 'pelicula_id',
    otherKey: 'actor_id'
});

Actor.belongsToMany(Pelicula, {
    through: PeliculasActores,
    foreignKey: 'actor_id',
    otherKey: 'pelicula_id'
});

export {
    Actor,
    Pelicula,
    PeliculasActores, sequelize
};

