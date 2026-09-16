import React from 'react';
import { Compass, Search, Heart, PlusCircle, User } from 'lucide-react';

interface MobileBottomNavProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
  onOpenOrganizer: () => void;
  onOpenSearch: () => void;
  activeTab?: 'explore' | 'search' | 'wishlist' | 'organize' | 'profile';
  lang: 'en' | 'sw';
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  wishlistCount,
  onOpenWishlist,
  onOpenAuth,
  onOpenOrganizer,
  onOpenSearch,
  activeTab = 'explore',
  lang,
}) => {
  return (
    <div
      id="mobile-bottom-navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-3 py-2 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      {/* Explore / Home */}
      <a
        href="#top"
        className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
          activeTab === 'explore' ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
        }`}
      >
        <Compass className={`w-5 h-5 ${activeTab === 'explore' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px] font-semibold">
          {lang === 'en' ? 'Explore' : 'Gundua'}
        </span>
      </a>

      {/* Search */}
      <button
        onClick={onOpenSearch}
        className="flex flex-col items-center gap-1 py-1 px-2.5 text-gray-500 hover:text-red-600 rounded-xl transition-all cursor-pointer"
      >
        <Search className="w-5 h-5 stroke-2" />
        <span className="text-[10px] font-semibold">
          {lang === 'en' ? 'Search' : 'Tafuta'}
        </span>
      </button>

      {/* Publish / Organize */}
      <button
        onClick={onOpenOrganizer}
        className="flex flex-col items-center -mt-4 group cursor-pointer"
      >
        <div className="w-11 h-11 rounded-full btn-gradient text-white flex items-center justify-center shadow-lg shadow-red-500/30 group-active:scale-95 transition-transform">
          <PlusCircle className="w-6 h-6 stroke-2" />
        </div>
        <span className="text-[10px] font-semibold text-gray-700 mt-0.5">
          {lang === 'en' ? 'Host' : 'Tangaza'}
        </span>
      </button>

      {/* Wishlist */}
      <button
        onClick={onOpenWishlist}
        className="relative flex flex-col items-center gap-1 py-1 px-2.5 text-gray-500 hover:text-red-600 rounded-xl transition-all cursor-pointer"
      >
        <Heart className="w-5 h-5 stroke-2" />
        {wishlistCount > 0 && (
          <span className="absolute top-0 right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
        <span className="text-[10px] font-semibold">
          {lang === 'en' ? 'Wishlist' : 'Vipendwa'}
        </span>
      </button>

      {/* Profile / Auth */}
      <button
        onClick={onOpenAuth}
        className="flex flex-col items-center gap-1 py-1 px-2.5 text-gray-500 hover:text-red-600 rounded-xl transition-all cursor-pointer"
      >
        <User className="w-5 h-5 stroke-2" />
        <span className="text-[10px] font-semibold">
          {lang === 'en' ? 'Account' : 'Akaunti'}
        </span>
      </button>
    </div>
  );
};
