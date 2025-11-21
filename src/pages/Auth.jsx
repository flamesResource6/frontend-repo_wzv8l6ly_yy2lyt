import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api } from '../utils/api';

export default function Auth(){
  const [dark, setDark] = useState(false);
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  async function submit(e){
    e.preventDefault();
    setMsg('');
    try{
      if (mode==='login'){
        const res = await api('/auth/login', { method:'POST', body: JSON.stringify({ email: form.email, password: form.password }) });
        setMsg(`Welcome back, ${res.name}`);
      } else {
        const res = await api('/auth/register', { method:'POST', body: JSON.stringify({ name: form.name, email: form.email, password: form.password }) });
        setMsg(`Account created: ${res.email}`);
      }
    }catch(e){ setMsg("Error: "+e.message); }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar dark={dark} setDark={setDark} />
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="flex gap-2 mb-6">
            <button onClick={()=>setMode('login')} className={`px-3 py-1.5 rounded-full text-sm ${mode==='login'?'bg-blue-600 text-white':'bg-slate-100 dark:bg-slate-700'}`}>Login</button>
            <button onClick={()=>setMode('register')} className={`px-3 py-1.5 rounded-full text-sm ${mode==='register'?'bg-blue-600 text-white':'bg-slate-100 dark:bg-slate-700'}`}>Register</button>
          </div>
          <form onSubmit={submit} className="space-y-3">
            {mode==='register' && (
              <input placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800" />
            )}
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800" />
            <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} className="w-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800" />
            <button className="w-full px-4 py-2 rounded-full bg-blue-600 text-white">{mode==='login'?'Login':'Create account'}</button>
          </form>
          {msg && <div className="mt-4 text-sm text-slate-700 dark:text-slate-300">{msg}</div>}
        </div>
      </div>
      <Footer />
    </div>
  );
}
