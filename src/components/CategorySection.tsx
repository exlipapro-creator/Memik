import React from 'react';
import { CategoryItem, CategoryId } from '../types';
import { CATEGORIES_DATA } from '../data/experiencesData';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategorySectionProps {
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  lang: 'en' | 'sw';
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory,
  onSelectCategory,
  lang,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" id="categories-section">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {lang === 'en' ? 'Explore Tanzanian Arenas & Worlds' : 'Gundua Nyanja na Maeneo ya Tanzania'}
          </h2>
          <p className="mt-1 text-sm text-gray-500 font-normal">
            {lang === 'en'
              ? 'NBC League matchdays, Serengeti wildlife safari, Bongo Flava festivals, and Swahili culture'
              : 'Mechi za Ligi Kuu ya NBC, utalii wa Serengeti, matamasha ya Bongo Flava na urithi wa Waswahili'}
          </p>
        </div>

        {selectedCategory !== 'all' && (
          <button
            onClick={() => onSelectCategory('all')}
            className="mt-3 sm:mt-0 text-xs font-bold text-red-600 hover:text-red-700 underline cursor-pointer flex items-center gap-1"
          >
            <span>{lang === 'en' ? 'View all categories' : 'Tazama zote'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Grid on Desktop & Tablet / Smooth Touch Carousel on Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {CATEGORIES_DATA.map((cat, idx) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <div
              key={cat.id}
              onClick={() => {
                onSelectCategory(isSelected ? 'all' : cat.slug);
                const el = document.getElementById('upcoming-events');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`group relative h-48 sm:h-56 md:h-60 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 ${
                isSelected
                  ? 'border-red-600 ring-4 ring-red-100 scale-[1.02]'
                  : 'border-transparent'
              }`}
            >
              {/* Background Image with Zoom */}
              <img
                src={cat.img}
                alt={cat.title[lang]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Gradient overlay from bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Red Accent indicator if selected */}
              {isSelected && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  <span>{lang === 'en' ? 'Selected' : 'Umechagua'}</span>
                </div>
              )}

              {/* Text content inside the card */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <span className="text-[11px] font-semibold text-red-400 uppercase tracking-wider block mb-1">
                  {cat.count} {lang === 'en' ? 'events & activities' : 'mechi na matukio'}
                </span>
                <div className="font-bold text-white text-xl sm:text-2xl leading-tight">
                  <span className="block">{cat.labels[0]}</span>
                  <span className="block">{cat.labels[1]}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
