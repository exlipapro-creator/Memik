import React, { useState } from 'react';
import { Search, MapPin, Calendar, Compass, X } from 'lucide-react';
import { CategoryId, SearchFilters } from '../types';
import { CITIES_LIST } from '../data/experiencesData';

interface SearchBarProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onSearchSubmit?: () => void;
  lang: 'en' | 'sw';
}

export const SearchBar: React.FC<SearchBarProps> = ({
  filters,
  onFilterChange,
  onSearchSubmit,
  lang,
}) => {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const categoryOptions: { id: CategoryId; labelEn: string; labelSw: string }[] = [
    { id: 'all', labelEn: 'All categories', labelSw: 'Aina Zote' },
    { id: 'sports', labelEn: 'NBC League & Matchdays', labelSw: 'Ligi Kuu & Mechi za Soka' },
    { id: 'travel', labelEn: 'Safari & Zanzibar', labelSw: 'Safari & Visiwani' },
    { id: 'art', labelEn: 'Bongo Flava & Live Festivals', labelSw: 'Bongo Flava & Matamasha' },
    { id: 'learning', labelEn: 'Swahili Culture & Heritage', labelSw: 'Urithi & Utamaduni' },
  ];

  const dateOptions = [
    { id: 'all', labelEn: 'Any date', labelSw: 'Tarehe Yoyote' },
    { id: 'today', labelEn: 'Today', labelSw: 'Leo' },
    { id: 'weekend', labelEn: 'This weekend', labelSw: 'Wikendi Hii' },
    { id: 'next-week', labelEn: 'Next week', labelSw: 'Wiki Ijayo' },
    { id: 'this-month', labelEn: 'This month', labelSw: 'Mwezi Huu' },
  ];

  const currentCategoryLabel =
    categoryOptions.find((c) => c.id === filters.category)?.[
      lang === 'en' ? 'labelEn' : 'labelSw'
    ] || (lang === 'en' ? 'All categories' : 'Aina Zote');

  const currentDateLabel =
    dateOptions.find((d) => d.id === filters.date)?.[
      lang === 'en' ? 'labelEn' : 'labelSw'
    ] || (lang === 'en' ? 'When?' : 'Lini?');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit();
    // Scroll smoothly to matches/events section
    const el = document.getElementById('upcoming-events');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4" id="search-bar-container">
      {/* Desktop & Tablet Pill Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="hidden sm:flex items-center bg-white rounded-full shadow-xl shadow-red-950/10 border-2 border-red-100/80 p-1.5 transition-all hover:border-red-300 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100"
      >
        {/* Category Pill Dropdown */}
        <div className="relative flex-1 min-w-[170px]">
          <button
            type="button"
            onClick={() => {
              setShowCategoryDropdown(!showCategoryDropdown);
              setShowLocationDropdown(false);
              setShowDateDropdown(false);
            }}
            className="w-full text-left px-5 py-2.5 rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2.5 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-red-500 flex-shrink-0" />
            <div className="overflow-hidden">
              <span className="block text-[11px] uppercase tracking-wider font-bold text-gray-400">
                {lang === 'en' ? 'Activity / Match' : 'Aina ya Tukio'}
              </span>
              <span className="block text-xs font-semibold text-gray-800 truncate">
                {currentCategoryLabel}
              </span>
            </div>
          </button>

          {showCategoryDropdown && (
            <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-fadeIn">
              {categoryOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    onFilterChange({ ...filters, category: opt.id });
                    setShowCategoryDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                    filters.category === opt.id
                      ? 'bg-red-50 text-red-600 font-bold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {lang === 'en' ? opt.labelEn : opt.labelSw}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-8 bg-gray-200" />

        {/* Query Input */}
        <div className="flex-[1.4] min-w-[190px] px-4">
          <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-400">
            {lang === 'en' ? 'Search Matches & Tours' : 'Tafuta Mechi & Safari'}
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              value={filters.query}
              onChange={(e) =>
                onFilterChange({ ...filters, query: e.target.value })
              }
              placeholder={
                lang === 'en'
                  ? 'Simba, Yanga, Azam, Serengeti...'
                  : 'Simba, Yanga, Azam, Serengeti...'
              }
              className="w-full bg-transparent border-none text-xs text-gray-800 placeholder-gray-400 font-medium focus:outline-none focus:ring-0 truncate"
            />
            {filters.query && (
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, query: '' })}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="w-px h-8 bg-gray-200" />

        {/* Location Dropdown */}
        <div className="relative flex-1 min-w-[130px]">
          <button
            type="button"
            onClick={() => {
              setShowLocationDropdown(!showLocationDropdown);
              setShowCategoryDropdown(false);
              setShowDateDropdown(false);
            }}
            className="w-full text-left px-4 py-2.5 rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
            <div className="overflow-hidden">
              <span className="block text-[11px] uppercase tracking-wider font-bold text-gray-400">
                {lang === 'en' ? 'Region / City' : 'Mkoa / Mji'}
              </span>
              <span className="block text-xs font-semibold text-gray-800 truncate">
                {filters.city || (lang === 'en' ? 'Where?' : 'Wapi?')}
              </span>
            </div>
          </button>

          {showLocationDropdown && (
            <div className="absolute left-0 top-full mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 max-h-60 overflow-y-auto">
              {CITIES_LIST.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    onFilterChange({
                      ...filters,
                      city: city === 'All locations' ? '' : city,
                    });
                    setShowLocationDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                    (city === 'All locations' && !filters.city) ||
                    filters.city === city
                      ? 'bg-red-50 text-red-600 font-bold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {city === 'All locations'
                    ? lang === 'en'
                      ? 'All Regions'
                      : 'Mikoa Yote'
                    : city}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-8 bg-gray-200" />

        {/* When / Date Dropdown */}
        <div className="relative flex-1 min-w-[120px]">
          <button
            type="button"
            onClick={() => {
              setShowDateDropdown(!showDateDropdown);
              setShowCategoryDropdown(false);
              setShowLocationDropdown(false);
            }}
            className="w-full text-left px-4 py-2.5 rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-red-500 flex-shrink-0" />
            <div className="overflow-hidden">
              <span className="block text-[11px] uppercase tracking-wider font-bold text-gray-400">
                {lang === 'en' ? 'When' : 'Lini'}
              </span>
              <span className="block text-xs font-semibold text-gray-800 truncate">
                {currentDateLabel}
              </span>
            </div>
          </button>

          {showDateDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50">
              {dateOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    onFilterChange({
                      ...filters,
                      date: opt.id === 'all' ? '' : opt.id,
                    });
                    setShowDateDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                    (!filters.date && opt.id === 'all') ||
                    filters.date === opt.id
                      ? 'bg-red-50 text-red-600 font-bold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {lang === 'en' ? opt.labelEn : opt.labelSw}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Red Circular Gradient Search Action Button */}
        <button
          type="submit"
          className="w-12 h-12 rounded-full btn-gradient btn-gradient-hover text-white flex items-center justify-center shadow-md shadow-red-500/30 flex-shrink-0 cursor-pointer ml-1 active:scale-95 transition-transform"
          title="Search"
          id="hero-search-submit"
        >
          <Search className="w-5 h-5 stroke-[2.5]" />
        </button>
      </form>

      {/* Mobile Card Search Bar */}
      <div className="sm:hidden bg-white rounded-2xl p-3.5 shadow-xl shadow-red-950/10 border border-red-100">
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {/* Main search input */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
            <Search className="w-4 h-4 text-red-500" />
            <input
              type="text"
              value={filters.query}
              onChange={(e) =>
                onFilterChange({ ...filters, query: e.target.value })
              }
              placeholder={
                lang === 'en'
                  ? 'Simba, Yanga, NBC League, Serengeti...'
                  : 'Tafuta mechi, timu au safari...'
              }
              className="w-full bg-transparent border-none text-xs text-gray-800 placeholder-gray-400 font-medium focus:outline-none"
            />
            {filters.query && (
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, query: '' })}
                className="text-gray-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Row */}
          <div className="grid grid-cols-2 gap-2">
            {/* City select */}
            <div className="relative">
              <select
                value={filters.city}
                onChange={(e) =>
                  onFilterChange({ ...filters, city: e.target.value })
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-700 focus:outline-none"
              >
                <option value="">{lang === 'en' ? '📍 Where?' : '📍 Wapi?'}</option>
                {CITIES_LIST.filter((c) => c !== 'All locations').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Date select */}
            <div className="relative">
              <select
                value={filters.date}
                onChange={(e) =>
                  onFilterChange({ ...filters, date: e.target.value })
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-gray-700 focus:outline-none"
              >
                <option value="">{lang === 'en' ? '📅 When?' : '📅 Lini?'}</option>
                <option value="today">{lang === 'en' ? 'Today' : 'Leo'}</option>
                <option value="weekend">{lang === 'en' ? 'Weekend' : 'Wikendi Hii'}</option>
                <option value="next-week">{lang === 'en' ? 'Next week' : 'Wiki Ijayo'}</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl btn-gradient text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-red-500/25 active:scale-98 transition-transform cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>{lang === 'en' ? 'Find Matches & Tours' : 'Tafuta Mechi & Safari'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
