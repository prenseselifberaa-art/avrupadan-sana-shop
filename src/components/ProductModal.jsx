import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ExternalLink, ShoppingBag, MessageCircle, ShieldCheck, Sparkles, Plane, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { convertFromTRY, formatCurrency } from '../utils/currency';
import { WHATSAPP_NUMBER } from '../data/products';

export default function ProductModal({ 
  product, 
  onClose, 
  currency, 
  rates, 
  onAddToCart, 
  onOpenWizard,
  isFavorite = false,
  onToggleFavorite,
  onShowToast
}) {
  if (!product) return null;

  const images = (product.images && product.images.length > 0) ? product.images : [product.image];
  const [activeIdx, setActiveIdx] = useState(0);

  // Reset active image index when product changes
  useEffect(() => {
    setActiveIdx(0);
  }, [product?.id]);

  const convertedPrice = convertFromTRY(product.priceTRY, currency, rates);
  const formattedMainPrice = formatCurrency(convertedPrice, currency);

  const whatsappMessage = encodeURIComponent(
    `Merhaba! Avrupadan.Sana.Shop üzerinden "${product.title}" (${product.priceTRY > 0 ? product.priceTRY.toLocaleString('tr-TR') + ' TL' : 'Özel Fiyat'}) ürününü satın almak ve detayları öğrenmek istiyorum.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  const handleShare = (e) => {
    e.stopPropagation();
    const shareText = `${product.title} - Avrupadan Sana Shop\n${window.location.origin}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      if (onShowToast) onShowToast('Ürün linki panoya kopyalandı!');
    }
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-euro-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full sm:max-w-3xl glass-card rounded-t-3xl sm:rounded-2xl border-t sm:border border-euro-700/60 overflow-hidden shadow-2xl max-h-[92vh] flex flex-col md:flex-row pb-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Swipe Handle */}
        <div className="sm:hidden w-12 h-1.5 bg-slate-600 rounded-full mx-auto my-2.5 shrink-0"></div>

        {/* Top Right Action Buttons: Share, Favorite, Close */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center gap-1.5">
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-euro-950/80 text-slate-300 hover:text-white border border-euro-800 transition active:scale-95 shadow-md"
            title="Ürünü Paylaş"
            aria-label="Ürünü Paylaş"
          >
            <Share2 className="w-4 h-4" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleFavorite) onToggleFavorite(product.id);
            }}
            className={`p-2 rounded-full border transition active:scale-95 shadow-md ${
              isFavorite 
                ? 'bg-rose-500 text-white border-rose-400' 
                : 'bg-euro-950/80 text-slate-300 hover:text-white border-euro-800'
            }`}
            title={isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
            aria-label="Favorilere Ekle"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-euro-950/80 text-slate-300 hover:text-white border border-euro-800 transition active:scale-95 shadow-md"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product Image Section with Multi-Image Gallery */}
        <div className="w-full md:w-1/2 flex flex-col shrink-0 bg-euro-950">
          
          {/* Main Active Image Viewport */}
          <div className="relative aspect-[4/3] sm:aspect-square md:aspect-auto md:h-96 w-full overflow-hidden bg-euro-950">
            <img 
              src={images[activeIdx] || product.image} 
              alt={`${product.title} - Görsel ${activeIdx + 1}`} 
              className="w-full h-full object-cover transition-opacity duration-300"
            />

            {/* Left / Right Navigation Chevrons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-euro-950/80 hover:bg-euro-900 text-white border border-euro-700/60 shadow-lg active:scale-90 transition z-10"
                  aria-label="Önceki Görsel"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-euro-950/80 hover:bg-euro-900 text-white border border-euro-700/60 shadow-lg active:scale-90 transition z-10"
                  aria-label="Sonraki Görsel"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                {/* Counter Pill */}
                <div className="absolute top-3 left-3 bg-euro-950/85 text-slate-200 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border border-euro-700/70 backdrop-blur-md shadow-md z-10">
                  {activeIdx + 1} / {images.length}
                </div>
              </>
            )}

            {/* Bottom Condition Badges on Image */}
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
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

          {/* Interactive Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-1.5 p-2 bg-[#050b14] overflow-x-auto scrollbar-none border-t border-euro-800/80">
              {images.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition active:scale-95 ${
                    activeIdx === i 
                      ? 'border-amber-400 scale-105 shadow-md shadow-amber-400/20' 
                      : 'border-euro-800/80 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Görsel ${i + 1}`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-between overflow-y-auto">
          
          <div className="p-5 sm:p-7 space-y-4">
            
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-euro-400">
                {product.brand}
              </span>
              <h2 className="text-lg sm:text-2xl font-extrabold text-white font-display leading-snug">
                {product.title}
              </h2>
            </div>

            {/* Price Box */}
            <div className="p-3.5 rounded-xl bg-euro-900/70 border border-euro-800 space-y-2">
              <div className="flex items-center justify-between">
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
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Orijinal Avrupa
                </span>
              </div>

              {/* Cross-platform price comparison if listed on both */}
              {product.gardropsPrice && product.dolapPrice && product.gardropsPrice !== product.dolapPrice && (
                <div className="pt-2 border-t border-euro-800/60 flex items-center justify-between text-[11px] text-slate-300">
                  <span className="text-slate-400">Platform Fiyatları:</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-pink-300">Gardrops: {product.gardropsPrice.toLocaleString('tr-TR')} ₺</span>
                    <span className="text-slate-500">&bull;</span>
                    <span className="text-emerald-300">Dolap: {product.dolapPrice.toLocaleString('tr-TR')} ₺</span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>

            {/* Specifications list */}
            {product.specs && (
              <div className="space-y-1.5 pt-2 border-t border-euro-800/60">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Ürün Doğrulama Bilgileri
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

            {/* Platform Direct Buy Links */}
            {(product.gardropsUrl || product.dolapUrl) && (
              <div className="space-y-1.5 pt-2 border-t border-euro-800/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Platform Güvenceli Alışveriş Linkleri:
                </span>
                <div className={`grid ${product.gardropsUrl && product.dolapUrl ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
                  {product.gardropsUrl && (
                    <a 
                      href={product.gardropsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-pink-950/60 hover:bg-pink-900/70 text-pink-300 font-bold text-xs border border-pink-700/50 transition active:scale-95 shadow-sm"
                    >
                      <span>Gardrops'ta Aç</span>
                      {product.gardropsPrice && <span className="opacity-80 font-mono text-[10px]">({product.gardropsPrice.toLocaleString('tr-TR')} ₺)</span>}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {product.dolapUrl && (
                    <a 
                      href={product.dolapUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/70 text-emerald-300 font-bold text-xs border border-emerald-700/50 transition active:scale-95 shadow-sm"
                    >
                      <span>Dolap'ta Aç</span>
                      {product.dolapPrice && <span className="opacity-80 font-mono text-[10px]">({product.dolapPrice.toLocaleString('tr-TR')} ₺)</span>}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Trust badge */}
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/30 p-2 rounded-lg border border-emerald-800/30">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Avrupa faturası ve orijinallik kontrolünden geçmiştir.</span>
            </div>

          </div>

          {/* Sticky Buy Bar (Floating Action Bar) */}
          <div className="sticky bottom-0 z-30 bg-[#070e1b]/95 backdrop-blur-xl border-t border-euro-700/60 p-3 sm:p-5 pb-[max(env(safe-area-inset-bottom),12px)] sm:pb-5 space-y-2">
            {product.isCustomQuote ? (
              <button 
                onClick={() => { onClose(); onOpenWizard(); }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm shadow-xl active:scale-95 transition"
              >
                <Plane className="w-4 h-4" />
                <span>Sipariş Sihirbazını Aç</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button 
                  onClick={() => { onAddToCart(product); onClose(); }}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 py-3 px-3 rounded-xl bg-euro-600 hover:bg-euro-500 text-white font-bold text-xs sm:text-sm shadow-lg active:scale-95 transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Sepete Ekle</span>
                </button>
                <a 
                  href={whatsappUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 sm:gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg active:scale-95 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Sipariş</span>
                </a>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
