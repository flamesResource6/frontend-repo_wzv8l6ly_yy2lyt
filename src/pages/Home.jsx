import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import Featured from '../components/Featured';
import Footer from '../components/Footer';
import { api, getClientId } from '../utils/api';

export default function Home() {
  const [dark, setDark] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const id = getClientId();
        const cart = await api(`/cart?client_id=${id}`);
        setCartCount(cart.length);
      } catch (e) {}
    })();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar dark={dark} setDark={setDark} cartCount={cartCount} />
      <Hero />
      <Categories />
      <Featured />
      <Footer />
    </div>
  );
}
