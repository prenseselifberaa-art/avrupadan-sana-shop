import React from 'react';
import { STORY_HIGHLIGHTS } from '../data/stories';

export default function StoryHighlights({ onSelectStory }) {
  return (
    <section className="w-full max-w-full overflow-hidden py-3 sm:py-4 border-b border-euro-800/40 bg-euro-950/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        
        {/* Horizontal Touch Scroll Container */}
        <div className="flex items-center gap-3.5 sm:gap-6 overflow-x-auto pb-1 scrollbar-none snap-x touch-pan-x w-full">
          {STORY_HIGHLIGHTS.map((story) => (
            <button
              key={story.id}
              onClick={() => onSelectStory(story)}
              className="flex flex-col items-center gap-1.5 shrink-0 snap-start group focus:outline-none transition active:scale-95 touch-manipulation"
            >
              {/* Outer Ring with Gradient */}
              <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-euro-500 via-amber-400 to-euro-600 group-hover:scale-105 transition-transform duration-300 shadow-md shadow-black/40">
                <div className="p-0.5 rounded-full bg-euro-950">
                  <div className="w-14 h-14 sm:w-17 sm:h-17 rounded-full overflow-hidden relative bg-euro-900 flex items-center justify-center">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                      loading="lazy"
                    />
                    {/* Badge Emoji */}
                    <span className="absolute bottom-0 right-0 text-[10px] sm:text-xs bg-euro-950/90 rounded-full px-1 py-0.2 border border-euro-700/60 shadow">
                      {story.badge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="text-center w-18 sm:w-22">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-200 block truncate group-hover:text-amber-400 transition">
                  {story.title}
                </span>
                <span className="text-[8px] sm:text-[9px] text-slate-400 block truncate">
                  {story.subtitle}
                </span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
