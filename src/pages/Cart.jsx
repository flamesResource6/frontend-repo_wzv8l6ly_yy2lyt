import { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api, getClientId } from '../utils/api';

export default function Cart(){
  const [dark, setDark] = useState(false);
  const [items, setItems] = useState([]);

  async function load(){
    const cid = getClientId();
    const data = await api(`/cart?client_id=${cid}`);
    setItems(data);
  }

  useEffect(() => { load(); }, []);

  const subtotal = useMemo(() => items.reduce((s, it) => s + (it.product?.price||0) * it.qty, 0), [items]);

  async function updateQty(id, qty){
    await api(`/cart/${id}`, { method: 'PATCH', body: JSON.stringify({ qty })});
    await load();
  }

  async function remove(id){
    await api(`/cart/${id}`, { method: 'DELETE' });
    await load();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar dark={dark} setDark={setDark} cartCount={items.length} />
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((it) => (
            <div key={it.id} className="flex gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl">
              <div className="w-28 h-28 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700">
                <img src={it.product?.images?.[0]} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-900 dark:text-white">{it.product?.title}</div>
                <div className="text-sm text-slate-500">${it.product?.price?.toFixed(2)}</div>
                <div className="mt-3 flex items-center gap-2">
                  <button onClick={()=>updateQty(it.id, Math.max(1, it.qty-1))} className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700">-</button>
                  <span className="px-3 py-1 rounded-md bg-slate-50 dark:bg-slate-700">{it.qty}</span>
                  <button onClick={()=>updateQty(it.id, it.qty+1)} className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700">+</button>
                  <button onClick={()=>remove(it.id)} className="ml-4 text-sm text-red-600">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl h-fit">
          <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Order Summary</h3>
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 mb-2">
            <span>Shipping</span>
            <span>$5.00</span>
          </div>
          <div className="flex justify-between font-medium text-slate-900 dark:text-white mt-3">
            <span>Total</span>
            <span>${(subtotal + 5).toFixed(2)}</span>
          </div>
          <a href="/checkout" className="mt-6 inline-flex justify-center w-full px-4 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700">Proceed to checkout</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
