// [BLOQUE: Middleware Global de Errores]

/**
 * Captura excepciones no manejadas en los controladores.
 * Centraliza la respuesta al cliente y registros de error.
 */
export const errorHandler = (err, req, res, next) => {
    console.error(`[SERVER ERROR] ${err.message}`);

    // Errores de validación de Sequelize
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            error: 'Error de validación',
            details: err.errors.map(e => e.message)
        });
    }

    const status = err.status || 500;
    const message = err.message || 'Error interno del servidor';

    res.status(status).json({
        error: message,
        status
    });
};
