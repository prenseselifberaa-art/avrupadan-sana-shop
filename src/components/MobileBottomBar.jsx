import React from 'react';
import { Home, Compass, Plane, ShoppingBag, Sparkles } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function MobileBottomBar({ 
  cartCount, 
  onOpenCart, 
  onOpenWizard, 
  scrollToCatalog,
  scrollToTop
}) {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#070e1b]/95 backdrop-blur-xl border-t border-euro-800/80 pb-[max(env(safe-area-inset-bottom),8px)] shadow-2xl">
      <div className="grid grid-cols-5 items-center h-16 px-2">
        
        {/* Home */}
        <button
          onClick={scrollToTop}
          className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-white active:scale-95 transition"
        >
          <Home className="w-5 h-5 text-slate-300" />
          <span className="text-[10px] font-semibold">Vitrin</span>
        </button>

        {/* Katalog */}
        <button
          onClick={scrollToCatalog}
          className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-white active:scale-95 transition"
        >
          <Compass className="w-5 h-5 text-slate-300" />
          <span className="text-[10px] font-semibold">Katalog</span>
        </button>

        {/* Center Action: Avrupa'dan İste (Floating style) */}
        <div className="flex justify-center -mt-5">
          <button
            onClick={onOpenWizard}
            className="flex flex-col items-center justify-center w-13 h-13 rounded-full bg-gradient-to-tr from-euro-600 via-euro-500 to-amber-400 text-white shadow-lg shadow-euro-900/80 border-2 border-euro-950 active:scale-90 transition transform"
            title="Avrupa'dan Özel İstek"
          >
            <Plane className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/avrupadan.sana.shop"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-pink-400 active:scale-95 transition"
        >
          <InstagramIcon className="w-5 h-5 text-pink-400" />
          <span className="text-[10px] font-semibold">Instagram</span>
        </a>

        {/* Sepet */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-white active:scale-95 transition"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-euro-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-amber-400 text-euro-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold">Sepet</span>
        </button>

      </div>
    </div>
  );
}
