import { useEffect, useState } from 'react';

const TOURS_API = 'http://localhost:8091/tours';

function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    nombre: '',
    ubicacion: '',
    precio: ''
  });

  const cargarDatos = async () => {
    setLoading(true);
    setError('');

    try {
      const toursResponse = await fetch(TOURS_API);

      if (!toursResponse.ok) {
        throw new Error('No se pudo leer tours-service. Verifica que este corriendo en el puerto 8091.');
      }

      const toursData = await toursResponse.json();

      setTours(toursData);
    } catch (loadError) {
      const msg = loadError?.message || '';
      if (msg.includes('Failed to fetch')) {
        setError('No hay conexion con tours-service. Asegurate de levantar backend en http://localhost:8091.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const crearTour = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const payload = {
        nombre: form.nombre.trim(),
        ubicacion: form.ubicacion.trim(),
        precio: Number(form.precio)
      };

      const response = await fetch(TOURS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('No se pudo crear el tour. Revisa los campos enviados.');
      }

      setForm({ nombre: '', ubicacion: '', precio: '' });
      await cargarDatos();
    } catch (saveError) {
      const msg = saveError?.message || '';
      if (msg.includes('Failed to fetch')) {
        setError('No hay conexion con tours-service para guardar. Verifica backend en puerto 8091.');
      } else {
        setError(msg);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8 overflow-hidden rounded-3xl border border-cyan-100 bg-white/70 p-6 backdrop-blur card-shadow sm:p-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-sea">Comunidad Local</p>
        <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-5xl">
          Tours en lanchas publicados por guias del barrio
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          Frontend en React + Tailwind consumiendo solamente tours-service.
          Puedes registrar un tour nuevo y ver la lista en tiempo real.
        </p>
      </section>

      {error && (
        <section className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {error}
        </section>
      )}

      <section>
        <article className="rounded-3xl border border-cyan-100 bg-white p-6 card-shadow lg:max-w-2xl">
          <h2 className="text-xl font-bold text-slate-900">Publicar nuevo tour</h2>
          <p className="mt-1 text-sm text-slate-500">Operacion de escritura: POST /tours</p>

          <form className="mt-5 space-y-4" onSubmit={crearTour}>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Nombre del tour</span>
              <input
                required
                name="nombre"
                value={form.nombre}
                onChange={onChange}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none transition focus:border-sea"
                placeholder="Ej: Recorrido por manglares"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Ubicacion</span>
              <input
                required
                name="ubicacion"
                value={form.ubicacion}
                onChange={onChange}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none transition focus:border-sea"
                placeholder="Ej: Canal Verde"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Precio (USD)</span>
              <input
                required
                min="0"
                step="0.01"
                type="number"
                name="precio"
                value={form.precio}
                onChange={onChange}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none transition focus:border-sea"
                placeholder="25"
              />
            </label>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-sea px-4 py-2 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? 'Guardando...' : 'Crear tour'}
            </button>
          </form>
        </article>
      </section>

      <section className="mt-6 rounded-3xl border border-cyan-100 bg-white p-6 card-shadow">
        <h2 className="text-xl font-bold text-slate-900">Tours publicados</h2>
        <p className="mt-1 text-sm text-slate-500">Operacion de lectura: GET /tours</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {loading && <p className="text-sm text-slate-500">Cargando tours...</p>}
          {!loading && tours.length === 0 && <p className="text-sm text-slate-500">No hay tours registrados.</p>}

          {tours.map((tour) => (
            <article key={tour.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <h3 className="font-bold text-slate-900">{tour.nombre}</h3>
              <p className="text-sm text-slate-600">Ubicacion: {tour.ubicacion}</p>
              <p className="mt-2 inline-block rounded-full bg-sand px-3 py-1 text-sm font-semibold text-slate-800">
                USD {Number(tour.precio).toFixed(2)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
