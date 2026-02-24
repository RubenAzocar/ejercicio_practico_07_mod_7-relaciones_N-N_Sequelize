// [BLOQUE: Controlador de Actores]
import { Actor, Pelicula } from '../models/index.js';

/**
 * Gestión de la lógica de negocio para Actores.
 * Mantiene la independencia entre la ruta y la implementación.
 */
export const getActores = async (req, res, next) => {
    try {
        const actores = await Actor.findAll({
            include: {
                model: Pelicula,
                attributes: ['id', 'titulo'],
                through: { attributes: [] }
            }
        });
        res.json(actores);
    } catch (error) {
        next(error);
    }
};

export const createActor = async (req, res, next) => {
    const { nombre, fecha_nacimiento } = req.body;
    try {
        const actor = await Actor.create({ nombre, fecha_nacimiento });
        res.status(201).json(actor);
    } catch (error) {
        next(error);
    }
};
