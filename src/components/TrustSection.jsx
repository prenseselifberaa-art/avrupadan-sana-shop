import React from 'react';
import { Plane, ShieldCheck, PackageCheck, Sparkles, CheckCircle, ExternalLink } from 'lucide-react';
import { TRUST_FEATURES } from '../data/products';

export default function TrustSection() {
  const getIcon = (name) => {
    switch (name) {
      case 'Plane': return <Plane className="w-6 h-6 text-euro-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'PackageCheck': return <PackageCheck className="w-6 h-6 text-amber-400" />;
      default: return <Sparkles className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <section id="guvence" className="py-16 lg:py-24 border-b border-euro-800/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-euro-400 bg-euro-900/80 px-3.5 py-1.5 rounded-full border border-euro-700/60">
            Neden Avrupadan.Sana.Shop?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Güvenilir, Orijinal & Şeffaf İthalat
          </h2>
          <p className="text-sm text-slate-300">
            Avrupa'dan ürün temin etmenin en güvenilir yolu. Sahte ürün endişesi yaşamadan, doğrudan orijinal faturalı ürünler.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_FEATURES.map((f, idx) => (
            <div 
              key={idx} 
              className="glass-card p-6 rounded-2xl border border-euro-800/60 space-y-3 hover:border-euro-600/40 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-euro-900/90 flex items-center justify-center border border-euro-700/60">
                {getIcon(f.icon)}
              </div>
              <h3 className="text-base font-bold text-white font-display">
                {f.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Platforms Showcase Banner */}
        <div className="mt-12 glass-panel rounded-2xl p-6 sm:p-8 border border-euro-700/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg font-bold text-white font-display">
              Resmi Satış Kanallarımız & Alıcı Koruma Güvencesi
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Alışverişinizi diler sitemiz üzerinden WhatsApp ile komisyonsuz, dilerseniz Türkiye'nin lider ikinci el ve butik platformları Dolap ve Gardrops üzerinden taksitle yapabilirsiniz.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a 
              href="https://dolap.com/profil/avrupadansana1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 font-bold text-xs border border-emerald-600/40 transition shadow-md"
            >
              <span>Dolap: @avrupadansana1</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a 
              href="https://www.gardrops.com/avrupadansana1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-950/80 hover:bg-pink-900/90 text-pink-300 font-bold text-xs border border-pink-600/40 transition shadow-md"
            >
              <span>Gardrops: @avrupadansana1</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a 
              href="https://www.instagram.com/avrupadan.sana.shop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-950/80 hover:bg-purple-900/90 text-purple-300 font-bold text-xs border border-purple-600/40 transition shadow-md"
            >
              <span>Instagram: @avrupadan.sana.shop</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
