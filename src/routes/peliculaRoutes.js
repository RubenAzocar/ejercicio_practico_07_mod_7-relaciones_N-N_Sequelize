// [BLOQUE: Rutas de Películas]
import { Router } from 'express';
import * as peliculaController from '../controllers/peliculaController.js';

const router = Router();

/**
 * Endpoints para gestión de películas y asociaciones.
 */
router.get('/', peliculaController.getPeliculas);
router.post('/', peliculaController.createPelicula);
router.post('/asignar-actor', peliculaController.assignActor);

export default router;
