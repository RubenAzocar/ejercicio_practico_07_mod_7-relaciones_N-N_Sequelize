// [BLOQUE: Script de Semilla (Seeding)]
import 'dotenv/config';
import { Actor, Pelicula, sequelize } from './models/index.js';

/**
 * Script de inicialización de datos de prueba.
 * Utiliza transacciones para garantizar que el estado sea consistente.
 */
const seedDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión para seed establecida.');

        await sequelize.sync();

        await sequelize.transaction(async (t) => {
            // [BLOQUE: Creación de registros base]
            const [actor1] = await Actor.findOrCreate({
                where: { nombre: 'Leonardo DiCaprio' },
                defaults: { fecha_nacimiento: '1974-11-11' },
                transaction: t
            });
            const [actor2] = await Actor.findOrCreate({
                where: { nombre: 'Kate Winslet' },
                defaults: { fecha_nacimiento: '1975-10-05' },
                transaction: t
            });

            const [pel1] = await Pelicula.findOrCreate({
                where: { titulo: 'Titanic' },
                defaults: { anio: 1997 },
                transaction: t
            });
            const [pel2] = await Pelicula.findOrCreate({
                where: { titulo: 'Inception' },
                defaults: { anio: 2010 },
                transaction: t
            });

            // [BLOQUE: Establecimiento de relaciones N:N]
            // Asociamos a Kate Winslet con Titanic
            await pel1.addActor(actor2, { transaction: t });
            // Asociamos a Leonardo DiCaprio con Inception (y opcionalmente Titanic para realismo)
            await pel2.addActor(actor1, { transaction: t });
            await pel1.addActor(actor1, { transaction: t });
        });

        console.log('✅ Seed finalizado con éxito.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error durante el proceso de seed:', error.message);
        process.exit(1);
    }
};

seedDatabase();
