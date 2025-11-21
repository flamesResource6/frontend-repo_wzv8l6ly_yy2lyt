import { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api, getClientId } from '../utils/api';
import { useSearchParams, Link } from 'react-router-dom';

function Filters({ setFilters }) {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState('');

  return (
    <aside className="space-y-4">
      <div>
        <h4 className="font-semibold">Price</h4>
        <div className="flex items-center gap-2 mt-2">
          <input value={min} onChange={e=>setMin(e.target.value)} placeholder="Min" className="w-24 px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800" />
          <input value={max} onChange={e=>setMax(e.target.value)} placeholder="Max" className="w-24 px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800" />
          <button onClick={()=>setFilters(f=>({...f,min_price:min||undefined,max_price:max||undefined}))} className="px-3 py-2 rounded-md bg-slate-900 text-white text-sm">Apply</button>
        </div>
      </div>
      <div>
        <h4 className="font-semibold">Category</h4>
        <select value={category} onChange={e=>{setCategory(e.target.value); setFilters(f=>({...f,category:e.target.value||undefined}))}} className="mt-2 w-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800">
          <option value="">All</option>
          <option value="cards">Cards</option>
          <option value="accessories">Accessories</option>
          <option value="software">Software</option>
        </select>
      </div>
      <div>
        <h4 className="font-semibold">Rating</h4>
        <select value={rating} onChange={e=>{setRating(e.target.value); setFilters(f=>({...f,rating:e.target.value||undefined}))}} className="mt-2 w-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800">
          <option value="">Any</option>
          <option value="4">4★ & up</option>
          <option value="3">3★ & up</option>
        </select>
      </div>
    </aside>
  );
}

export default function Shop(){
  const [dark, setDark] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [searchParams] = useSearchParams();

  const q = searchParams.get('q') || '';

  useEffect(() => {
    (async () => {
      try {
        const id = getClientId();
        const cart = await api(`/cart?client_id=${id}`);
        setCartCount(cart.length);
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams({ q, page: String(page), limit: '12' });
      if (filters.min_price) params.set('min_price', filters.min_price);
      if (filters.max_price) params.set('max_price', filters.max_price);
      if (filters.category) params.set('category', filters.category);
      const res = await api(`/products?${params.toString()}`);
      setItems(res.items || []);
      setTotal(res.total || 0);
    })();
  }, [q, page, filters]);

  const pages = useMemo(() => Math.max(1, Math.ceil(total/12)), [total]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar dark={dark} setDark={setDark} cartCount={cartCount} />
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Filters setFilters={setFilters} />
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-slate-600 dark:text-slate-300">{total} results</div>
            <select className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800 text-sm">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((p) => (
              <Link to={`/product/${p.id}`} key={p.id} className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden hover:shadow-lg transition shadow-sm">
                <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-700">
                  <img src={p.images?.[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
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
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-2">
            <button disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800 disabled:opacity-50">Prev</button>
            <div className="text-sm text-slate-600 dark:text-slate-300">Page {page} of {pages}</div>
            <button disabled={page>=pages} onClick={()=>setPage(p=>p+1)} className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
