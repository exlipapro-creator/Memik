import React from 'react';
import { ExperienceItem, CategoryId } from '../types';
import {
  MapPin,
  Heart,
  Star,
  Clock,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { formatPrice } from '../utils/formatters';

interface UniqueActivitiesSectionProps {
  activities: ExperienceItem[];
  wishlistIds: number[];
  onToggleWishlist: (id: number) => void;
  onSelectActivity: (activity: ExperienceItem) => void;
  activeCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  lang: 'en' | 'sw';
  currency: string;
}

export const UniqueActivitiesSection: React.FC<UniqueActivitiesSectionProps> = ({
  activities,
  wishlistIds,
  onToggleWishlist,
  onSelectActivity,
  activeCategory,
  onSelectCategory,
  lang,
  currency,
}) => {
  const tabs: { id: CategoryId; labelEn: string; labelSw: string }[] = [
    { id: 'all', labelEn: 'All Activities', labelSw: 'Shughuli Zote' },
    { id: 'travel', labelEn: 'Safari & Wildlife', labelSw: 'Safari & Wanyamapori' },
    { id: 'sports', labelEn: 'Island & Marine', labelSw: 'Visiwa & Bahari' },
    { id: 'learning', labelEn: 'Swahili Culture & Heritage', labelSw: 'Utamaduni & Urithi' },
    { id: 'art', labelEn: 'Festivals & Music', labelSw: 'Matamasha & Muziki' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" id="unique-activities">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Tanzania Beyond The Pitch' : 'Utalii na Vivutio vya Tanzania'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {lang === 'en' ? 'Tanzania Adventures & Activities' : 'Shughuli na Vivutio vya Kipekee'}
          </h2>
          <p className="mt-1 text-sm text-gray-500 font-normal">
            {lang === 'en'
              ? 'Pair your matchday with iconic safaris in Serengeti, Zanzibar spice tours, and Kilimanjaro expeditions.'
              : 'Unganisha safari yako ya mechi na matembezi ya Serengeti, viungo Zanzibar, na mlima Kilimanjaro.'}
          </p>
        </div>

        {/* Tab pills */}
        <div className="mt-4 md:mt-0 flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-red-600 text-white shadow-sm shadow-red-500/20'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600'
              }`}
            >
              {lang === 'en' ? tab.labelEn : tab.labelSw}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Activity Cards */}
      {activities.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 my-6">
          <p className="text-gray-500 text-base font-medium">
            {lang === 'en'
              ? 'No activities found matching your filters. Try clearing your search query or region.'
              : 'Hakuna shughuli inayolingana na vigezo vyako. Jaribu kubadilisha mkoa au jina.'}
          </p>
          <button
            onClick={() => onSelectCategory('all')}
            className="mt-4 px-4 py-2 rounded-full btn-gradient text-white text-xs font-bold cursor-pointer"
          >
            {lang === 'en' ? 'Show All Activities' : 'Onyesha Shughuli Zote'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity) => {
            const isWishlisted = wishlistIds.includes(activity.id);

            return (
              <div
                key={activity.id}
                onClick={() => onSelectActivity(activity)}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
              >
                {/* Top Image area */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={activity.img_card.main}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Category badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/65 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider shadow-sm border border-white/10">
                    {activity.category}
                  </div>

                  {/* Wishlist Heart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(activity.id);
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isWishlisted
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-white/80 hover:bg-white text-gray-700 hover:text-red-600 shadow-sm backdrop-blur-sm'
                    }`}
                    title={isWishlisted ? 'Remove' : 'Save'}
                  >
                    <Heart
                      className={`w-4 h-4 ${isWishlisted ? 'fill-current text-white' : ''}`}
                    />
                  </button>

                  {/* Duration badge */}
                  {activity.duration && (
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-red-400" />
                      <span>{activity.duration}</span>
                    </div>
                  )}
                </div>

                {/* Body info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating and reviews */}
                    <div className="flex items-center gap-1.5 text-xs mb-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-gray-800">
                        {activity.rating || 4.9}
                      </span>
                      <span className="text-gray-400 text-[11px]">
                        ({activity.reviews_count || 48})
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-bold text-sm text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug"
                      title={activity.title}
                    >
                      {activity.title}
                    </h3>

                    {/* Location */}
                    <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                      <span className="truncate">
                        {activity.location || `${activity.city}, Tanzania`}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-3 border-t border-gray-100" />

                  {/* Price & Book Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block leading-tight">
                        {lang === 'en' ? 'Starting at' : 'Kuanzia'}
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-red-600">
                        {formatPrice(activity.final_min_price, currency)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectActivity(activity);
                      }}
                      className="px-3 py-1.5 rounded-full border border-red-200 text-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 font-bold text-xs transition-all flex items-center gap-1 shadow-sm"
                    >
                      <span>{lang === 'en' ? 'Details' : 'Maelezo'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
