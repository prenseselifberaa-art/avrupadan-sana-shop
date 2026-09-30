import React from 'react';
import { Search, X, Sparkles } from 'lucide-react';

const SUGGESTIONS = [
  'DM Balea',
  'Coach Vintage',
  'Funko Pop',
  'Wednesday',
  'Revolution',
  'Blind Box'
];

export default function SearchBar({ searchQuery, setSearchQuery, inputRef }) {
  return (
    <div className="w-full space-y-2">
      {/* Search Input Box */}
      <div className="relative w-full">
        <Search className="w-4 h-4 text-euro-400 absolute left-3.5 top-3.5 pointer-events-none" />
        <input 
          id="catalog-search-input"
          ref={inputRef}
          type="text"
          placeholder="Avrupa koleksiyonu veya marka ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#0a1527] border border-euro-700/60 hover:border-euro-500/80 focus:border-euro-400 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-euro-400/40 shadow-inner transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-2.5 p-1 rounded-md text-slate-400 hover:text-white hover:bg-euro-800 transition"
            aria-label="Aramayı Temizle"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick Suggestion Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
        <span className="text-slate-400 font-semibold shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          Popüler:
        </span>
        {SUGGESTIONS.map((tag, idx) => {
          const isActive = searchQuery === tag;
          return (
            <button
              key={idx}
              onClick={() => setSearchQuery(isActive ? '' : tag)}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold shrink-0 transition active:scale-95 ${
                isActive
                  ? 'bg-amber-400 text-euro-950 font-bold shadow-sm'
                  : 'bg-euro-900/60 text-slate-300 hover:text-white hover:bg-euro-800 border border-euro-800'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
