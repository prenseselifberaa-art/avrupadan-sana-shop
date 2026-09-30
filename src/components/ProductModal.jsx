import React from 'react';
import { X, CheckCircle, ExternalLink, ShoppingBag, MessageCircle, ShieldCheck, Sparkles, Plane } from 'lucide-react';
import { convertFromTRY, formatCurrency } from '../utils/currency';

export default function ProductModal({ 
  product, 
  onClose, 
  currency, 
  rates,
  onAddToCart,
  onOpenWizard
}) {
  if (!product) return null;

  const convertedPrice = convertFromTRY(product.priceTRY, currency, rates);
  const formattedMainPrice = formatCurrency(convertedPrice, currency);

  const whatsappMessage = encodeURIComponent(
    `Merhaba! Avrupadan.Sana.Shop üzerinden "${product.title}" (${product.priceTRY > 0 ? product.priceTRY.toLocaleString('tr-TR') + ' TL' : 'Özel Fiyat'}) ürünü hakkında bilgi almak ve sipariş vermek istiyorum.`
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-euro-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full sm:max-w-3xl glass-card rounded-t-3xl sm:rounded-2xl border-t sm:border border-euro-700/60 overflow-hidden shadow-2xl max-h-[92vh] flex flex-col md:flex-row pb-[max(env(safe-area-inset-bottom),16px)] sm:pb-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Swipe Handle */}
        <div className="sm:hidden w-12 h-1.5 bg-slate-600 rounded-full mx-auto my-2.5 shrink-0"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 rounded-full bg-euro-950/80 text-slate-300 hover:text-white border border-euro-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Section */}
        <div className="w-full md:w-1/2 relative bg-euro-950 aspect-[4/3] sm:aspect-square md:aspect-auto shrink-0 max-h-72 sm:max-h-none">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-euro-900/90 text-white border border-euro-700 backdrop-blur-md">
              {product.condition}
            </span>
            {product.isRare && (
              <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500 text-euro-950 flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3" />
                Nadir Edisyon
              </span>
            )}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto space-y-4">
          
          <div className="space-y-3.5">
            
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-euro-400">
                {product.brand}
              </span>
              <h2 className="text-lg sm:text-2xl font-extrabold text-white font-display leading-snug">
                {product.title}
              </h2>
            </div>

            {/* Price Box */}
            <div className="p-3 rounded-xl bg-euro-900/70 border border-euro-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Satış Fiyatı</span>
                {product.isCustomQuote ? (
                  <span className="text-base sm:text-lg font-bold text-amber-400">Özel Teklif</span>
                ) : (
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-black text-amber-400 font-display">
                      {formattedMainPrice}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {currency === 'TRY' ? `(~ €${convertFromTRY(product.priceTRY, 'EUR', rates)})` : `(~ ${product.priceTRY.toLocaleString('tr-TR')} ₺)`}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-[11px] font-bold px-2 py-1 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Orijinal Avrupa
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>

            {/* Specifications list */}
            {product.specs && (
              <div className="space-y-1.5 pt-2 border-t border-euro-800/60">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Ürün Detayları
                </h4>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {product.specs.map((s, idx) => (
                    <div key={idx} className="bg-euro-950/60 p-2 rounded-lg border border-euro-800/80">
                      <span className="text-slate-400 block text-[9px]">{s.label}</span>
                      <span className="font-semibold text-slate-200 text-xs">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trust badge */}
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-800/30">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Avrupa faturası ve orijinallik kontrolünden geçmiştir.</span>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-3 border-t border-euro-800/60">
            
            {product.isCustomQuote ? (
              <button 
                onClick={() => { onClose(); onOpenWizard(); }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm shadow-lg transition active:scale-95"
              >
                <Plane className="w-4 h-4" />
                <span>Sipariş Sihirbazını Aç</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => { onAddToCart(product); onClose(); }}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-euro-600 hover:bg-euro-500 text-white font-bold text-xs sm:text-sm shadow-lg transition active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Sepete Ekle</span>
                </button>
                <a 
                  href={whatsappUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg transition active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Sor</span>
                </a>
              </div>
            )}

            {/* Platform Direct Buy Buttons */}
            <div className="flex items-center gap-2 pt-1">
              {product.gardropsUrl && (
                <a 
                  href={product.gardropsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg bg-pink-950/60 hover:bg-pink-900/60 text-pink-300 font-bold text-[11px] border border-pink-700/40 transition active:scale-95"
                >
                  <span>Gardrops İlanı</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {product.dolapUrl && (
                <a 
                  href={product.dolapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 font-bold text-[11px] border border-emerald-700/40 transition active:scale-95"
                >
                  <span>Dolap İlanı</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
