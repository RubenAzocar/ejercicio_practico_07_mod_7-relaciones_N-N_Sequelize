// [BLOQUE: Servidor y Configuración Express]
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

import { sequelize } from './models/index.js';
import actorRoutes from './routes/actorRoutes.js';
import peliculaRoutes from './routes/peliculaRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// [REFACTOR] 20y MODE: funcionalidad+optimización+mantenibilidad

// [BLOQUE: Middlewares de Seguridad y Utilidad]
app.use(helmet({
    contentSecurityPolicy: false, // Desactivado para simplificar la carga de scripts locales en este entorno de prueba
}));
app.use(cors());
app.use(express.json());

// [BLOQUE: Rutas de la API]
app.use('/actores', actorRoutes);
app.use('/peliculas', peliculaRoutes);

// Retrocompatibilidad con la ruta específica solicitada originalmente
app.post('/asignar-actor', (req, res, next) => {
    // Redirigimos internamente al controlador correspondiente
    import('./controllers/peliculaController.js').then(ctrl => ctrl.assignActor(req, res, next));
});

// [BLOQUE: Frontend Estático]
app.use(express.static(path.join(__dirname, '../public')));

// [BLOQUE: Manejo de Errores]
app.use(errorHandler);

// [BLOQUE: Inicialización de Base de Datos y Arranque]
/**
 * Inicializa la conexión a la base de datos y sincroniza modelos.
 * Luego levanta el listener del servidor Express.
 */
const initServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión establecida con la base de datos.');

        // Sincronización automática de modelos (Uso seguro para desarrollo/ejercicios)
        await sequelize.sync({ alter: false });
        console.log('✅ Modelos sincronizados correctamente.');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Servidor operativo en: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error crítico al iniciar el servidor:', error.message);
        process.exit(1);
    }
};

initServer();
