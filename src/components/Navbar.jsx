import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Send, Menu, X, ExternalLink, Globe } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  currency, 
  setCurrency,
  onOpenWizard
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-euro-800/40 backdrop-blur-xl">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-euro-900 via-euro-800 to-euro-900 text-xs py-1.5 px-4 text-center border-b border-euro-700/30 flex items-center justify-center gap-2 text-slate-300">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-medium text-slate-200">
          🇪🇺 Almanya, İtalya & Fransa'dan Orijinal Kişisel Alışveriş
        </span>
        <span className="text-euro-400 hidden sm:inline">•</span>
        <span className="hidden sm:inline text-slate-300">
          Dolap & Gardrops Güvenli Alışveriş Desteği
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-12 h-12 shrink-0">
              <img 
                src="/logo.jpg" 
                alt="Avrupadan Sana Shop Logo" 
                className="w-12 h-12 shrink-0 rounded-xl object-cover bg-white/10 p-0.5 border border-euro-600/40 shadow-lg group-hover:scale-105 transition duration-300"
              />
              <span className="absolute -bottom-1 -right-1 bg-euro-600 text-[10px] font-bold px-1.5 py-0.2 rounded-full text-white border border-euro-900 shadow">
                EU
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white font-display flex items-center gap-1">
                Avrupadan<span className="text-euro-400">.Sana</span><span className="text-amber-400">.Shop</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                Avrupa'dan Kapınıza Özel İthalat
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#katalog" className="hover:text-euro-400 transition">Katalog</a>
            <a href="#ozel-siparis" onClick={(e) => { e.preventDefault(); onOpenWizard(); }} className="hover:text-amber-400 transition flex items-center gap-1.5 text-amber-300 font-semibold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Avrupa'dan İste
            </a>
            <a href="#guvence" className="hover:text-euro-400 transition">Orijinallik & Güvence</a>
            <a href="#sss" className="hover:text-euro-400 transition">Sıkça Sorulanlar</a>
          </nav>

          {/* Social Badges & Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Currency Switcher */}
            <div className="flex items-center bg-euro-900/80 rounded-lg p-1 border border-euro-700/50 text-xs font-semibold">
              <button 
                onClick={() => setCurrency('TRY')}
                className={`px-2.5 py-1 rounded-md transition ${currency === 'TRY' ? 'bg-euro-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                ₺ TRY
              </button>
              <button 
                onClick={() => setCurrency('EUR')}
                className={`px-2.5 py-1 rounded-md transition ${currency === 'EUR' ? 'bg-euro-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                € EUR
              </button>
            </div>

            {/* Instagram Profile */}
            <a 
              href="https://www.instagram.com/avrupadan.sana.shop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-amber-900/30 hover:from-purple-800/60 hover:to-amber-800/50 rounded-lg border border-pink-500/30 transition shadow-sm"
              title="Instagram @avrupadan.sana.shop"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
              <span>@avrupadan.sana.shop</span>
            </a>

            {/* Dolap & Gardrops Quick Links */}
            <div className="flex items-center gap-1.5">
              <a 
                href="https://dolap.com/profil/avrupadansana1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/50 rounded-lg border border-emerald-600/30 transition"
              >
                Dolap
              </a>
              <a 
                href="https://www.gardrops.com/avrupadansana1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 text-xs font-bold text-pink-400 bg-pink-950/40 hover:bg-pink-900/50 rounded-lg border border-pink-600/30 transition"
              >
                Gardrops
              </a>
            </div>

            {/* Cart Button */}
            <button 
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-euro-600 hover:bg-euro-500 text-white px-3.5 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-euro-900/50 transition active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden lg:inline">Sepet</span>
              {cartCount > 0 && (
                <span className="bg-amber-400 text-euro-950 text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button 
              onClick={onOpenCart}
              className="relative p-2.5 bg-euro-900/80 border border-euro-700/60 rounded-xl text-white"
            >
              <ShoppingBag className="w-5 h-5 text-euro-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-euro-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-euro-700/40 p-5 space-y-4 animate-in slide-in-from-top">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Para Birimi</span>
            <div className="flex bg-euro-900 rounded-lg p-0.5 border border-euro-700">
              <button 
                onClick={() => setCurrency('TRY')}
                className={`px-3 py-1 text-xs rounded-md font-semibold ${currency === 'TRY' ? 'bg-euro-600 text-white' : 'text-slate-400'}`}
              >
                ₺ TRY
              </button>
              <button 
                onClick={() => setCurrency('EUR')}
                className={`px-3 py-1 text-xs rounded-md font-semibold ${currency === 'EUR' ? 'bg-euro-600 text-white' : 'text-slate-400'}`}
              >
                € EUR
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <a 
              href="#katalog" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-200 font-medium hover:bg-euro-800/40"
            >
              Ürün Kataloğu
            </a>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenWizard(); }}
              className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg text-amber-300 font-semibold bg-amber-500/10 border border-amber-500/20"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Avrupa'dan Özel İste
              </span>
              <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded text-amber-300">Yeni</span>
            </button>
            <a 
              href="#guvence" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-200 font-medium hover:bg-euro-800/40"
            >
              Orijinallik & Güvence
            </a>
            <a 
              href="#sss" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-200 font-medium hover:bg-euro-800/40"
            >
              Sıkça Sorulan Sorular
            </a>
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <a 
              href="https://www.instagram.com/avrupadan.sana.shop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-900/50 to-pink-900/50 text-white border border-pink-500/30"
            >
              <InstagramIcon className="w-4 h-4 text-pink-400" />
              Instagram: @avrupadan.sana.shop
            </a>
            <div className="grid grid-cols-2 gap-2">
              <a 
                href="https://dolap.com/profil/avrupadansana1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center py-2 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-600/30"
              >
                Dolap (@avrupadansana1)
              </a>
              <a 
                href="https://www.gardrops.com/avrupadansana1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center py-2 rounded-xl text-xs font-bold text-pink-300 bg-pink-950/60 border border-pink-600/30"
              >
                Gardrops (@avrupadansana1)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
