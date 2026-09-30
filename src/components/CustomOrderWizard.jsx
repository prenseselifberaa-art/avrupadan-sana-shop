import React, { useState } from 'react';
import { X, Sparkles, Send, Plane, HelpCircle, Check, ArrowRight, MessageCircle, DollarSign, Calculator, TrendingUp } from 'lucide-react';

const STORE_PRESETS = [
  { name: 'Almanya DM', domain: 'dm.de', icon: '🇩🇪' },
  { name: 'Almanya Rossmann', domain: 'rossmann.de', icon: '🇩🇪' },
  { name: 'Amazon.de', domain: 'amazon.de', icon: '📦' },
  { name: 'Sephora EU', domain: 'sephora.fr / .de', icon: '💄' },
  { name: 'Zara / Massimo EU', domain: 'zara.com/eu', icon: '🧥' },
  { name: 'Lego / Funko EU', domain: 'lego/funko.com', icon: '🎮' },
  { name: 'Diğer Mağaza', domain: 'Özel İthalat', icon: '🇪🇺' },
];

export default function CustomOrderWizard({ isOpen, onClose, rates }) {
  const [productName, setProductName] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [selectedStore, setSelectedStore] = useState(STORE_PRESETS[0].name);
  const [inputCurrency, setInputCurrency] = useState('EUR');
  const [priceInput, setPriceInput] = useState('');
  const [customerNote, setCustomerNote] = useState('');

  if (!isOpen) return null;

  const eurRate = rates?.EUR || 55.60;
  const usdRate = rates?.USD || 49.00;
  const activeRate = inputCurrency === 'EUR' ? eurRate : usdRate;

  const rawValue = parseFloat(priceInput) || 0;
  const rawTRY = Math.round(rawValue * activeRate);
  // Estimate service fee (minimum 350 TL or 20%)
  const serviceFeeTRY = rawValue > 0 ? Math.round(Math.max(350, rawTRY * 0.20)) : 0;
  const estimatedTotalTRY = rawTRY + serviceFeeTRY;

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const currencySymbol = inputCurrency === 'EUR' ? '€' : '$';
    const text = 
`🇪🇺 *AVRUPA'DAN ÖZEL SİPARİŞ TALEBİ* 🇪🇺
---------------------------------
📌 *Ürün:* ${productName || 'Belirtilmedi'}
🏬 *Mağaza / Ülke:* ${selectedStore}
🔗 *Link:* ${productUrl || 'Link yok, ürün adı/fotoğrafı ile iletildi'}
💶 *Tahmini Fiyat:* ${rawValue > 0 ? `${rawValue} ${currencySymbol} (~${rawTRY.toLocaleString('tr-TR')} TL)` : 'Belirtilmedi'}
📈 *Baz Kur:* 1 ${currencySymbol} = ${activeRate.toFixed(2)} ₺ (Canlı Kur)
📝 *Not / Adet / Beden:* ${customerNote || 'Standart'}
---------------------------------
Avrupadan.Sana.Shop üzerinden bu ürünün getirilme maliyeti ve teslimat süresi hakkında teklif rica ediyorum.`;

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-euro-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full sm:max-w-2xl glass-card rounded-t-3xl sm:rounded-2xl border-t sm:border border-euro-600/50 shadow-2xl p-5 sm:p-8 pb-10 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Swipe Handle */}
        <div className="sm:hidden w-12 h-1.5 bg-slate-600 rounded-full mx-auto my-1.5 shrink-0"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-euro-950/80 text-slate-400 hover:text-white border border-euro-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5 mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300">
            <Plane className="w-3.5 h-3.5" />
            <span>Kişisel İthalat & Sipariş Servisi</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white font-display">
            Avrupa'dan Ne İstersen İste
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Almanya DM, Rossmann, Amazon.de veya dilediğiniz herhangi bir Avrupa mağazasındaki ürünün linkini ya da adını girin; sizin adınıza alıp getirelim!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSendWhatsApp} className="space-y-4">
          
          {/* Store Selection */}
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
              1. Tercih Edilen Mağaza / Ülke
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {STORE_PRESETS.map((s, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setSelectedStore(s.name)}
                  className={`text-left p-2 rounded-xl border text-xs font-semibold transition flex items-center gap-1.5 ${
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                2. İstediğiniz Ürünün Adı *
              </label>
              <input 
                type="text" 
                required
                placeholder="Örn: DM Balea Krem / Vitamin / Parfüm"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full bg-euro-950/80 border border-euro-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-euro-500 transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                3. Ürün Linki (Varsa)
              </label>
              <input 
                type="url" 
                placeholder="https://www.dm.de/... veya amazon.de/..."
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                className="w-full bg-euro-950/80 border border-euro-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-euro-500 transition"
              />
            </div>
          </div>

          {/* Price Calculation (Live Currency) */}
          <div className="bg-euro-900/50 p-4 rounded-xl border border-euro-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-amber-400" />
                Canlı Kur Fiyat Hesaplayıcı
              </label>
              
              {/* Currency Toggle inside calculator */}
              <div className="flex bg-euro-950 rounded-lg p-0.5 border border-euro-700 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setInputCurrency('EUR')}
                  className={`px-2 py-0.5 rounded transition ${inputCurrency === 'EUR' ? 'bg-euro-600 text-white' : 'text-slate-400'}`}
                >
                  € EUR
                </button>
                <button
                  type="button"
                  onClick={() => setInputCurrency('USD')}
                  className={`px-2 py-0.5 rounded transition ${inputCurrency === 'USD' ? 'bg-euro-600 text-white' : 'text-slate-400'}`}
                >
                  $ USD
                </button>
              </div>
            </div>

            <div className="flex gap-2.5 items-center">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">
                  {inputCurrency === 'EUR' ? '€' : '$'}
                </span>
                <input 
                  type="number" 
                  min="0"
                  step="0.5"
                  placeholder="Mağazadaki fiyatı girin (Örn: 20)"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  className="w-full bg-euro-950 border border-euro-700 rounded-xl pl-8 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              {rawValue > 0 && (
                <div className="bg-euro-950/90 px-3.5 py-1.5 rounded-xl border border-amber-500/40 text-right">
                  <span className="text-[9px] text-slate-400 block font-medium">Anlık Kur Çevirisi</span>
                  <span className="text-xs sm:text-sm font-extrabold text-amber-300 font-mono">
                    ~{rawTRY.toLocaleString('tr-TR')} ₺
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Canlı Piyasa Kuru: 1 {inputCurrency === 'EUR' ? '€' : '$'} = {activeRate.toFixed(2)} ₺</span>
              <span className="text-emerald-400 font-semibold">Şeffaf Maliyet</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
              4. Ek Notlar (Beden, Renk, Adet veya Özel İstek)
            </label>
            <textarea 
              rows="2"
              placeholder="Örn: 2 adet istiyorum, jelatini açılmamış sıfır ürün olsun."
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              className="w-full bg-euro-950/80 border border-euro-700/80 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-euro-500 transition"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="pt-2 space-y-2">
            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm shadow-xl active:scale-95 transition"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>WhatsApp ile Anında Teklif Al & Sipariş Başlat</span>
            </button>
            <p className="text-center text-[10px] text-slate-400">
              Formu onayladığınızda talebiniz doğrudan WhatsApp sipariş hattımıza hazır metin olarak aktarılır.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}
