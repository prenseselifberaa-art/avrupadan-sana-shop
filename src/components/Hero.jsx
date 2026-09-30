import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Plane, CheckCircle2, ShoppingCart, MessageCircle } from 'lucide-react';

export default function Hero({ onOpenWizard, scrollToCatalog }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-euro-800/30">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-euro-600/10 blur-[130px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-euro-900/90 border border-euro-600/40 text-euro-300 shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-amber-400"></span>
              <span>Resmi Instagram: @avrupadan.sana.shop</span>
              <span className="text-euro-500">•</span>
              <span className="text-slate-300">Doğrudan Avrupa İthalatı</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-display">
              Avrupa'nın Seçkin Ürünleri <br />
              <span className="bg-gradient-to-r from-blue-400 via-euro-400 to-amber-300 bg-clip-text text-transparent">
                Doğrudan Kapınızda.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Almanya, Fransa ve İtalya'dan bizzat temin edilen <span className="text-white font-medium">nadir koleksiyon figürleri</span>, <span className="text-white font-medium">otantik vintage lüks çantalar</span> ve <span className="text-white font-medium">DM Drogerie kişisel siparişleri</span>. %100 Orijinal, faturalı ve güvenli ödeme seçenekleriyle.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button 
                onClick={scrollToCatalog}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-euro-600 to-euro-700 hover:from-euro-500 hover:to-euro-600 text-white font-bold px-7 py-3.5 rounded-xl shadow-xl shadow-euro-950/80 transition transform active:scale-95 group"
              >
                <ShoppingCart className="w-5 h-5 text-euro-200" />
                <span>Hazır Kataloğu İncele</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>

              <button 
                onClick={onOpenWizard}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-slate-900/90 hover:bg-slate-800 text-amber-300 font-semibold px-6 py-3.5 rounded-xl border border-amber-500/30 transition shadow-lg group"
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Avrupa'dan Özel İstek Ver</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-400 border-t border-euro-800/40">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>%100 Orijinal Faturalı</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dolap & Gardrops Güvenceli</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hızlı & Korunaklı Kargo</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md glass-card rounded-2xl p-6 border border-euro-700/50 shadow-2xl">
              
              {/* Highlight Tag */}
              <div className="flex items-center justify-between pb-4 border-b border-euro-800/60">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-euro-500"></span>
                  <span className="text-xs font-bold text-euro-300 uppercase tracking-wider">
                    Öne Çıkan Avrupa İthalatı
                  </span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Nadir Edisyon
                </span>
              </div>

              {/* Showcase Product Preview */}
              <div className="mt-4 relative aspect-[4/3] rounded-xl overflow-hidden bg-euro-950/70 border border-euro-700/30">
                <img 
                  src="https://images.gardrops.com/uploads/15344839/user_items/69534053-s1--2TKkrceQ1SvdExooj5nbg.jpg" 
                  alt="One Piece Funko Pop Koleksiyon" 
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                />
                <div className="absolute top-2.5 left-2.5 bg-euro-900/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-white border border-euro-700/60">
                  Funko Pop & Supernatural
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Koleksiyon & Figür</span>
                  <span className="text-xs font-bold text-emerald-400">Stokta Var</span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug">
                  One Piece & Supernatural Orijinal Funko Pop Seti
                </h3>
                <div className="flex items-baseline justify-between pt-1">
                  <div className="text-2xl font-black text-amber-400 font-display">
                    9.700 ₺ <span className="text-xs font-normal text-slate-400">/ ~255 €</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    Ücretsiz Kargo
                  </span>
                </div>
              </div>

              {/* Verified Platforms footer */}
              <div className="mt-4 pt-3 border-t border-euro-800/60 flex items-center justify-between text-xs text-slate-400">
                <span>Resmi İlan Platformları:</span>
                <div className="flex gap-2">
                  <span className="font-bold text-emerald-400">Dolap</span>
                  <span>•</span>
                  <span className="font-bold text-pink-400">Gardrops</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
