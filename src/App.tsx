/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { CountdownBanner } from './components/CountdownBanner';
import { UpcomingEventsSection } from './components/UpcomingEventsSection';
import { SpokespersonFeedSection } from './components/SpokespersonFeedSection';
import { UniqueActivitiesSection } from './components/UniqueActivitiesSection';
import { ItHappenedSection } from './components/ItHappenedSection';
import { OrganizerCTA } from './components/OrganizerCTA';
import { Footer } from './components/Footer';
import { ExperienceModal } from './components/ExperienceModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { OrganizerModal } from './components/OrganizerModal';
import { AuthModal } from './components/AuthModal';
import { SearchModal } from './components/SearchModal';
import {
  UPCOMING_EVENTS,
  UNIQUE_ACTIVITIES,
  SPOKESPERSON_FEEDS,
} from './data/experiencesData';
import { CategoryId, ExperienceItem, SearchFilters } from './types';

export default function App() {
  const [lang, setLang] = useState<'en' | 'sw'>('en');
  const [currency, setCurrency] = useState<string>('TZS');
  const [wishlistIds, setWishlistIds] = useState<number[]>([1001, 2001]);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOrganizerOpen, setIsOrganizerOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    city: '',
    date: '',
  });

  const toggleWishlist = (id: number) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Combine all items for global search
  const allExperiences = useMemo(() => {
    return [...UPCOMING_EVENTS, ...UNIQUE_ACTIVITIES];
  }, []);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return UPCOMING_EVENTS.filter((item) => {
      const matchesCategory =
        filters.category === 'all' || item.categoryId === filters.category;
      const matchesCity =
        !filters.city ||
        item.city.toLowerCase().includes(filters.city.toLowerCase()) ||
        item.location.toLowerCase().includes(filters.city.toLowerCase());
      const matchesQuery =
        !filters.query ||
        item.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        item.description?.toLowerCase().includes(filters.query.toLowerCase()) ||
        item.city.toLowerCase().includes(filters.query.toLowerCase());
      return matchesCategory && matchesCity && matchesQuery;
    });
  }, [filters]);

  // Filtered Activities
  const filteredActivities = useMemo(() => {
    return UNIQUE_ACTIVITIES.filter((item) => {
      const matchesCategory =
        filters.category === 'all' || item.categoryId === filters.category;
      const matchesCity =
        !filters.city ||
        item.city.toLowerCase().includes(filters.city.toLowerCase()) ||
        item.location.toLowerCase().includes(filters.city.toLowerCase());
      const matchesQuery =
        !filters.query ||
        item.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        item.description?.toLowerCase().includes(filters.query.toLowerCase()) ||
        item.city.toLowerCase().includes(filters.query.toLowerCase());
      return matchesCategory && matchesCity && matchesQuery;
    });
  }, [filters]);

  // Global search matches
  const matchingItems = useMemo(() => {
    return allExperiences.filter((item) => {
      const matchesCategory =
        filters.category === 'all' || item.categoryId === filters.category;
      const matchesCity =
        !filters.city ||
        item.city.toLowerCase().includes(filters.city.toLowerCase());
      const matchesQuery =
        !filters.query ||
        item.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        item.city.toLowerCase().includes(filters.query.toLowerCase());
      return matchesCategory && matchesCity && matchesQuery;
    });
  }, [allExperiences, filters]);

  // Wishlisted objects
  const wishlistedItems = useMemo(() => {
    return allExperiences.filter((item) => wishlistIds.includes(item.id));
  }, [allExperiences, wishlistIds]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFC] text-gray-900 selection:bg-red-500 selection:text-white" id="top">
      {/* Top Navigation */}
      <Navbar
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenOrganizer={() => setIsOrganizerOpen(true)}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
        lang={lang}
        setLang={setLang}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Content Sections */}
      <main className="flex-1 pb-16 md:pb-0">
        {/* Hero Section with Red Branding and Search Widget */}
        <Hero
          filters={filters}
          onFilterChange={setFilters}
          lang={lang}
        />

        {/* 1. Explore our Worlds / Categories */}
        <CategorySection
          selectedCategory={filters.category}
          onSelectCategory={(catId: CategoryId) =>
            setFilters((prev) => ({ ...prev, category: catId }))
          }
          lang={lang}
        />

        {/* Featured Countdown Headliner Banner (e.g., Kariakoo Derby) */}
        <CountdownBanner
          featuredEvent={UPCOMING_EVENTS[0]}
          onSelectEvent={setSelectedExperience}
          lang={lang}
        />

        {/* 2. Events you shouldn't miss (NBC Premier League & Cups) */}
        <UpcomingEventsSection
          events={filteredEvents.length > 0 ? filteredEvents : UPCOMING_EVENTS}
          wishlistIds={wishlistIds}
          onToggleWishlist={toggleWishlist}
          onSelectEvent={setSelectedExperience}
          lang={lang}
          currency={currency}
        />

        {/* 3. Official Team Spokespersons Instagram & Media News Feeds */}
        <SpokespersonFeedSection feeds={SPOKESPERSON_FEEDS} lang={lang} />

        {/* 4. Unique Tanzania activities to discover (Safaris, Zanzibar, Culture) */}
        <UniqueActivitiesSection
          activities={filteredActivities}
          wishlistIds={wishlistIds}
          onToggleWishlist={toggleWishlist}
          onSelectActivity={setSelectedExperience}
          activeCategory={filters.category}
          onSelectCategory={(catId: CategoryId) =>
            setFilters((prev) => ({ ...prev, category: catId }))
          }
          lang={lang}
          currency={currency}
        />

        {/* 5. Historic moments on Memik */}
        <ItHappenedSection lang={lang} />

        {/* 6. Organizer Call To Action / Host on Memik */}
        <OrganizerCTA
          onOpenOrganizerModal={() => setIsOrganizerOpen(true)}
          lang={lang}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenOrganizer={() => setIsOrganizerOpen(true)}
        lang={lang}
      />

      {/* Mobile Native Bottom Navigation Bar */}
      <MobileBottomNav
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenOrganizer={() => setIsOrganizerOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        lang={lang}
      />

      {/* Modals & Slide-over Drawers */}
      <ExperienceModal
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
        isWishlisted={
          selectedExperience ? wishlistIds.includes(selectedExperience.id) : false
        }
        onToggleWishlist={toggleWishlist}
        lang={lang}
        currency={currency}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistedItems}
        onRemoveItem={toggleWishlist}
        onSelectExperience={setSelectedExperience}
        currency={currency}
        lang={lang}
      />

      <OrganizerModal
        isOpen={isOrganizerOpen}
        onClose={() => setIsOrganizerOpen(false)}
        lang={lang}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        lang={lang}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        onSelectExperience={setSelectedExperience}
        matchingItems={matchingItems}
        lang={lang}
        currency={currency}
      />
    </div>
  );
}

