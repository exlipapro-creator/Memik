import React from 'react';
import { SearchBar } from './SearchBar';
import { SearchFilters, CategoryId } from '../types';
import { Sparkles, Compass, MapPin } from 'lucide-react';

interface HeroProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  lang: 'en' | 'sw';
}

export const Hero: React.FC<HeroProps> = ({ filters, onFilterChange, lang }) => {
  const quickTags = [
    { label: '⚽ Kariakoo Derby (Mkapa)', query: 'Kariakoo', category: 'sports' as CategoryId },
    { label: '🛡️ Ngao ya Jamii Final', query: 'Community Shield', category: 'sports' as CategoryId },
    { label: '🏆 Mapinduzi Cup (Zanzibar)', query: 'Mapinduzi', category: 'sports' as CategoryId },
    { label: '🦁 Serengeti Balloon Safari', query: 'Serengeti', category: 'travel' as CategoryId },
    { label: '🏝️ Zanzibar Sunset Dhow', query: 'Zanzibar', category: 'travel' as CategoryId },
    { label: '🏔️ Kilimanjaro Summit', query: 'Kilimanjaro', category: 'travel' as CategoryId },
    { label: '🎤 Bongo Flava Live', query: 'Bongo Flava', category: 'art' as CategoryId },
  ];

  return (
    <div className="relative pt-6 pb-20 md:pb-28 overflow-hidden bg-gradient-to-b from-red-600 via-red-500 to-[#F9FAFC]">
      {/* Background Ambient Glow & Vector Shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-red-400 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-red-700 blur-3xl" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 md:pt-14">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>
            {lang === 'en'
              ? 'Tanzania Matches, Spokesperson Feeds & Wild Adventures'
              : 'Mechi za Tanzania, Habari za Wasemaji & Utalii wa Visiwani'}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight md:leading-[1.15]">
          {lang === 'en'
            ? 'Tanzania Matchdays, Club Feeds & Epic Experiences.'
            : 'Mechi za Soka Tanzania, Wasemaji wa Vilabu na Utalii.'}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto font-normal">
          {lang === 'en'
            ? 'Official e-tickets for NBC Premier League, Community Shield & Mapinduzi Cup, plus spokesperson updates, Serengeti safaris and Zanzibar dhow sails.'
            : 'Tiketi rasmi za NBC Premier League, Ngao ya Jamii, Kombe la Mapinduzi, habari za Instagram za wasemaji, safari za Serengeti na Zanzibar.'}
        </p>

        {/* Floating Search Bar */}
        <div className="mt-10 md:mt-12">
          <SearchBar
            filters={filters}
            onFilterChange={onFilterChange}
            lang={lang}
          />
        </div>

        {/* Quick Tag Chips below search */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto text-xs text-white/90">
          <span className="font-semibold text-white/70 mr-1 hidden sm:inline">
            {lang === 'en' ? 'Trending in Tanzania:' : 'Zinazovuma Tanzania:'}
          </span>
          {quickTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => {
                onFilterChange({
                  ...filters,
                  query: tag.query,
                  category: tag.category,
                });
                const el = document.getElementById('upcoming-events');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/25 transition-all text-white font-medium hover:scale-105 cursor-pointer text-[11px] sm:text-xs"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
