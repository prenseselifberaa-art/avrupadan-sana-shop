import React from 'react';
import { TrendingUp, MessageCircle, ShieldCheck, Plane } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../data/products';

export default function AnnouncementBar({ rates }) {
  const eur = rates?.EUR ? rates.EUR.toFixed(2) : '55.61';
  const usd = rates?.USD ? rates.USD.toFixed(2) : '49.02';

  return (
    <div className="bg-gradient-to-r from-[#030812] via-[#091a33] to-[#030812] border-b border-euro-800/40 text-[11px] text-slate-300 py-1.5 px-3 sm:px-6 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left / Center on Mobile: Live Currency Rates */}
        <div className="w-full md:w-auto flex items-center justify-between sm:justify-start gap-2 sm:gap-2.5">
          <div className="flex items-center gap-1.5 bg-emerald-950/70 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-[10px] tracking-wider uppercase">Canlı Kur</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold">
            <span className="bg-[#0b192c] text-amber-300 px-2 py-0.5 rounded-md border border-euro-700/60 shadow-sm">
              1 € = {eur} ₺
            </span>
            <span className="bg-[#0b192c] text-sky-300 px-2 py-0.5 rounded-md border border-euro-700/60 shadow-sm">
              1 $ = {usd} ₺
            </span>
          </div>

          {/* Quick WhatsApp text only on mobile if space permits */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Merhaba! Avrupadan.Sana.Shop üzerinden bilgi almak ve sipariş vermek istiyorum.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-600/40 shrink-0"
          >
            <MessageCircle className="w-3 h-3 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Center: Free Delivery & Sourcing Guarantee (Desktop & Tablet only) */}
        <div className="hidden lg:flex items-center gap-3 text-slate-300 text-xs font-medium shrink-0">
          <span className="flex items-center gap-1 text-slate-200">
            <Plane className="w-3.5 h-3.5 text-euro-400" />
            <span>Türkiye Geneli Sigortalı Kargo</span>
          </span>
          <span className="text-euro-700 font-bold">•</span>
          <span className="flex items-center gap-1 text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>%100 Orijinal Avrupa Faturalı</span>
          </span>
        </div>

        {/* Right: Direct WhatsApp Line (Desktop & Tablet only) */}
        <a 
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Merhaba! Avrupadan.Sana.Shop üzerinden bilgi almak ve sipariş vermek istiyorum.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900/80 px-3 py-1 rounded-full border border-emerald-600/40 transition active:scale-95 text-[11px] shadow-sm shrink-0 whitespace-nowrap"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>WhatsApp Hattı: {WHATSAPP_DISPLAY}</span>
        </a>

      </div>
    </div>
  );
}
