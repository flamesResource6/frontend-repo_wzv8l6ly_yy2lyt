import { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api, getClientId } from '../utils/api';

export default function Checkout(){
  const [dark, setDark] = useState(false);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ address: '', shipping_method: 'standard', payment_method: 'card', promo_code: '' });
  const [placed, setPlaced] = useState(null);

  useEffect(() => { (async () => { const cid = getClientId(); const data = await api(`/cart?client_id=${cid}`); setItems(data); })(); }, []);

  const subtotal = useMemo(() => items.reduce((s, it) => s + (it.product?.price||0) * it.qty, 0), [items]);
  const shipping = form.shipping_method === 'express' ? 15 : 5;
  const total = subtotal + shipping;

  async function placeOrder(){
    const cid = getClientId();
    const payload = {
      client_id: cid,
      items: items.map(it => ({ client_id: cid, product_id: it.product?.id || it.product_id, qty: it.qty })),
      address: form.address,
      shipping_method: form.shipping_method,
      payment_method: form.payment_method,
      promo_code: form.promo_code || undefined,
      subtotal,
      shipping,
      total
    };
    const res = await api('/orders', { method: 'POST', body: JSON.stringify(payload) });
    setPlaced(res.id);
  }

  if (placed) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar dark={dark} setDark={setDark} cartCount={0} />
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Order confirmed</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Your order #{placed} has been placed successfully.</p>
          <a href="/" className="mt-6 inline-flex px-5 py-3 rounded-full bg-blue-600 text-white">Back to home</a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar dark={dark} setDark={setDark} cartCount={items.length} />
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl">
            <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Shipping address</h3>
            <textarea value={form.address} onChange={e=>setForm({...form, address:e.target.value})} className="w-full h-28 px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800" placeholder="Enter full address" />
          </div>
          <div className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Shipping method</h3>
              <select value={form.shipping_method} onChange={e=>setForm({...form, shipping_method:e.target.value})} className="w-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800">
                <option value="standard">Standard - $5</option>
                <option value="express">Express - $15</option>
              </select>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Payment</h3>
              <select value={form.payment_method} onChange={e=>setForm({...form, payment_method:e.target.value})} className="w-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800">
                <option value="card">Credit/Debit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl h-fit">
          <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Order Summary</h3>
          <div className="space-y-2 max-h-64 overflow-auto pr-2">
            {items.map((it)=> (
              <div key={it.id} className="flex items-center justify-between text-sm text-slate-700 dark:text-slate-300">
                <span className="truncate">{it.product?.title}</span>
                <span>${(it.qty * (it.product?.price||0)).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 mt-4">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium text-slate-900 dark:text-white mt-3">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button onClick={placeOrder} className="mt-6 inline-flex justify-center w-full px-4 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700">Place order</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
