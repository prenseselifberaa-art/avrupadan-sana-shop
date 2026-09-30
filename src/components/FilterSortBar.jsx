import React from 'react';
import { ArrowUpDown, Grid, LayoutGrid, Check } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function FilterSortBar({ 
  selectedCategory, 
  onSelectCategory, 
  sortBy, 
  setSortBy, 
  itemCount,
  mobileCols,
  setMobileCols
}) {
  return (
    <div className="sticky top-16 sm:top-[76px] z-30 bg-[#070e1b]/95 backdrop-blur-xl border-y border-euro-800/70 py-2.5 px-3 sm:px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col gap-2.5">
        
        {/* Row 1: Horizontal Category Slider (Smooth Touch Scrolling) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x touch-pan-x">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition shrink-0 snap-start flex items-center gap-1.5 active:scale-95 touch-manipulation ${
                  isActive 
                    ? 'bg-gradient-to-r from-euro-600 to-euro-500 text-white shadow-md shadow-euro-950/60 border border-euro-400/60' 
                    : 'bg-euro-900/60 hover:bg-euro-800/80 text-slate-300 hover:text-white border border-euro-800/70'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Row 2: Product Counter, Sort Filter & Mobile Grid Toggle */}
        <div className="flex items-center justify-between text-xs text-slate-300 pt-1.5 border-t border-euro-850/60">
          
          {/* Counter Badge */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-bold text-white text-xs">
              {itemCount} <span className="font-normal text-slate-400">Avrupa Ürünü</span>
            </span>
          </div>

          {/* Right Tools: Sort Selector & Mobile Col Switcher */}
          <div className="flex items-center gap-2">
            
            {/* Sort Selector Dropdown */}
            <div className="flex items-center gap-1.5 bg-[#0a1527] rounded-xl px-2.5 py-1 border border-euro-700/60 hover:border-euro-500/60 transition shadow-inner">
              <ArrowUpDown className="w-3.5 h-3.5 text-euro-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-slate-200 text-xs font-semibold focus:outline-none cursor-pointer pr-1"
                aria-label="Sıralama Seçimi"
              >
                <option value="featured" className="bg-[#0b192c] text-white">Öne Çıkanlar</option>
                <option value="price-asc" className="bg-[#0b192c] text-white">Fiyat: Düşükten Yükseğe</option>
                <option value="price-desc" className="bg-[#0b192c] text-white">Fiyat: Yüksekten Düşüğe</option>
                <option value="rare" className="bg-[#0b192c] text-white">Nadir Koleksiyon</option>
              </select>
            </div>

            {/* Mobile View Toggle: 1-Col vs 2-Col */}
            <div className="sm:hidden flex items-center bg-[#0a1527] rounded-xl p-0.5 border border-euro-700/60 shadow-inner">
              <button
                onClick={() => setMobileCols(1)}
                className={`p-1.5 rounded-lg transition ${
                  mobileCols === 1 
                    ? 'bg-euro-600 text-white shadow' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Büyük Tekli Görünüm"
                aria-label="Tekli Görünüm"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setMobileCols(2)}
                className={`p-1.5 rounded-lg transition ${
                  mobileCols === 2 
                    ? 'bg-euro-600 text-white shadow' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="İkili Izgara Görünümü"
                aria-label="İkili Görünüm"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
