// [BLOQUE: Rutas de Actores]
import { Router } from 'express';
import * as actorController from '../controllers/actorController.js';

const router = Router();

/**
 * Endpoints para gestión de catálogo de actores.
 */
router.get('/', actorController.getActores);
router.post('/', actorController.createActor);

export default router;
