import React from 'react';
import { Home, Compass, Plane, ShoppingBag, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

export default function MobileBottomBar({ 
  cartCount, 
  onOpenCart, 
  onOpenWizard, 
  scrollToCatalog,
  scrollToTop
}) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Merhaba! Avrupadan.Sana.Shop üzerinden bilgi almak ve sipariş vermek istiyorum.')}`;

  return (
    <nav 
      aria-label="Mobil Alt Gezinme"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#070e1b]/95 backdrop-blur-2xl border-t border-euro-800/80 pb-[max(env(safe-area-inset-bottom),10px)] shadow-2xl shadow-black"
    >
      <div className="grid grid-cols-5 items-center h-16 px-1 max-w-md mx-auto">
        
        {/* Tab 1: Vitrin */}
        <button
          onClick={scrollToTop}
          className="flex flex-col items-center justify-center gap-1 text-slate-300 hover:text-white active:scale-90 transition touch-manipulation py-1"
          aria-label="Vitrine Dön"
        >
          <Home className="w-5 h-5 text-slate-300" />
          <span className="text-[10px] font-bold tracking-tight">Vitrin</span>
        </button>

        {/* Tab 2: Katalog */}
        <button
          onClick={scrollToCatalog}
          className="flex flex-col items-center justify-center gap-1 text-slate-300 hover:text-white active:scale-90 transition touch-manipulation py-1"
          aria-label="Kataloğa Git"
        >
          <Compass className="w-5 h-5 text-euro-400" />
          <span className="text-[10px] font-bold tracking-tight">Katalog</span>
        </button>

        {/* Tab 3: Center Floating Button - Özel İste */}
        <div className="flex justify-center -mt-6">
          <button
            onClick={onOpenWizard}
            className="flex flex-col items-center justify-center w-13 h-13 rounded-full bg-gradient-to-tr from-euro-600 via-euro-500 to-amber-400 text-white shadow-xl shadow-euro-900/90 border-[3px] border-[#070e1b] active:scale-90 transition transform glow-euro"
            title="Avrupa'dan Özel İstek"
            aria-label="Avrupa'dan Özel İstek"
          >
            <Plane className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Tab 4: WhatsApp Canlı Destek */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-emerald-400 hover:text-emerald-300 active:scale-90 transition touch-manipulation py-1"
          aria-label="WhatsApp Destek Hattı"
        >
          <MessageCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-[10px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* Tab 5: Sepet */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center gap-1 text-slate-300 hover:text-white active:scale-90 transition touch-manipulation py-1"
          aria-label="Alışveriş Sepeti"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-euro-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-amber-400 text-euro-950 font-black text-[10px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight">Sepet</span>
        </button>

      </div>
    </nav>
  );
}
