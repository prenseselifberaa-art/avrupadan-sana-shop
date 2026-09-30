import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Send, Menu, X, ExternalLink, Globe, TrendingUp } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  currency, 
  setCurrency,
  onOpenWizard,
  rates
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-euro-800/40 backdrop-blur-xl">
      
      {/* Top Live Rates Banner */}
      <div className="bg-gradient-to-r from-[#06101e] via-[#091b33] to-[#06101e] text-[11px] py-1.5 px-3 text-center border-b border-euro-700/30 flex items-center justify-center gap-2 sm:gap-3 text-slate-300 overflow-x-auto whitespace-nowrap scrollbar-none">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
        <span className="font-bold text-slate-100 flex items-center gap-1.5 shrink-0">
          <TrendingUp className="w-3 h-3 text-emerald-400" />
          Canlı Kurlar:
        </span>
        <span className="bg-euro-900/90 text-amber-300 font-mono font-bold px-2 py-0.5 rounded border border-euro-700/60 shrink-0">
          1 € = {rates?.EUR ? rates.EUR.toFixed(2) : '55.60'} ₺
        </span>
        <span className="bg-euro-900/90 text-blue-300 font-mono font-bold px-2 py-0.5 rounded border border-euro-700/60 shrink-0">
          1 $ = {rates?.USD ? rates.USD.toFixed(2) : '49.00'} ₺
        </span>
        <span className="text-slate-400 hidden md:inline shrink-0">
          • Almanya, İtalya & Fransa'dan Orijinal Kişisel İthalat
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0">
              <img 
                src="/logo.jpg" 
                alt="Avrupadan Sana Shop Logo" 
                className="w-full h-full shrink-0 rounded-xl object-cover bg-white/10 p-0.5 border border-euro-600/40 shadow-lg group-hover:scale-105 transition duration-300"
              />
              <span className="absolute -bottom-1 -right-1 bg-euro-600 text-[9px] sm:text-[10px] font-black px-1.5 py-0.2 rounded-full text-white border border-euro-900 shadow">
                EU
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-display flex items-center gap-0.5 sm:gap-1">
                Avrupadan<span className="text-euro-400">.Sana</span><span className="text-amber-400">.Shop</span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-wide">
                Avrupa'dan Kapınıza Özel İthalat
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#katalog" className="hover:text-euro-400 transition">Katalog</a>
            <a 
              href="#ozel-siparis" 
              onClick={(e) => { e.preventDefault(); onOpenWizard(); }} 
              className="hover:text-amber-400 transition flex items-center gap-1.5 text-amber-300 font-semibold bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Avrupa'dan İste
            </a>
            <a href="#guvence" className="hover:text-euro-400 transition">Orijinallik & Güvence</a>
            <a href="#sss" className="hover:text-euro-400 transition">Sıkça Sorulanlar</a>
          </nav>

          {/* Right Actions: Currency, Social, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Currency Selector (3-way: TRY / EUR / USD) */}
            <div className="flex items-center bg-euro-950/90 rounded-lg p-0.5 border border-euro-700/60 text-xs font-bold">
              <button 
                onClick={() => setCurrency('TRY')}
                className={`px-2 py-1 rounded-md transition ${currency === 'TRY' ? 'bg-euro-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                title="Türk Lirası (₺)"
              >
                ₺
              </button>
              <button 
                onClick={() => setCurrency('EUR')}
                className={`px-2 py-1 rounded-md transition ${currency === 'EUR' ? 'bg-euro-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                title="Euro (€)"
              >
                €
              </button>
              <button 
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded-md transition ${currency === 'USD' ? 'bg-euro-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                title="Amerikan Doları ($)"
              >
                $
              </button>
            </div>

            {/* Instagram Profile */}
            <a 
              href="https://www.instagram.com/avrupadan.sana.shop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-gradient-to-r from-purple-900/40 to-pink-900/40 hover:from-purple-800/60 hover:to-pink-800/60 rounded-lg border border-pink-500/30 transition shadow-sm"
              title="Instagram @avrupadan.sana.shop"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
              <span className="hidden md:inline">@avrupadan.sana.shop</span>
            </a>

            {/* Dolap & Gardrops Quick Links */}
            <div className="hidden lg:flex items-center gap-1.5">
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
              className="relative flex items-center gap-2 bg-euro-600 hover:bg-euro-500 text-white px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-euro-900/50 transition active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Sepet</span>
              {cartCount > 0 && (
                <span className="bg-amber-400 text-euro-950 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white md:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-euro-700/40 p-5 space-y-4 animate-in slide-in-from-top">
          
          {/* Live Currency Details */}
          <div className="bg-euro-900/60 p-3 rounded-xl border border-euro-800 space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Canlı Döviz Kuru ({rates?.lastUpdated || 'Canlı'})
            </span>
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-amber-300">1 € = {rates?.EUR ? rates.EUR.toFixed(2) : '55.60'} ₺</span>
              <span className="text-blue-300">1 $ = {rates?.USD ? rates.USD.toFixed(2) : '49.00'} ₺</span>
            </div>
          </div>

          <div className="space-y-1">
            <a 
              href="#katalog" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-slate-200 font-semibold hover:bg-euro-800/40"
            >
              Ürün Kataloğu
            </a>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenWizard(); }}
              className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg text-amber-300 font-bold bg-amber-500/10 border border-amber-500/20"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Avrupa'dan Özel İste
              </span>
              <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-300">Kişisel Sipariş</span>
            </button>
            <a 
              href="#guvence" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-slate-200 font-semibold hover:bg-euro-800/40"
            >
              Orijinallik & Güvence
            </a>
            <a 
              href="#sss" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-slate-200 font-semibold hover:bg-euro-800/40"
            >
              Sıkça Sorulan Sorular
            </a>
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <a 
              href="https://www.instagram.com/avrupadan.sana.shop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-900/50 to-pink-900/50 text-white border border-pink-500/30"
            >
              <InstagramIcon className="w-4 h-4 text-pink-400" />
              Instagram: @avrupadan.sana.shop
            </a>
            <div className="grid grid-cols-2 gap-2">
              <a 
                href="https://dolap.com/profil/avrupadansana1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center py-2.5 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-600/30"
              >
                Dolap Profilimiz
              </a>
              <a 
                href="https://www.gardrops.com/avrupadansana1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center py-2.5 rounded-xl text-xs font-bold text-pink-300 bg-pink-950/60 border border-pink-600/30"
              >
                Gardrops Profilimiz
              </a>
            </div>
          </div>

        </div>
      )}
    </header>
  );
}
