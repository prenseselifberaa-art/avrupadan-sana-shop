import React, { useEffect, useState } from 'react';
import { X, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';

export default function StoryModal({ story, onClose, onAction }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!story) {
      setActive(false);
      return;
    }
    setActive(false);
    const t1 = setTimeout(() => setActive(true), 50);
    const t2 = setTimeout(() => {
      onClose();
    }, 8500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [story?.id]);

  if (!story) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Story Container (Phone Dimensions) */}
      <div 
        className="relative w-full sm:max-w-sm h-full sm:h-[82vh] max-h-[750px] bg-euro-950 sm:rounded-3xl border sm:border-euro-700/60 overflow-hidden shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Image / Blur */}
        <div className="absolute inset-0 -z-10">
          <img 
            src={story.image} 
            alt={story.title} 
            className="w-full h-full object-cover filter brightness-[0.35] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-euro-950 via-euro-950/60 to-black/80"></div>
        </div>

        {/* Top Header with Progress Bar & Close */}
        <div className="p-4 pt-6 space-y-3">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-amber-400 rounded-full transition-all duration-[8000ms] ease-linear ${active ? 'w-full' : 'w-0'}`}
            ></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img 
                src="/logo.jpg" 
                alt="Logo" 
                className="w-8 h-8 rounded-full border border-euro-500 p-0.5 object-cover"
              />
              <div>
                <span className="text-xs font-extrabold text-white block">
                  avrupadan.sana.shop
                </span>
                <span className="text-[10px] text-amber-300 font-medium">
                  {story.tag}
                </span>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-1.5 rounded-full bg-black/40 text-white/80 hover:text-white border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Visual & Story Content */}
        <div className="p-6 space-y-4">
          <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl bg-euro-900">
            <img 
              src={story.image} 
              alt={story.title} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-white font-display">
              {story.storyTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line max-w-xs mx-auto">
              {story.storyText}
            </p>
          </div>
        </div>

        {/* Bottom CTA Action Button */}
        <div className="p-6 pt-0 space-y-3 pb-[max(env(safe-area-inset-bottom),16px)] sm:pb-6">
          <button 
            onClick={() => { onClose(); onAction(story.action); }}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-euro-600 via-euro-500 to-amber-500 text-white font-extrabold text-sm shadow-xl active:scale-95 transition"
          >
            <span>{story.ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-center text-[10px] text-slate-400">
            Avrupadan Sana Shop • Doğrudan Avrupa İthalatı
          </p>
        </div>

      </div>
    </div>
  );
}
