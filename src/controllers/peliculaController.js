// [BLOQUE: Controlador de Películas]
import { Actor, Pelicula, PeliculasActores, sequelize } from '../models/index.js';

/**
 * Operaciones de negocio para la entidad Película.
 * Garantiza integridad mediante transacciones en operaciones complejas.
 */
export const getPeliculas = async (req, res, next) => {
    try {
        // Optimización: Seleccionamos solo atributos necesarios para mejorar performance
        const peliculas = await Pelicula.findAll({
            include: {
                model: Actor,
                attributes: ['id', 'nombre'],
                through: { attributes: [] }
            }
        });
        res.json(peliculas);
    } catch (error) {
        next(error);
    }
};

export const createPelicula = async (req, res, next) => {
    const { titulo, anio, actorIds } = req.body;

    // Inicia transacción gestionada para atomicidad
    try {
        const result = await sequelize.transaction(async (t) => {
            const pelicula = await Pelicula.create({ titulo, anio }, { transaction: t });

            if (Array.isArray(actorIds) && actorIds.length > 0) {
                const actores = await Actor.findAll({ where: { id: actorIds }, transaction: t });
                await pelicula.addActors(actores, { transaction: t });
            }

            return pelicula;
        });

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const assignActor = async (req, res, next) => {
    const { pelicula_id, actor_id } = req.body;

    try {
        await sequelize.transaction(async (t) => {
            // Siguiendo estrictamente la guía técnica sugerida:
            await PeliculasActores.create({ pelicula_id, actor_id }, { transaction: t });
        });

        res.json({ message: 'Asociación creada exitosamente', ok: true });
    } catch (error) {
        next(error);
    }
};
