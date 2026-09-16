import React from 'react';
import { SearchFilters, CategoryId, ExperienceItem } from '../types';
import { CITIES_LIST } from '../data/experiencesData';
import { X, Search, ArrowRight } from 'lucide-react';
import { formatTZS } from '../utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onSelectExperience: (item: ExperienceItem) => void;
  matchingItems: ExperienceItem[];
  lang: 'en' | 'sw';
  currency?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onSelectExperience,
  matchingItems,
  lang,
  currency = 'TZS',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white animate-fadeIn overflow-y-auto">
      {/* Top Search Input Bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 p-4 flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-2.5">
          <Search className="w-5 h-5 text-red-500" />
          <input
            type="text"
            autoFocus
            value={filters.query}
            onChange={(e) =>
              onFilterChange({ ...filters, query: e.target.value })
            }
            placeholder={
              lang === 'en'
                ? 'Search Simba, Yanga, NBC League, Zanzibar, Serengeti...'
                : 'Tafuta Simba, Yanga, Ligi Kuu ya NBC, Zanzibar, Serengeti...'
            }
            className="w-full bg-transparent border-none text-sm text-gray-800 focus:outline-none placeholder-gray-400 font-medium"
          />
          {filters.query && (
            <button
              onClick={() => onFilterChange({ ...filters, query: '' })}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-900 rounded-xl cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Filter Row */}
      <div className="p-4 border-b border-gray-100 space-y-3">
        {/* City Pills */}
        <div>
          <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1.5">
            {lang === 'en' ? 'Quick City / Stadium' : 'Miji na Viwanja'}
          </span>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {CITIES_LIST.map((c) => (
              <button
                key={c}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    city: c === 'All locations' || c === 'Miji Yote' ? '' : c,
                  })
                }
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  ((c === 'All locations' || c === 'Miji Yote') && !filters.city) ||
                  filters.city === c
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {c === 'All locations' && lang === 'sw' ? 'Miji Yote' : c}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div>
          <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1.5">
            {lang === 'en' ? 'Category' : 'Aina ya Shughuli'}
          </span>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all' as CategoryId, label: lang === 'en' ? 'All' : 'Yote' },
              { id: 'sports' as CategoryId, label: lang === 'en' ? 'NBC League & Matchdays' : 'Mechi za NBC & Vikombe' },
              { id: 'travel' as CategoryId, label: lang === 'en' ? 'Serengeti & Wildlife Safaris' : 'Serengeti & Safari za Wanyama' },
              { id: 'art' as CategoryId, label: lang === 'en' ? 'Zanzibar & Coast Culture' : 'Zanzibar & Utamaduni wa Pwani' },
              { id: 'learning' as CategoryId, label: lang === 'en' ? 'Swahili Heritage & Music' : 'Urithi wa Kiswahili & Muziki' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => onFilterChange({ ...filters, category: cat.id })}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  filters.category === cat.id
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="flex-1 p-4 max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between mb-3 text-xs font-bold text-gray-500">
          <span>
            {matchingItems.length} {lang === 'en' ? 'matches found' : 'matokeo yaliyopatikana'}
          </span>
          {(filters.query || filters.city || filters.category !== 'all') && (
            <button
              onClick={() =>
                onFilterChange({
                  query: '',
                  city: '',
                  category: 'all',
                  date: '',
                })
              }
              className="text-red-600 hover:underline cursor-pointer"
            >
              {lang === 'en' ? 'Clear all' : 'Futa yote'}
            </button>
          )}
        </div>

        <div className="space-y-3">
          {matchingItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectExperience(item);
                onClose();
              }}
              className="flex items-center gap-3 p-2.5 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <img
                  src={item.img_card.main}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-red-600 uppercase">
                    {item.category}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-[10px] text-gray-400">
                    {item.city}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-red-600 truncate">
                  {item.title}
                </h4>
                <div className="text-xs font-extrabold text-red-600 mt-0.5">
                  {formatTZS(item.final_min_price, currency)}
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-red-600 mr-2 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
