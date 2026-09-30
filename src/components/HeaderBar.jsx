import React from 'react';
import { Menu, ShoppingBag, Search, Sparkles } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function HeaderBar({ 
  onOpenDrawer, 
  cartCount, 
  onOpenCart, 
  currency, 
  setCurrency, 
  onOpenWizard, 
  onFocusSearch 
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-euro-800/60 backdrop-blur-xl shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 sm:h-18 gap-2">
          
          {/* Left: Mobile Drawer Trigger + Brand Logo */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Hamburger Button for Mobile & Tablet only */}
            <button
              onClick={onOpenDrawer}
              className="xl:hidden p-1.5 text-slate-200 hover:text-white rounded-lg hover:bg-euro-800/50 transition active:scale-95 touch-manipulation"
              aria-label="Menüyü Aç"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Brand Logo & Title */}
            <a href="#" className="flex items-center gap-2 group shrink-0">
              <div className="h-9 sm:h-11 w-auto bg-white rounded-xl p-1 shadow-md border border-slate-300/40 group-hover:scale-105 transition duration-300 flex items-center justify-center shrink-0">
                <img 
                  src="/logo.jpg" 
                  alt="Avrupadan.Sana.Shop Logo" 
                  className="h-full w-auto object-contain rounded-lg"
                  loading="eager"
                />
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm sm:text-lg font-extrabold tracking-tight text-white font-display flex items-center leading-none">
                  Avrupadan<span className="text-euro-400">.Sana</span><span className="text-amber-400">.Shop</span>
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium tracking-wide hidden sm:inline mt-0.5">
                  Avrupa İthalat & Kişisel Alışveriş
                </span>
              </div>
            </a>
          </div>

          {/* Center Navigation: Desktop Menu (XL and above) */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-bold text-slate-200 shrink-0">
            <a 
              href="#katalog" 
              className="hover:text-euro-400 transition py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-euro-500 after:scale-x-0 hover:after:scale-x-100 after:transition"
            >
              Katalog
            </a>
            
            <button 
              onClick={onOpenWizard} 
              className="hover:text-amber-300 transition flex items-center gap-1.5 text-amber-400 font-bold bg-amber-500/15 hover:bg-amber-500/25 px-3 py-1.5 rounded-full border border-amber-500/30 shadow-sm active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Avrupa'dan Özel İstek</span>
            </button>

            <a 
              href="#guvence" 
              className="hover:text-euro-400 transition py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-euro-500 after:scale-x-0 hover:after:scale-x-100 after:transition"
            >
              %100 Orijinallik
            </a>
            
            <a 
              href="#sss" 
              className="hover:text-euro-400 transition py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-euro-500 after:scale-x-0 hover:after:scale-x-100 after:transition"
            >
              Sıkça Sorulanlar
            </a>
          </nav>

          {/* Right Controls: Currency Switcher, Instagram, Search, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Currency Selector (Compact Segmented Control) */}
            <div className="flex items-center bg-[#070e1b] rounded-lg p-0.5 border border-euro-700/60 shadow-inner">
              {[
                { id: 'TRY', symbol: '₺' },
                { id: 'EUR', symbol: '€' },
                { id: 'USD', symbol: '$' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCurrency(c.id)}
                  title={`${c.id} para birimine geç`}
                  className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[11px] sm:text-xs font-bold transition ${
                    currency === c.id 
                      ? 'bg-euro-600 text-white shadow' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {c.symbol}
                </button>
              ))}
            </div>

            {/* Instagram Quick Link (Icon button on tablet/desktop) */}
            <a 
              href="https://www.instagram.com/avrupadan.sana.shop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-slate-100 bg-gradient-to-r from-purple-950/60 to-pink-950/60 hover:from-purple-900/70 hover:to-pink-900/70 rounded-lg border border-pink-500/30 transition shadow-sm"
              title="Instagram @avrupadan.sana.shop"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
              <span className="hidden 2xl:inline">@avrupadan.sana.shop</span>
            </a>

            {/* Search Trigger Button */}
            <button
              onClick={onFocusSearch}
              className="p-1.5 sm:p-2 rounded-lg text-slate-200 hover:text-white bg-euro-900/80 border border-euro-700/60 hover:border-euro-500 hover:bg-euro-800 transition active:scale-95"
              aria-label="Katalogda Arama Yap"
              title="Arama Yap"
            >
              <Search className="w-4 h-4 text-euro-400" />
            </button>

            {/* Cart Button */}
            <button 
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 bg-gradient-to-r from-euro-600 to-euro-700 hover:from-euro-500 hover:to-euro-600 text-white px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md shadow-euro-950/60 transition active:scale-95 border border-euro-500/40"
              aria-label="Sepeti Görüntüle"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="hidden sm:inline font-bold">Sepet</span>
              {cartCount > 0 && (
                <span className="bg-amber-400 text-euro-950 text-[10px] font-black min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
