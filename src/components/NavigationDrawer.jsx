import React from 'react';
import { X, Sparkles, MessageCircle, ExternalLink, ShieldCheck, ChevronRight, Plane, Package, ShoppingBag } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { CATEGORIES, WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../data/products';

export default function NavigationDrawer({ 
  isOpen, 
  onClose, 
  currency, 
  setCurrency,
  onOpenWizard,
  onSelectCategory,
  rates
}) {
  if (!isOpen) return null;

  const eur = rates?.EUR ? rates.EUR.toFixed(2) : '55.60';
  const usd = rates?.USD ? rates.USD.toFixed(2) : '49.00';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div 
          className="w-screen max-w-xs sm:max-w-sm glass-panel border-r border-euro-700/60 shadow-2xl flex flex-col justify-between overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Profile */}
          <div className="p-5 border-b border-euro-800/80 bg-euro-950/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-auto bg-white rounded-xl p-1 shadow-md border border-slate-300/40 flex items-center justify-center shrink-0">
                <img 
                  src="/logo.jpg" 
                  alt="Avrupadan Sana Shop" 
                  className="h-full w-auto object-contain rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white font-display">
                  Avrupadan<span className="text-euro-400">.Sana</span><span className="text-amber-400">.Shop</span>
                </h3>
                <span className="text-[10px] text-slate-300 block font-medium">
                  Avrupa İthalat & Kişisel Alışveriş
                </span>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-euro-900/80 text-slate-400 hover:text-white border border-euro-700/60 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 space-y-5 flex-1">
            
            {/* Currency Selector inside Drawer */}
            <div className="bg-euro-900/50 p-3 rounded-xl border border-euro-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Para Birimi Seçimi
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  Canlı Kurlar
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'TRY', label: '₺ TRY' },
                  { id: 'EUR', label: '€ EUR' },
                  { id: 'USD', label: '$ USD' }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCurrency(c.id)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition ${
                      currency === c.id 
                        ? 'bg-euro-600 text-white shadow-md' 
                        : 'bg-euro-950 text-slate-300 hover:text-white border border-euro-800'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1">
                <span>1 € = {eur} ₺</span>
                <span>1 $ = {usd} ₺</span>
              </div>
            </div>

            {/* Custom Order Callout Button */}
            <button
              onClick={() => { onClose(); onOpenWizard(); }}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/40 text-amber-300 font-bold text-xs shadow-md transition active:scale-95"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                Avrupa'dan Özel İstek Ver
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Category Shortcuts */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                Kategoriler
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-euro-800/50 transition text-left"
                >
                  <span>{cat.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              ))}
            </div>

            {/* Platforms */}
            <div className="space-y-2 pt-2 border-t border-euro-800/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                Resmi Kanallarımız
              </span>
              
              <a 
                href="https://www.instagram.com/avrupadan.sana.shop"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/40 border border-purple-600/30 text-xs font-bold text-purple-300 transition"
              >
                <span className="flex items-center gap-2">
                  <InstagramIcon className="w-4 h-4 text-pink-400" />
                  Instagram @avrupadan.sana.shop
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a 
                href="https://dolap.com/profil/avrupadansana1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-600/30 text-xs font-bold text-emerald-300 transition"
              >
                <span>Dolap (@avrupadansana1)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a 
                href="https://www.gardrops.com/avrupadansana1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-pink-950/40 border border-pink-600/30 text-xs font-bold text-pink-300 transition"
              >
                <span>Gardrops (@avrupadansana1)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Footer with WhatsApp Direct Line */}
          <div className="p-5 border-t border-euro-800/80 bg-euro-950/70 space-y-2">
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Merhaba! Avrupadan.Sana.Shop üzerinden bilgi almak ve sipariş vermek istiyorum.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-lg transition active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
            </a>
            <p className="text-center text-[10px] text-slate-500">
              %100 Orijinal • Faturalı İthalat Garantisi
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
