import React, { useState } from 'react';
import { X, Sparkles, Send, Plane, HelpCircle, Check, ArrowRight, MessageCircle, DollarSign, Calculator } from 'lucide-react';

const STORE_PRESETS = [
  { name: 'Almanya DM (Drogerie Markt)', domain: 'dm.de', icon: '🇩🇪' },
  { name: 'Almanya Rossmann', domain: 'rossmann.de', icon: '🇩🇪' },
  { name: 'Amazon Almanya (Amazon.de)', domain: 'amazon.de', icon: '📦' },
  { name: 'Sephora Avrupa', domain: 'sephora.fr / .de', icon: '💄' },
  { name: 'Zara / Mango / Massimo EU', domain: 'zara.com / eu', icon: '🧥' },
  { name: 'Lego / Popcultcha / Funko EU', domain: 'lego.com / funko', icon: '🎮' },
  { name: 'Diğer Avrupa Mağazası', domain: 'Özel Mağaza', icon: '🇪🇺' },
];

export default function CustomOrderWizard({ isOpen, onClose }) {
  const [productName, setProductName] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [selectedStore, setSelectedStore] = useState(STORE_PRESETS[0].name);
  const [estimatedEuro, setEstimatedEuro] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);

  if (!isOpen) return null;

  // Approximate Euro rate and estimation formula
  const euroRate = 38.5; // live estimation baseline
  const euroValue = parseFloat(estimatedEuro) || 0;
  const rawTRY = Math.round(euroValue * euroRate);
  // Service + transport estimate (approx 20-30% depending on tier)
  const serviceFeeTRY = euroValue > 0 ? Math.round(Math.max(350, rawTRY * 0.25)) : 0;
  const estimatedTotalTRY = rawTRY + serviceFeeTRY;

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const text = 
`🇪🇺 *AVRUPA'DAN ÖZEL SİPARİŞ TALEBİ* 🇪🇺
---------------------------------
📌 *Ürün:* ${productName || 'Belirtilmedi'}
🏬 *Mağaza/Ülke:* ${selectedStore}
🔗 *Link:* ${productUrl || 'Link yok, fotoğraf/isim ile iletildi'}
💶 *Tahmini Fiyat (€):* ${euroValue > 0 ? euroValue + ' € (~' + rawTRY + ' TL)' : 'Belirtilmedi'}
📝 *Not / Adet / Beden:* ${customerNote || 'Standart'}
---------------------------------
Avrupadan.Sana.Shop üzerinden bu ürünün getirilme maliyeti ve teslimat süresi hakkında teklif rica ediyorum.`;

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-euro-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl glass-card rounded-2xl border border-euro-600/50 shadow-2xl p-6 sm:p-8 pb-10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-euro-950/80 text-slate-400 hover:text-white border border-euro-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300">
            <Plane className="w-3.5 h-3.5" />
            <span>Kişisel İthalat & Alışveriş Servisi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Avrupa'dan Ne İstersen İste
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Almanya DM, Rossmann, Amazon.de veya dilediğiniz herhangi bir Avrupa mağazasındaki ürünün linkini ya da adını girin; sizin adınıza satın alıp getirelim!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSendWhatsApp} className="space-y-4">
          
          {/* Store Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              1. Tercih Edilen Mağaza / Ülke
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {STORE_PRESETS.map((s, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setSelectedStore(s.name)}
                  className={`text-left p-2.5 rounded-xl border text-xs font-medium transition flex items-center gap-2 ${
                    selectedStore === s.name 
                      ? 'bg-euro-600 text-white border-euro-400 shadow-md' 
                      : 'bg-euro-900/60 text-slate-300 border-euro-800 hover:border-euro-700'
                  }`}
                >
                  <span>{s.icon}</span>
                  <span className="truncate">{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Name & Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                2. İstediğiniz Ürünün Adı *
              </label>
              <input 
                type="text" 
                required
                placeholder="Örn: DM Balea Q10 Serum / Lego Figür / Parfüm"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full bg-euro-950/80 border border-euro-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-euro-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                3. Ürün Linki (Varsa)
              </label>
              <input 
                type="url" 
                placeholder="https://www.dm.de/... veya amazon.de/..."
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                className="w-full bg-euro-950/80 border border-euro-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-euro-500 transition"
              />
            </div>
          </div>

          {/* Price Calculation (Optional) */}
          <div className="bg-euro-900/50 p-4 rounded-xl border border-euro-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-amber-400" />
                Tahmini Euro (€) Fiyatı Girin (Canlı Hesaplayıcı)
              </label>
              <span className="text-[11px] text-slate-400">1 € ≈ {euroRate} ₺</span>
            </div>

            <div className="flex gap-3 items-center">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">€</span>
                <input 
                  type="number" 
                  min="0"
                  step="0.5"
                  placeholder="Örn: 25"
                  value={estimatedEuro}
                  onChange={(e) => setEstimatedEuro(e.target.value)}
                  className="w-full bg-euro-950 border border-euro-700 rounded-xl pl-8 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              {euroValue > 0 && (
                <div className="bg-euro-950/80 px-4 py-2 rounded-xl border border-amber-500/30 text-right">
                  <span className="text-[10px] text-slate-400 block">Tahmini Ana Fiyat</span>
                  <span className="text-sm font-bold text-amber-300">~{rawTRY.toLocaleString('tr-TR')} ₺</span>
                </div>
              )}
            </div>

            {euroValue > 0 && (
              <p className="text-[11px] text-slate-400">
                * Kesin getirme bedeli, ürünün ağırlığına ve gümrük durumuna göre WhatsApp üzerinden netleştirilir.
              </p>
            )}
          </div>

          {/* Note / Details */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              4. Ek Notlar (Beden, Renk, Adet veya Özel İstek)
            </label>
            <textarea 
              rows="2"
              placeholder="Örn: 2 adet istiyorum, son kullanma tarihi yeni olsun, orijinal kutusuyla gelsin."
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              className="w-full bg-euro-950/80 border border-euro-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-euro-500 transition"
            ></textarea>
          </div>

          {/* Submit CTAs */}
          <div className="pt-2 space-y-2">
            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-950/50 transition transform active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp ile Anında Teklif Al & Sipariş Başlat</span>
            </button>
            <p className="text-center text-[11px] text-slate-400">
              Formu gönderdiğinizde bilgileriniz doğrudan WhatsApp sipariş hattımıza hazır metin olarak aktarılır.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}
