import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/products';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="sss" className="py-16 lg:py-24 border-b border-euro-800/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-euro-400 bg-euro-900/80 px-3.5 py-1.5 rounded-full border border-euro-700/60">
            Merak Edilenler
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-sm text-slate-300">
            Avrupa ithalatı, sipariş süreci ve güvenli ödeme ile ilgili tüm detaylar.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className="glass-card rounded-2xl border border-euro-800/60 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-white font-bold text-sm sm:text-base hover:text-euro-400 transition"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-euro-900 border border-euro-700/60 text-euro-400 text-xs flex items-center justify-center shrink-0">
                      ?
                    </span>
                    {item.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-euro-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-euro-800/40 pt-3 animate-in fade-in duration-200">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact WhatsApp fallback */}
        <div className="mt-8 text-center bg-euro-900/40 p-5 rounded-2xl border border-euro-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <h4 className="text-sm font-bold text-white">Başka bir sorunuz veya özel siparişiniz mi var?</h4>
            <p className="text-xs text-slate-400">Instagram veya WhatsApp üzerinden doğrudan danışmanımıza ulaşabilirsiniz.</p>
          </div>
          <a 
            href="https://wa.me/?text=Merhaba%2C%20Avrupadan.Sana.Shop%20hakk%C4%B1nda%20bir%20sorum%20var."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Destek Hattı</span>
          </a>
        </div>

      </div>
    </section>
  );
}
