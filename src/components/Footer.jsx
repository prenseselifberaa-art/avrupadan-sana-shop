import { ExternalLink, ShieldCheck, Heart, Plane, MessageCircle } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../data/products';

export default function Footer() {
  return (
    <footer className="bg-euro-950 border-t border-euro-800/60 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="h-11 w-auto bg-white rounded-xl p-1 shadow-md border border-slate-300/40 flex items-center justify-center shrink-0">
                <img 
                  src="/logo.jpg" 
                  alt="Avrupadan Sana Shop" 
                  className="h-full w-auto object-contain rounded-lg"
                />
              </div>
              <span className="text-lg font-extrabold text-white font-display">
                Avrupadan<span className="text-euro-400">.Sana</span><span className="text-amber-400">.Shop</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              Almanya, Fransa ve İtalya'dan %100 orijinal koleksiyon figürleri, otantik vintage lüks çantalar, DM siparişleri ve kişiye özel Avrupa ithalat servisi.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>%100 Orijinallik & Avrupa Faturası Güvencesi</span>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Resmi Satış & İletişim
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Merhaba! Avrupadan.Sana.Shop üzerinden bilgi almak istiyorum.')}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 text-emerald-400 font-semibold transition flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/avrupadan.sana.shop" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                  <span>Instagram (@avrupadan.sana.shop)</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://dolap.com/profil/avrupadansana1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Dolap Profili (@avrupadansana1)</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.gardrops.com/avrupadansana1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                  <span>Gardrops Profili (@avrupadansana1)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Sourcing Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              İthalat Noktaları
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>🇩🇪 Almanya DM (Drogerie Markt)</li>
              <li>🇩🇪 Amazon.de & Rossmann</li>
              <li>🇫🇷 Fransa Eczane & Parfümeri</li>
              <li>🇮🇹 İtalya Vintage Butikleri</li>
              <li>🇬🇧 İngiltere Özel Koleksiyonları</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-euro-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Avrupadan.Sana.Shop. Tüm hakları saklıdır.</p>
          <p className="flex items-center gap-1">
            <span>Avrupa'dan Türkiye'ye Güvenle Taşınır</span>
            <Plane className="w-3.5 h-3.5 text-euro-400" />
          </p>
        </div>

      </div>
    </footer>
  );
}
