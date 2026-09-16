import React, { useRef } from 'react';
import { ExperienceItem } from '../types';
import {
  MapPin,
  Heart,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Ticket,
  Tv,
  ShieldCheck,
  Flame,
} from 'lucide-react';
import { formatPrice, parseEventDate } from '../utils/formatters';

interface UpcomingEventsSectionProps {
  events: ExperienceItem[];
  wishlistIds: number[];
  onToggleWishlist: (id: number) => void;
  onSelectEvent: (event: ExperienceItem) => void;
  lang: 'en' | 'sw';
  currency: string;
}

export const UpcomingEventsSection: React.FC<UpcomingEventsSectionProps> = ({
  events,
  wishlistIds,
  onToggleWishlist,
  onSelectEvent,
  lang,
  currency,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" id="upcoming-events">
      {/* Header with Title, Description, and Navigation */}
      <div className="flex items-end justify-between mb-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 fill-red-600" />
            <span>
              {lang === 'en' ? 'Live Matches & Big Events' : 'Mechi Rasmi & Matukio ya Soka'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {lang === 'en'
              ? 'Tanzania Matchdays & Live Events'
              : 'Mechi za Ligi Kuu, Vikombe & Matukio'}
          </h2>
          <p className="mt-1 text-sm text-gray-500 font-normal">
            {lang === 'en'
              ? 'NBC Premier League, Ngao ya Jamii, Mapinduzi Cup, and live concerts. Official tickets, zero betting.'
              : 'Mechi za NBC Premier League, Ngao ya Jamii, Kombe la Mapinduzi, na matamasha. Tiketi rasmi bila kamari.'}
          </p>
        </div>

        {/* Carousel arrows & Explore More CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:border-red-500 hover:text-red-600 flex items-center justify-center text-gray-600 transition-colors shadow-sm cursor-pointer"
              title="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:border-red-500 hover:text-red-600 flex items-center justify-center text-gray-600 transition-colors shadow-sm cursor-pointer"
              title="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <a
            href="#unique-activities"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-red-500 text-red-600 hover:bg-red-600 hover:text-white font-bold text-xs transition-colors"
          >
            <span>{lang === 'en' ? 'Explore Safaris & Tours' : 'Tazama Safari & Utalii'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Horizontal Scrollable Carousel Container */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar scroll-smooth snap-x snap-mandatory"
      >
        {events.map((event) => {
          const isWishlisted = wishlistIds.includes(event.id);
          const dateInfo = parseEventDate(event.start_date, lang);
          const match = event.match_details;

          return (
            <div
              key={event.id}
              className="snap-start flex-shrink-0 w-[290px] sm:w-[325px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Card Image Area */}
              <div className="relative h-44 sm:h-48 overflow-hidden bg-gray-950">
                <img
                  src={event.img_card.main}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  loading="lazy"
                />

                {/* Gradient shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Category label / Competition pill */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                  {match?.competition || event.category}
                </div>

                {/* Live Broadcast / Stadium indicator */}
                {match?.broadcast && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-yellow-300 text-[10px] font-bold border border-white/10">
                    <Tv className="w-3 h-3" />
                    <span>{match.broadcast}</span>
                  </div>
                )}

                {/* Wishlist button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(event.id);
                  }}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isWishlisted
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-white/80 hover:bg-white text-gray-700 hover:text-red-600 shadow-sm backdrop-blur-sm'
                  }`}
                  title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart
                    className={`w-4 h-4 ${isWishlisted ? 'fill-current text-white' : ''}`}
                  />
                </button>
              </div>

              {/* Match Head-to-Head Banner if available */}
              {match && (
                <div className="px-4 pt-3 pb-1 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: match.homeTeam.primaryColor }}
                    />
                    <span className="text-[11px] font-black text-gray-900">
                      {match.homeTeam.shortName}
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold text-red-600 uppercase tracking-widest px-2 py-0.5 rounded bg-white border border-gray-200">
                    VS
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-black text-gray-900">
                      {match.awayTeam.shortName}
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: match.awayTeam.primaryColor }}
                    />
                  </div>
                </div>
              )}

              {/* Card Middle: Date column + Title & Location */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="flex gap-3 items-start">
                  {/* Date Column */}
                  <div className="w-[68px] flex-shrink-0 text-center py-1.5 bg-red-50/80 rounded-2xl border border-red-100">
                    <span className="block text-[11px] font-black text-red-600 uppercase leading-none">
                      {dateInfo.monthDay}
                    </span>
                    <span className="block text-[10px] font-bold text-gray-600 mt-0.5">
                      {dateInfo.dayName}
                    </span>
                    <span className="block text-[10px] font-mono text-gray-400 mt-0.5">
                      {match?.kickoffTime.split(' ')[0] || dateInfo.time}
                    </span>
                  </div>

                  {/* Title & Location */}
                  <div className="flex-1 min-w-0">
                    <h3
                      onClick={() => onSelectEvent(event)}
                      className="font-extrabold text-xs sm:text-sm text-gray-900 line-clamp-2 hover:text-red-600 transition-colors cursor-pointer"
                      title={event.title}
                    >
                      {event.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-500 truncate">
                      <MapPin className="w-3 h-3 text-red-500 flex-shrink-0" />
                      <span className="truncate font-medium">
                        {event.location || event.city}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-3 border-t border-gray-100" />

                {/* Footer: Price + Book Action */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block leading-tight">
                      {lang === 'en' ? 'Tickets from' : 'Kuanzia'}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-red-600">
                      {formatPrice(event.final_min_price, currency)}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectEvent(event)}
                    className="px-3.5 py-1.5 rounded-full btn-gradient btn-gradient-hover text-white text-xs font-bold flex items-center gap-1 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>
                      {match ? (lang === 'en' ? 'Get Ticket' : 'Kata Tiketi') : (lang === 'en' ? 'Book' : 'Weka')}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Explore More link */}
      <div className="mt-4 text-center md:hidden">
        <a
          href="#unique-activities"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border-2 border-red-500 text-red-600 font-bold text-xs"
        >
          <span>{lang === 'en' ? 'Explore Safari & Activities' : 'Tazama Safari & Utalii'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
