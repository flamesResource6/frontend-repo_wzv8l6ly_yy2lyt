import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api, getClientId } from '../utils/api';

export default function ProductPage(){
  const { id } = useParams();
  const [dark, setDark] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await api(`/products/${id}`);
      setP(res);
      setLoading(false);
      const cid = getClientId();
      const cart = await api(`/cart?client_id=${cid}`);
      setCartCount(cart.length);
    })();
  }, [id]);

  async function addToCart(){
    const cid = getClientId();
    await api('/cart', { method: 'POST', body: JSON.stringify({ client_id: cid, product_id: id, qty: 1 })});
    const cart = await api(`/cart?client_id=${cid}`);
    setCartCount(cart.length);
  }

  if (loading) return <div className="min-h-screen bg-white dark:bg-slate-900"></div>;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar dark={dark} setDark={setDark} cartCount={cartCount} />
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img src={p.images?.[0]} alt={p.title} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3 mt-3">
            {(p.images||[]).slice(0,4).map((img,i)=> (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img src={img} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{p.title}</h1>
          <div className="mt-1 text-slate-500 dark:text-slate-400">{p.rating}★ ({p.rating_count} reviews)</div>
          <div className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">${p.price?.toFixed(2)}</div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">{p.description}</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-300">
            {(p.features||[]).map((f,i)=> <li key={i} className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800">{f}</li>)}
          </ul>
          <div className="mt-6 flex gap-3">
            <button onClick={addToCart} className="px-5 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700">Add to cart</button>
            <button className="px-5 py-3 rounded-full bg-slate-900 text-white dark:bg-white/10">Buy now</button>
          </div>
          <div className="mt-10">
            <h3 className="font-semibold mb-3 text-slate-900 dark:text-white">Recommended</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Simple recommended logic: show two other items from same category if available */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
