export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">Shop</h4>
          <ul className="space-y-2 text-slate-600 dark:text-slate-300">
            <li>New arrivals</li>
            <li>Best sellers</li>
            <li>Gift cards</li>
            <li>Sale</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">Support</h4>
          <ul className="space-y-2 text-slate-600 dark:text-slate-300">
            <li>Help center</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Warranty</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">Company</h4>
          <ul className="space-y-2 text-slate-600 dark:text-slate-300">
            <li>About</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">Legal</h4>
          <ul className="space-y-2 text-slate-600 dark:text-slate-300">
            <li>Privacy</li>
            <li>Terms</li>
            <li>Cookies</li>
            <li>Licenses</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 py-6">© {new Date().getFullYear()} BlueShop. All rights reserved.</div>
    </footer>
  );
}
