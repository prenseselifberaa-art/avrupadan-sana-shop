import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { convertFromTRY, formatCurrency } from '../utils/currency';
import { WHATSAPP_NUMBER } from '../data/products';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  currency,
  rates
}) {
  if (!isOpen) return null;

  const totalTRY = cart.reduce((acc, item) => acc + (item.priceTRY * item.quantity), 0);
  const totalConverted = convertFromTRY(totalTRY, currency, rates);
  const totalFormatted = formatCurrency(totalConverted, currency);

  const handleCheckoutWhatsApp = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    const itemsSummary = cart.map(item => 
      `• ${item.title} (x${item.quantity}) - ${(item.priceTRY * item.quantity).toLocaleString('tr-TR')} TL`
    ).join('\n');

    const message = 
`🛍️ *AVRUPADAN.SANA.SHOP SİPARİŞİ* 🛍️
---------------------------------
${itemsSummary}
---------------------------------
💰 *TOPLAM:* ${totalTRY.toLocaleString('tr-TR')} ₺ (~€${convertFromTRY(totalTRY, 'EUR', rates)} / ~$${convertFromTRY(totalTRY, 'USD', rates)})
---------------------------------
Merhaba! Sepetimdeki bu ürünleri satın almak istiyorum. Ödeme ve kargo detaylarını paylaşabilir misiniz?`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-euro-950/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div 
          className="w-screen max-w-md glass-panel border-l border-euro-700/60 shadow-2xl flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-euro-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-euro-400" />
              <h2 className="text-base sm:text-lg font-bold text-white font-display">
                Alışveriş Sepeti ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-euro-800/60 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                <div className="w-16 h-16 rounded-full bg-euro-900 flex items-center justify-center border border-euro-800">
                  <ShoppingBag className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-base font-bold text-slate-200">Sepetiniz Boş</h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  Avrupa ithalatı kataloğumuzdaki ürünlerden dilediğinizi sepetinize ekleyebilirsiniz.
                </p>
                <button 
                  onClick={onClose}
                  className="mt-2 text-xs font-semibold text-euro-400 hover:text-euro-300 underline"
                >
                  Alışverişe Devam Et
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemConverted = convertFromTRY(item.priceTRY * item.quantity, currency, rates);
                return (
                  <div 
                    key={item.id} 
                    className="bg-euro-900/60 p-3 sm:p-3.5 rounded-xl border border-euro-800/80 flex gap-3 items-center"
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover bg-euro-950 shrink-0 border border-euro-800"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 block">{item.brand}</span>
                      <span className="text-xs font-extrabold text-amber-400 mt-0.5 block font-mono">
                        {formatCurrency(itemConverted, currency)}
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex flex-col items-end gap-1.5">
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-500 hover:text-rose-400 transition p-1"
                        title="Kaldır"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex items-center bg-euro-950 border border-euro-700 rounded-lg">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-euro-800/80 bg-euro-950/80 space-y-3.5 pb-[max(env(safe-area-inset-bottom),20px)]">
              
              {/* Summary */}
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Ara Toplam:</span>
                  <span className="font-semibold text-white font-mono">
                    {totalFormatted}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Kargo & Sigorta:</span>
                  <span className="text-emerald-400 font-semibold">Ücretsiz Sigortalı Teslimat</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-euro-800 text-sm font-bold text-white">
                  <span>Genel Toplam:</span>
                  <div className="text-right">
                    <span className="text-amber-400 font-display text-lg block">
                      {totalFormatted}
                    </span>
                    {currency !== 'TRY' && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        (~ {totalTRY.toLocaleString('tr-TR')} ₺)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="space-y-2">
                <button 
                  onClick={handleCheckoutWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-xl active:scale-95 transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp ile Sipariş Ver</span>
                </button>
              </div>

              {/* Dolap / Gardrops note */}
              <div className="bg-euro-900/60 p-2.5 rounded-lg border border-euro-800 text-[10px] text-slate-400 space-y-0.5">
                <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-euro-400 shrink-0" />
                  <span>Alıcı Koruması:</span>
                </div>
                <p>
                  Taksitle veya platform korumasıyla ödeme yapmak isterseniz Dolap ve Gardrops resmi ilanlarımızdan da sipariş verebilirsiniz.
                </p>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
