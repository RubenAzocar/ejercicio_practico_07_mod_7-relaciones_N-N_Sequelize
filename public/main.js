// [BLOQUE: Lógica Frontend CineLink]

/**
 * Módulo de cliente para interacción con la API REST.
 * Implementa manejo de estado visual y feedback al usuario.
 */

const UI = {
    toast: (msg) => {
        const t = document.getElementById('toast');
        t.textContent = msg;
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 3000);
    },
    updatePanel: (id, data) => {
        const container = document.getElementById(id);
        container.innerHTML = '';

        if (data.length === 0) {
            container.innerHTML = '<p class="item-meta">Sin registros disponibles.</p>';
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card';

            // Renderizado condicional según el tipo de dato (Pelicula o Actor)
            const isPelicula = !!item.titulo;
            const title = isPelicula ? item.titulo : item.nombre;
            const subtitle = isPelicula ? `Año: ${item.anio}` : `Nacimiento: ${item.fecha_nacimiento}`;
            const subItems = isPelicula ? (item.Actors || []) : (item.Peliculas || []);
            const subItemLabel = isPelicula ? 'Reparto' : 'Filmografía';

            card.innerHTML = `
                <div class="item-header">
                    <div>
                        <div class="item-title">${title}</div>
                        <div class="item-meta">${subtitle}</div>
                    </div>
                    <span class="badge">ID: ${item.id}</span>
                </div>
                <div class="item-sub-list">
                    <span class="sub-item-label">${subItemLabel}</span>
                    <div class="tag-container">
                        ${subItems.length > 0
                            ? subItems.map(si => `<span class="tag">${si.nombre || si.titulo}</span>`).join('')
                            : '<span class="item-meta">No asignado</span>'}
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }
};

const API = {
    async get(endpoint) {
        try {
            const r = await fetch(endpoint);
            return r.ok ? await r.json() : [];
        } catch (e) {
            console.error(`Error fetching ${endpoint}:`, e);
            return [];
        }
    },
    async post(endpoint, data) {
        try {
            const r = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const res = await r.json();
            if (!r.ok) throw new Error(res.error || 'Error en la petición');
            return res;
        } catch (e) {
            UI.toast(`❌ ${e.message}`);
            throw e;
        }
    }
};

// [BLOQUE: Carga de Datos]
async function refreshData() {
    const [pels, acts] = await Promise.all([
        API.get('/peliculas'),
        API.get('/actores')
    ]);
    UI.updatePanel('peliculas', pels);
    UI.updatePanel('actores', acts);
}

// [BLOQUE: Manejadores de Eventos]
const attachFormListener = (formId, endpoint, transform = d => d) => {
    document.getElementById(formId).addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = transform(Object.fromEntries(fd.entries()));

        try {
            await API.post(endpoint, data);
            UI.toast('✅ Registrado correctamente');
            e.target.reset();
            refreshData();
        } catch (error) {
            // Error ya manejado en API.post
        }
    });
};

// Inicialización de escuchadores
attachFormListener('peliculaForm', '/peliculas', d => ({ ...d, anio: Number(d.anio) }));
attachFormListener('actorForm', '/actores');
attachFormListener('asignForm', '/asignar-actor', d => ({
    pelicula_id: Number(d.pelicula_id),
    actor_id: Number(d.actor_id)
}));

// Carga inicial
window.addEventListener('DOMContentLoaded', refreshData);
