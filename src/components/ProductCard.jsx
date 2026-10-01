import React from 'react';
import { ShoppingBag, Eye, ExternalLink, Sparkles, Heart, Images } from 'lucide-react';
import { convertFromTRY, formatCurrency } from '../utils/currency';

export default function ProductCard({ 
  product, 
  currency, 
  rates,
  onSelectProduct, 
  onAddToCart,
  onOpenWizard,
  mobileCols = 2,
  isFavorite = false,
  onToggleFavorite
}) {
  const isCustom = product.isCustomQuote;
  const convertedPrice = convertFromTRY(product.priceTRY, currency, rates);
  const formattedMainPrice = formatCurrency(convertedPrice, currency);

  // Secondary price for reference
  const secondaryPrice = currency === 'TRY' 
    ? `~ €${convertFromTRY(product.priceTRY, 'EUR', rates)}`
    : `~ ${product.priceTRY.toLocaleString('tr-TR')} ₺`;

  const isOneCol = mobileCols === 1;

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col group border border-euro-800/60 hover:border-euro-500/60 transition-all duration-300 shadow-lg shadow-black/20 w-full">
      
      {/* Product Image Container */}
      <div 
        onClick={() => onSelectProduct(product)}
        className="relative aspect-square overflow-hidden bg-euro-950 cursor-pointer w-full"
      >
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2 inset-x-2 flex items-center justify-between pointer-events-none">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-euro-950/90 text-slate-200 border border-euro-700/60 backdrop-blur-md shadow-sm">
            {product.condition}
          </span>
          
          <div className="flex items-center gap-1 pointer-events-auto">
            {product.images && product.images.length > 1 && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-euro-950/85 text-slate-300 border border-euro-700/60 backdrop-blur-md flex items-center gap-1 shadow-sm">
                <Images className="w-2.5 h-2.5 text-euro-400" />
                <span>{product.images.length}</span>
              </span>
            )}
            {product.isRare && (
              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-euro-950 uppercase tracking-wider flex items-center gap-1 shadow-md">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Nadir</span>
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleFavorite) onToggleFavorite(product.id);
              }}
              className={`p-1.5 rounded-full backdrop-blur-md border transition active:scale-90 shadow-md ${
                isFavorite 
                  ? 'bg-rose-500 text-white border-rose-400' 
                  : 'bg-euro-950/80 text-slate-300 hover:text-white border-euro-700/60 hover:bg-euro-900'
              }`}
              title={isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
              aria-label="Favorilere Ekle"
            >
              <Heart className={`w-3 h-3 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Brand Pill on image bottom */}
        <div className="absolute bottom-2 left-2 pointer-events-none">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-euro-950/90 text-euro-300 border border-euro-800/80 backdrop-blur-md shadow-sm">
            {product.brand}
          </span>
        </div>

        {/* Desktop Quick View Overlay */}
        <div className="hidden sm:flex absolute inset-0 bg-euro-950/40 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center gap-2 text-white font-semibold text-xs backdrop-blur-[2px]">
          <span className="bg-euro-900/95 px-3.5 py-2 rounded-xl border border-euro-600/50 flex items-center gap-1.5 shadow-xl hover:bg-euro-800">
            <Eye className="w-3.5 h-3.5 text-euro-400" />
            Detaylı İncele
          </span>
        </div>
      </div>

      {/* Card Info Container */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5 w-full">
        
        {/* Title */}
        <div>
          <h3 
            onClick={() => onSelectProduct(product)}
            className="text-xs sm:text-base font-bold text-white leading-snug line-clamp-2 hover:text-euro-400 cursor-pointer transition"
            title={product.title}
          >
            {product.title}
          </h3>
          {/* Subtitle description (visible on 1-col or desktop) */}
          <p className={`mt-1 text-[11px] sm:text-xs text-slate-300 line-clamp-2 leading-relaxed ${isOneCol ? 'block' : 'hidden sm:block'}`}>
            {product.description}
          </p>
        </div>

        {/* Price & Platform Row */}
        <div className="pt-2 border-t border-euro-800/50">
          
          <div className="flex items-center justify-between gap-1">
            {isCustom ? (
              <span className="text-xs sm:text-sm font-bold text-amber-400">
                Fiyat Teklifi
              </span>
            ) : (
              <div className="flex flex-col min-w-0">
                <span className="text-sm sm:text-xl font-extrabold text-white font-display whitespace-nowrap tracking-tight">
                  {formattedMainPrice}
                </span>
                <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                  {secondaryPrice}
                </span>
              </div>
            )}

            {/* Direct Platform Links (Dolap & Gardrops) */}
            <div className="flex items-center gap-1 shrink-0">
              {product.gardropsUrl && (
                <a 
                  href={product.gardropsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-pink-300 hover:text-white bg-pink-950/60 hover:bg-pink-900/70 px-1.5 sm:px-2 py-0.5 rounded border border-pink-700/40 transition flex items-center gap-0.5"
                  title="Gardrops'ta Görüntüle"
                >
                  <span className={isOneCol ? 'inline' : 'hidden sm:inline'}>Gardrops</span>
                  <span className={isOneCol ? 'hidden' : 'sm:hidden'}>G</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
              {product.dolapUrl && (
                <a 
                  href={product.dolapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/70 px-1.5 sm:px-2 py-0.5 rounded border border-emerald-700/40 transition flex items-center gap-0.5"
                  title="Dolap'ta Görüntüle"
                >
                  <span className={isOneCol ? 'inline' : 'hidden sm:inline'}>Dolap</span>
                  <span className={isOneCol ? 'hidden' : 'sm:hidden'}>D</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-2.5">
            {isCustom ? (
              <button 
                onClick={onOpenWizard}
                className="w-full flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-euro-950 font-extrabold text-xs shadow-md transition active:scale-95 touch-manipulation"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Özel İstek Ver</span>
              </button>
            ) : isOneCol ? (
              /* 1-Col Mode: Full spacious button row */
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => onSelectProduct(product)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-euro-900/80 hover:bg-euro-800 text-slate-200 text-xs font-semibold border border-euro-700/60 transition active:scale-95 touch-manipulation"
                >
                  <Eye className="w-3.5 h-3.5 text-euro-400" />
                  <span>Detaylı İncele</span>
                </button>
                <button 
                  onClick={() => onAddToCart(product)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-euro-600 to-euro-700 hover:from-euro-500 hover:to-euro-600 text-white text-xs font-bold transition shadow-md shadow-euro-950/60 active:scale-95 border border-euro-500/30 touch-manipulation"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-white" />
                  <span>Sepete Ekle</span>
                </button>
              </div>
            ) : (
              /* 2-Col Mode: Clean, balanced touch actions */
              <div className="grid grid-cols-2 gap-1.5">
                <button 
                  onClick={() => onSelectProduct(product)}
                  className="flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-euro-900/80 hover:bg-euro-800 text-slate-200 text-[11px] sm:text-xs font-semibold border border-euro-700/60 transition active:scale-95 touch-manipulation"
                >
                  <Eye className="w-3 h-3 text-euro-400" />
                  <span>İncele</span>
                </button>
                <button 
                  onClick={() => onAddToCart(product)}
                  className="flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-gradient-to-r from-euro-600 to-euro-700 hover:from-euro-500 hover:to-euro-600 text-white text-[11px] sm:text-xs font-bold transition shadow-md shadow-euro-950/60 active:scale-95 border border-euro-500/30 touch-manipulation"
                >
                  <ShoppingBag className="w-3 h-3 text-white" />
                  <span>Sepet</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
