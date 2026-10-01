import React from 'react';
import { ArrowUpDown, Grid, LayoutGrid, Heart } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function FilterSortBar({ 
  selectedCategory, 
  onSelectCategory, 
  sortBy, 
  setSortBy, 
  itemCount,
  mobileCols,
  setMobileCols,
  favoritesCount = 0
}) {
  return (
    <div className="sticky top-15 sm:top-[74px] z-30 w-full max-w-full overflow-hidden bg-[#060e1b]/95 backdrop-blur-xl border-y border-euro-800/70 py-2 sm:py-2.5 px-3 sm:px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col gap-2 w-full">
        
        {/* Row 1: Horizontal Category Slider (Smooth Touch Scrolling, strictly clipped) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x touch-pan-x w-full">
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

          {/* Favorilerim Special Filter Button */}
          <button
            onClick={() => onSelectCategory('favorites')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition shrink-0 snap-start flex items-center gap-1.5 active:scale-95 touch-manipulation ${
              selectedCategory === 'favorites'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-950/60 border border-rose-400'
                : 'bg-euro-900/60 hover:bg-euro-800/80 text-rose-300 hover:text-white border border-rose-900/40'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${selectedCategory === 'favorites' ? 'fill-current' : ''}`} />
            <span>Favorilerim</span>
            {favoritesCount > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                selectedCategory === 'favorites' ? 'bg-white text-rose-600' : 'bg-rose-500/30 text-rose-300'
              }`}>
                {favoritesCount}
              </span>
            )}
          </button>
        </div>

        {/* Row 2: Product Counter, Sort Filter & Mobile Grid Toggle (Fits in any width, no overflow) */}
        <div className="flex items-center justify-between text-xs text-slate-300 pt-1.5 border-t border-euro-850/60 gap-1.5 w-full">
          
          {/* Counter Badge */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-bold text-white text-xs whitespace-nowrap">
              {itemCount} <span className="font-normal text-slate-400 hidden xs:inline">Ürün</span>
            </span>
          </div>

          {/* Right Tools: Sort Selector & Mobile Col Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Sort Selector Dropdown */}
            <div className="flex items-center gap-1 bg-[#091528] rounded-lg px-2 py-1 border border-euro-700/60 transition shadow-inner">
              <ArrowUpDown className="w-3 h-3 text-euro-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-slate-200 text-[11px] sm:text-xs font-semibold focus:outline-none cursor-pointer pr-0.5"
                aria-label="Sıralama Seçimi"
              >
                <option value="featured" className="bg-[#0b192c] text-white">Öne Çıkanlar</option>
                <option value="price-asc" className="bg-[#0b192c] text-white">Fiyat Artan</option>
                <option value="price-desc" className="bg-[#0b192c] text-white">Fiyat Azalan</option>
                <option value="rare" className="bg-[#0b192c] text-white">Nadir Parçalar</option>
              </select>
            </div>

            {/* Mobile View Toggle: 1-Col vs 2-Col */}
            <div className="sm:hidden flex items-center bg-[#091528] rounded-lg p-0.5 border border-euro-700/60 shadow-inner">
              <button
                onClick={() => setMobileCols(1)}
                className={`p-1 rounded transition ${
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
                className={`p-1 rounded transition ${
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
