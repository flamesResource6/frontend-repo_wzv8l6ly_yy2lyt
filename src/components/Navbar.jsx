import { useEffect, useState } from 'react';
import { ShoppingCart, Heart, User, Search, Menu, Sun, Moon, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ onSearch, cartCount = 0, dark, setDark }) {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  function submit(e) {
    e.preventDefault();
    if (onSearch) onSearch(q);
    navigate(`/shop?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="lg:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setOpen(!open)}>
            <Menu size={20} />
          </button>
          <Link to="/" className="font-semibold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">BlueShop</Link>
          <div className="hidden lg:flex items-center gap-2 ml-6">
            <button className="inline-flex items-center gap-1 text-sm text-slate-700 dark:text-slate-200 hover:text-blue-600">
              Categories <ChevronDown size={16} />
            </button>
            <nav className="hidden md:flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
              <Link to="/shop" className="hover:text-blue-600">Shop</Link>
              <Link to="/deals" className="hover:text-blue-600">Deals</Link>
              <Link to="/about" className="hover:text-blue-600">About</Link>
            </nav>
          </div>
        </div>

        <form onSubmit={submit} className="hidden md:flex items-center flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search products..." className="w-full rounded-full py-2.5 pl-10 pr-4 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-blue-500/50 outline-none text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <button onClick={()=>setDark(!dark)} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
            {dark ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
          <Link to="/wishlist" className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 relative">
            <Heart size={20} />
          </Link>
          <Link to="/account" className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
            <User size={20} />
          </Link>
          <Link to="/cart" className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 relative">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-blue-600 text-white rounded-full px-1.5 py-0.5">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200/60 dark:border-slate-800 p-4 space-y-3">
          <form onSubmit={submit} className="flex items-center">
            <div className="relative w-full">
              <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search products..." className="w-full rounded-full py-2.5 pl-10 pr-4 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-blue-500/50 outline-none text-sm" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </form>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link to="/shop" className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800">Shop</Link>
            <Link to="/deals" className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800">Deals</Link>
            <Link to="/about" className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800">About</Link>
            <Link to="/account" className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800">Account</Link>
          </div>
        </div>
      )}
    </header>
  );
}
