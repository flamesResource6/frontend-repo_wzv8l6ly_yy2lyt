import { useEffect, useState } from 'react';
import { api } from '../utils/api';

export default function Categories() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api('/categories');
        setCats(res);
      } catch(e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Shop by category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {cats.map((c) => (
            <div key={c.id || c.slug} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 text-center hover:shadow-md transition">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 mx-auto mb-3" />
              <div className="font-medium text-slate-900 dark:text-white">{c.name}</div>
              <div className="text-xs text-slate-500">{c.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
