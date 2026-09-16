import React from 'react';
import { ExperienceItem } from '../types';
import { X, Heart, Trash2, Ticket } from 'lucide-react';
import { formatTZS } from '../utils/formatters';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: ExperienceItem[];
  onRemoveItem: (id: number) => void;
  onSelectExperience: (item: ExperienceItem) => void;
  currency: string;
  lang: 'en' | 'sw';
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveItem,
  onSelectExperience,
  currency,
  lang,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600 fill-red-600" />
            <h3 className="font-extrabold text-base text-gray-900">
              {lang === 'en' ? 'Saved Matches & Experiences' : 'Mechi na Shughuli Ulizohifadhi'} ({wishlistItems.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-gray-800 text-sm">
                {lang === 'en' ? 'Your wishlist is empty' : 'Orodha yako iko wazi'}
              </h4>
              <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                {lang === 'en'
                  ? 'Tap the heart icon on any NBC match, derby, or tour to save your favorites here.'
                  : 'Bofya moyo kwenye mechi yoyote ya NBC au safari ili kuihifadhi hapa.'}
              </p>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div
                key={item.id}
                className="group relative flex gap-3 p-2.5 rounded-2xl border border-gray-100 bg-white hover:border-red-200 hover:shadow-md transition-all cursor-pointer"
                onClick={() => {
                  onSelectExperience(item);
                  onClose();
                }}
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src={item.img_card.main}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-bold text-gray-900 truncate group-hover:text-red-600">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-gray-500 block truncate">
                      {item.city}, {item.country.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-extrabold text-red-600">
                      {formatTZS(item.final_min_price, currency)}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveItem(item.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-600 rounded-md cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[11px] font-bold text-red-600 flex items-center">
                        <Ticket className="w-3 h-3 mr-0.5" /> {lang === 'en' ? 'Book' : 'Kati'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-full btn-gradient text-white text-xs font-bold shadow-md shadow-red-500/20 cursor-pointer"
            >
              {lang === 'en' ? 'Continue Exploring' : 'Endelea Kuchunguza'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
