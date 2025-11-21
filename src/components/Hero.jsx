import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[520px] sm:h-[640px]">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/90 dark:from-slate-900/10 dark:via-slate-900/40 dark:to-slate-900/95 pointer-events-none" />
      </div>
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <span className="inline-flex items-center mb-4 text-xs px-2.5 py-1.5 rounded-full bg-slate-900/80 text-white shadow">Fintech Collection</span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">Elevate your payments with glassmorphic design</h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-xl">Discover premium cards, accessories, and tools that blend modern minimalism with powerful features. Built for speed, security, and style.</p>
            <div className="mt-8 flex items-center gap-3">
              <Link to="/shop" className="px-5 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">Shop now</Link>
              <Link to="/deals" className="px-5 py-3 rounded-full bg-slate-900/80 dark:bg-white/10 text-white dark:text-white hover:bg-slate-900 transition">Explore deals</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
