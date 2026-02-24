import 'dotenv/config';
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env['DB-HOST'],
    port: Number(process.env.DB_PORT || 5432),
    database: 'postgres'
});

async function run() {
    try {
        await client.connect();
        const res = await client.query("SELECT datname FROM pg_database WHERE datistemplate = false;");
        console.log('Databases:');
        res.rows.forEach(r => console.log('-', r.datname));
        await client.end();
        process.exit(0);
    } catch (err) {
        console.error('Error listing DBs:', err.message || err);
        process.exit(1);
    }
}

run();
