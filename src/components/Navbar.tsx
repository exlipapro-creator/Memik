import React, { useState, useEffect } from 'react';
import {
  Heart,
  Globe,
  Menu,
  X,
  User,
  PlusCircle,
  Search,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
  onOpenOrganizer: () => void;
  onOpenSearchModal: () => void;
  lang: 'en' | 'sw';
  setLang: (lang: 'en' | 'sw') => void;
  currency: string;
  setCurrency: (c: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wishlistCount,
  onOpenWishlist,
  onOpenAuth,
  onOpenOrganizer,
  onOpenSearchModal,
  lang,
  setLang,
  currency,
  setCurrency,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        id="memik-navbar"
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5'
            : 'bg-white border-b border-gray-100 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Left: Brand Logo & Main Nav */}
            <div className="flex items-center gap-8">
              <a
                href="#top"
                className="flex items-center gap-2 group cursor-pointer"
                id="brand-logo"
              >
                {/* Memik Red Logo Symbol */}
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center shadow-md shadow-red-500/30 group-hover:scale-105 transition-transform">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-white fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zm-8.8 9.3l8.8 4.4 8.8-4.4v3.4l-8.8 4.4-8.8-4.4v-3.4z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xl font-black tracking-tight text-red-600 lowercase font-sans">
                      memik
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-100 text-red-700 font-extrabold uppercase">
                      Tanzania
                    </span>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest -mt-1 font-semibold text-gray-400">
                    Matches & Safari
                  </span>
                </div>
              </a>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-6">
                <a
                  href="#upcoming-events"
                  className="text-red-600 font-bold text-sm border-b-2 border-red-600 pb-1.5 transition-colors"
                  id="nav-link-matches"
                >
                  {lang === 'en' ? 'Matches & Tickets' : 'Mechi & Tiketi'}
                </a>
                <a
                  href="#spokesperson-news"
                  className="text-gray-600 hover:text-red-600 font-medium text-sm transition-colors cursor-pointer flex items-center gap-1"
                  id="nav-link-spokespersons"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <span>{lang === 'en' ? 'Spokesperson News' : 'Wasemaji wa Vilabu'}</span>
                </a>
                <a
                  href="#unique-activities"
                  className="text-gray-600 hover:text-red-600 font-medium text-sm transition-colors"
                  id="nav-link-safaris"
                >
                  {lang === 'en' ? 'Safari & Zanzibar' : 'Safari & Visiwani'}
                </a>
                <a
                  href="#it-happened"
                  className="text-gray-600 hover:text-red-600 font-medium text-sm transition-colors"
                  id="nav-link-community"
                >
                  {lang === 'en' ? 'Match Moments' : 'Kumbukumbu za Soka'}
                </a>
              </nav>
            </div>

            {/* Middle: Compact Search Trigger when Scrolled */}
            {isScrolled && (
              <button
                onClick={onOpenSearchModal}
                id="navbar-search-trigger"
                className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 hover:bg-white hover:border-red-400 hover:shadow-sm transition-all text-gray-500 text-xs font-medium cursor-pointer"
              >
                <Search className="w-4 h-4 text-red-500" />
                <span>
                  {lang === 'en'
                    ? 'Search matches (Simba, Yanga, NBC...), safaris, cities...'
                    : 'Tafuta mechi, timu, safari, miji...'}
                </span>
                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">
                  ↵
                </span>
              </button>
            )}

            {/* Right: Actions (Wishlist, Currency, Lang, Host CTA, Sign In) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Search Quick Trigger */}
              <button
                onClick={onOpenSearchModal}
                className="lg:hidden p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
                title="Search"
                id="mobile-search-btn"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Currency Selector */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => {
                    setShowCurrencyDropdown(!showCurrencyDropdown);
                    setShowLangDropdown(false);
                  }}
                  className="px-2.5 py-1 text-xs font-semibold text-gray-600 hover:text-red-600 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-1"
                  id="currency-selector"
                >
                  <span>{currency}</span>
                </button>

                {showCurrencyDropdown && (
                  <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50 animate-fadeIn">
                    {[
                      { code: 'TZS', label: 'TZS (TSh)' },
                      { code: 'USD', label: 'USD ($)' },
                      { code: 'EUR', label: 'EUR (€)' },
                    ].map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          setCurrency(c.code);
                          setShowCurrencyDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-semibold transition-colors ${
                          currency === c.code
                            ? 'text-red-600 bg-red-50'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Language Switcher */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => {
                    setShowLangDropdown(!showLangDropdown);
                    setShowCurrencyDropdown(false);
                  }}
                  className="px-2.5 py-1 text-xs font-semibold text-gray-600 hover:text-red-600 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-1.5"
                  id="language-selector"
                >
                  <Globe className="w-3.5 h-3.5 text-gray-500" />
                  <span className="uppercase">{lang}</span>
                </button>

                {showLangDropdown && (
                  <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50 animate-fadeIn">
                    <button
                      onClick={() => {
                        setLang('en');
                        setShowLangDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-semibold transition-colors ${
                        lang === 'en'
                          ? 'text-red-600 bg-red-50'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      English (EN)
                    </button>
                    <button
                      onClick={() => {
                        setLang('sw');
                        setShowLangDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-semibold transition-colors ${
                        lang === 'sw'
                          ? 'text-red-600 bg-red-50'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Kiswahili (SW)
                    </button>
                  </div>
                )}
              </div>

              {/* Wishlist Heart Button */}
              <button
                onClick={onOpenWishlist}
                className="relative p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                title="Saved Tickets"
                id="wishlist-btn"
              >
                <Heart className="w-5 h-5 text-gray-600 hover:text-red-600 transition-colors" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Organizer / Stadium Partner Portal */}
              <button
                onClick={onOpenOrganizer}
                id="publish-activity-btn"
                className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 border-red-500 text-red-600 hover:bg-red-600 hover:text-white font-semibold text-xs transition-all shadow-sm cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>
                  {lang === 'en' ? 'Host Match / Tour' : 'Sajili Mechi / Ziara'}
                </span>
              </button>

              {/* Sign In Button */}
              <button
                onClick={onOpenAuth}
                id="signin-btn"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-900 hover:bg-red-600 text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {lang === 'en' ? 'Sign In' : 'Ingia'}
                </span>
              </button>

              {/* Mobile Drawer Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-red-600 rounded-lg"
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-4 shadow-xl">
            <div className="flex flex-col space-y-2">
              <a
                href="#upcoming-events"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-lg"
              >
                {lang === 'en' ? 'Matches & Tickets' : 'Mechi & Tiketi za Soka'}
              </a>
              <a
                href="#spokesperson-news"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                {lang === 'en' ? 'Spokesperson News (Instagram)' : 'Habari za Wasemaji'}
              </a>
              <a
                href="#unique-activities"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                {lang === 'en' ? 'Serengeti, Zanzibar & Tours' : 'Safari, Zanzibar & Utalii'}
              </a>
              <a
                href="#it-happened"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                {lang === 'en' ? 'Match Moments' : 'Kumbukumbu za Soka'}
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrganizer();
                }}
                className="text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                {lang === 'en' ? 'Host Match / Tour' : 'Sajili Mechi / Safari'}
              </button>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">
                  {lang === 'en' ? 'Language:' : 'Lugha:'}
                </span>
                <button
                  onClick={() => setLang(lang === 'en' ? 'sw' : 'en')}
                  className="px-2 py-1 text-xs font-bold bg-gray-100 rounded text-gray-800 uppercase"
                >
                  {lang === 'en' ? 'Swahili (SW)' : 'English (EN)'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">
                  {lang === 'en' ? 'Currency:' : 'Fedha:'}
                </span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="text-xs font-bold bg-gray-100 rounded px-2 py-1 border-none text-gray-800"
                >
                  <option value="TZS">TZS</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrganizer();
              }}
              className="w-full btn-gradient text-white py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-red-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {lang === 'en' ? 'Partner Portal / Organizer Hub' : 'Portali ya Waandaaji'}
              </span>
            </button>
          </div>
        )}
      </header>
    </>
  );
};
