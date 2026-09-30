import React from 'react';
import { ShoppingBag, Eye, ExternalLink, Sparkles, Shield, Tag } from 'lucide-react';

export default function ProductCard({ 
  product, 
  currency, 
  onSelectProduct, 
  onAddToCart,
  onOpenWizard
}) {
  const isCustom = product.isCustomQuote;

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col group border border-euro-800/50 hover:border-euro-600/50 transition-all duration-300">
      
      {/* Image Container */}
      <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-euro-950/60">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-euro-950/85 text-slate-200 border border-euro-700/60 backdrop-blur-md">
            {product.condition}
          </span>
          {product.isRare && (
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/90 text-euro-950 uppercase tracking-wider flex items-center gap-1 shadow-md">
              <Sparkles className="w-2.5 h-2.5" />
              Nadir Koleksiyon
            </span>
          )}
        </div>

        {/* Brand Pill */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-euro-900/90 text-euro-300 border border-euro-800 backdrop-blur-md">
            {product.brand}
          </span>
        </div>

        {/* Quick View Overlay Button */}
        <button 
          onClick={() => onSelectProduct(product)}
          className="absolute inset-0 bg-euro-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-semibold text-xs backdrop-blur-[2px]"
        >
          <span className="bg-euro-900/90 px-3.5 py-2 rounded-xl border border-euro-600/50 flex items-center gap-1.5 shadow-xl hover:bg-euro-800">
            <Eye className="w-3.5 h-3.5 text-euro-400" />
            Detaylı İncele
          </span>
        </button>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          <h3 
            onClick={() => onSelectProduct(product)}
            className="text-base font-bold text-white leading-snug line-clamp-2 hover:text-euro-400 cursor-pointer transition"
          >
            {product.title}
          </h3>
          <p className="mt-1 text-xs text-slate-400 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price & Platform Badges */}
        <div className="pt-2 border-t border-euro-800/40">
          
          <div className="flex items-baseline justify-between">
            {isCustom ? (
              <span className="text-sm font-bold text-amber-400">
                Fiyat Teklifi İsteyin
              </span>
            ) : (
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white font-display">
                  {currency === 'TRY' ? `${product.priceTRY.toLocaleString('tr-TR')} ₺` : `€${product.priceEUR}`}
                </span>
                <span className="text-[11px] text-slate-400">
                  {currency === 'TRY' ? `(~ €${product.priceEUR})` : `(~ ${product.priceTRY.toLocaleString('tr-TR')} ₺)`}
                </span>
              </div>
            )}

            {/* Direct Platform Links */}
            <div className="flex items-center gap-1.5">
              {product.gardropsUrl && (
                <a 
                  href={product.gardropsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-pink-400 hover:text-pink-300 bg-pink-950/40 px-2 py-0.5 rounded border border-pink-700/30 transition flex items-center gap-0.5"
                  title="Gardrops'ta İncele"
                >
                  Gardrops
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
              {product.dolapUrl && (
                <a 
                  href={product.dolapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-700/30 transition flex items-center gap-0.5"
                  title="Dolap'ta İncele"
                >
                  Dolap
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-3.5">
            {isCustom ? (
              <button 
                onClick={onOpenWizard}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs shadow-md transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Avrupa'dan İstek Gönder</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => onSelectProduct(product)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-euro-900/80 hover:bg-euro-800 text-slate-200 text-xs font-semibold border border-euro-700/60 transition"
                >
                  <Eye className="w-3.5 h-3.5 text-euro-400" />
                  İncele
                </button>
                <button 
                  onClick={() => onAddToCart(product)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-euro-600 hover:bg-euro-500 text-white text-xs font-bold transition shadow-md shadow-euro-950/50 active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Sepete Ekle
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
