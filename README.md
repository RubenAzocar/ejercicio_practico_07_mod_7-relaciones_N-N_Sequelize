# Proyecto: Relaciones N–N con Sequelize (Películas ↔ Actores)

Descripción
-----------
API y ejemplo completo que muestra cómo modelar una relación muchos-a-muchos
(N–N) entre `peliculas` y `actores` usando Sequelize sobre PostgreSQL. Incluye
un frontend mínimo, scripts de sincronización/seed y ejemplos de consultas.

Requisitos
----------
- Node.js 16+ / npm
- PostgreSQL con una base de datos existente llamada `n_n_sequalize_db`
- Variables de entorno obligatorias (usar exactamente estos nombres):
	- `DB_USER`
	- `DB_PASSWORD`
	- `DB_PORT`
	- `DB-HOST`

Nota: la conexión en el proyecto usa la base `n_n_sequalize_db` (minúsculas).

Instalación
-----------
Desde la raíz del proyecto:

```pwsh
npm install
```

Archivos clave
-------------
- `src/index.js` — servidor Express + rutas REST.
- `src/models/` — definición de modelos Sequelize (`pelicula`, `actor`, `peliculas_actores`).
- `src/seed.js` — script para sincronizar tablas e insertar datos de ejemplo.
- `public/` — frontend mínimo (`index.html`, `main.js`).
- `sql_postgres.md` — referencia de consultas SQL para PostgreSQL.

Uso
---
1. Exportar las variables de entorno en PowerShell (ejemplo):

```pwsh
$env:DB_USER='postgres'
$env:DB_PASSWORD='mi_password'
$env:DB_PORT='5432'
$env:DB-HOST='localhost'
```

2. Ejecutar seed para crear tablas e insertar datos de ejemplo:

```pwsh
node src/seed.js
```

3. Levantar la API y el frontend:

```pwsh
npm start
# servidor en http://localhost:3000
```

API (endpoints principales)
---------------------------
- `GET /peliculas` — listar películas con actores.
- `POST /peliculas` — crear película. Body JSON: `{ "titulo": "...", "anio": 2020, "actorIds": [1,2] }`.
- `GET /actores` — listar actores con películas.
- `POST /actores` — crear actor. Body JSON: `{ "nombre": "...", "fecha_nacimiento": "YYYY-MM-DD" }`.
- `POST /asignar-actor` — asignar actor a película (usa transacción). Body JSON: `{ "pelicula_id": 1, "actor_id": 2 }`.

Buenas prácticas y seguridad
---------------------------
- No exponer `DB_PASSWORD` en repositorios ni logs.
- En producción, usar migraciones en lugar de `sequelize.sync()`.
- Establecer `NODE_ENV=production` y configurar CORS y cabeceras
	(`helmet`) adecuadamente.

Comprobaciones rápidas
---------------------
- Listar películas (curl):

```pwsh
curl http://localhost:3000/peliculas
```

- Listar actores (curl):

```pwsh
curl http://localhost:3000/actores
```

Soporte
-------
Si necesitas:
- añadir autenticación (JWT),
- convertir a migraciones con `sequelize-cli`, o
- despliegue en un entorno (Docker / Azure / Heroku),

puedo generar los archivos y pasos necesarios.
# ejercicio_practico_07_mod_7-relaciones_N-N_Sequelize
