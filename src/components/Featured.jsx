import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { Link } from 'react-router-dom';

function ProductCard({ p }) {
  return (
    <Link to={`/product/${p.id}`} className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden hover:shadow-lg transition shadow-sm">
      <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-700">
        <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop'} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-slate-900 dark:text-white line-clamp-1">{p.title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{p.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold text-slate-900 dark:text-white">${p.price?.toFixed(2)}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">{p.rating}★</span>
        </div>
      </div>
    </Link>
  )
}

export default function Featured() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api('/products?limit=8&sort=-created_at');
        setItems(res.items || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Featured products</h2>
          <Link to="/shop" className="text-sm text-blue-600 hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
