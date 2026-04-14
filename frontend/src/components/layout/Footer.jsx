import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 bg-stone-100 font-body text-sm tracking-wide text-stone-900">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-8 max-w-screen-2xl mx-auto">
        {/* Brand */}
        <div className="col-span-1">
          <Link to="/">
            <h3 className="text-lg font-bold tracking-widest text-stone-900 mb-6 uppercase font-headline">
              THE ATELIER
            </h3>
          </Link>
          <p className="text-stone-500 mb-6 leading-relaxed max-w-xs">
            Curating timeless aesthetics for the modern individual. A study in form, function, and luxury.
          </p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-stone-500 hover:text-stone-900 cursor-pointer transition-colors">share</span>
            <span className="material-symbols-outlined text-stone-500 hover:text-stone-900 cursor-pointer transition-colors">photo_camera</span>
            <span className="material-symbols-outlined text-stone-500 hover:text-stone-900 cursor-pointer transition-colors">mail</span>
          </div>
        </div>

        {/* Collections */}
        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-widest">Collections</h4>
          <ul className="space-y-4 text-stone-500">
            <li><Link to="/shop" className="hover:text-stone-900 transition-colors">The Archives</Link></li>
            <li><Link to="/shop" className="hover:text-stone-900 transition-colors">New Arrivals</Link></li>
            <li><Link to="/shop" className="hover:text-stone-900 transition-colors">Limited Editions</Link></li>
            <li><Link to="/shop" className="hover:text-stone-900 transition-colors">Atelier Goods</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-widest">Support</h4>
          <ul className="space-y-4 text-stone-500">
            <li><Link to="/contact" className="hover:text-stone-900 transition-colors">Contact</Link></li>
            <li><a href="#" className="hover:text-stone-900 transition-colors">Shipping &amp; Returns</a></li>
            <li><a href="#" className="hover:text-stone-900 transition-colors">Size Guide</a></li>
            <li><a href="#" className="hover:text-stone-900 transition-colors">Sustainability</a></li>
          </ul>
        </div>

        {/* Legal + Newsletter */}
        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-widest">Newsletter</h4>
          <p className="text-stone-500 mb-6 leading-relaxed">Join our inner circle for exclusive previews.</p>
          <div className="flex border-b border-stone-400 pb-2 mb-8">
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none placeholder:text-stone-400"
              placeholder="Email Address"
              type="email"
            />
            <button className="material-symbols-outlined text-stone-500 hover:text-stone-900 transition-colors">
              arrow_forward
            </button>
          </div>
          <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">Legal</h4>
          <ul className="space-y-3 text-stone-500">
            <li><Link to="/privacy" className="hover:text-stone-900 transition-colors">Privacy Policy</Link></li>
            <li><a href="#" className="hover:text-stone-900 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-stone-900 transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-16 md:mt-20 px-6 md:px-8 max-w-screen-2xl mx-auto border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-stone-400 text-xs tracking-[0.2em] uppercase">© 2024 THE ATELIER. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8 text-xs tracking-[0.2em] uppercase text-stone-400">
          <Link to="/about" className="hover:text-stone-900 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-stone-900 transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
