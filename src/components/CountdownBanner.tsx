import React, { useState, useEffect } from 'react';
import { Calendar, Ticket, MapPin, Clock, ArrowRight, ShieldCheck, Tv } from 'lucide-react';
import { ExperienceItem } from '../types';
import { formatPrice } from '../utils/formatters';

interface CountdownBannerProps {
  onSelectEvent: (event: ExperienceItem) => void;
  featuredEvent: ExperienceItem;
  lang: 'en' | 'sw';
  currency?: string;
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({
  onSelectEvent,
  featuredEvent,
  lang,
  currency = 'TZS',
}) => {
  // Countdown to Saturday Derby kickoff
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 11,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const priceFormatted = formatPrice(featuredEvent.final_min_price, currency);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 md:my-10" id="featured-banner">
      <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gray-900 border border-red-500/30 group">
        {/* Background Banner Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=80"
            alt="Kariakoo Derby Benjamin Mkapa Stadium"
            className="w-full h-full object-cover object-center opacity-40 group-hover:scale-105 transition-transform duration-700"
          />
          {/* Crimson Red Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-red-950/85 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            {/* Tag pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
              <span>
                {lang === 'en'
                  ? 'NBC Premier League • Official Matchday Headliner'
                  : 'Ligi Kuu ya NBC • Pambano la Watani wa Jadi'}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              {featuredEvent.title}
            </h3>

            {/* Match info row */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-red-400" />
                <span>Saturday, September 26, 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>Benjamin Mkapa National Stadium, Dar es Salaam</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-red-400" />
                <span>17:00 EAT (Gates open 10:00)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Tv className="w-4 h-4 text-yellow-400" />
                <span>Live on Azam Sports 1 HD</span>
              </div>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-gray-300 line-clamp-2">
              {featuredEvent.description}
            </p>

            {/* Fan and gate advisory */}
            <div className="mt-4 flex items-center gap-2 text-[11px] text-emerald-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                {lang === 'en'
                  ? 'Official E-Tickets with stadium turnstile QR code. Strictly sports & fan attendance.'
                  : 'Tiketi halisi za kielektroniki za milangoni. Hakuna kamari/betting.'}
              </span>
            </div>
          </div>

          {/* Right Side: Ticking Countdown Timer & Action */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-5">
            {/* Countdown Clock */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl flex items-center gap-3 text-white shadow-lg">
              <div className="text-center">
                <span className="block text-2xl sm:text-3xl font-black text-white font-mono">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] uppercase font-bold text-red-300">
                  {lang === 'en' ? 'Days' : 'Siku'}
                </span>
              </div>
              <span className="text-xl font-bold text-red-400 mb-3">:</span>
              <div className="text-center">
                <span className="block text-2xl sm:text-3xl font-black text-white font-mono">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase font-bold text-red-300">
                  {lang === 'en' ? 'Hours' : 'Masaa'}
                </span>
              </div>
              <span className="text-xl font-bold text-red-400 mb-3">:</span>
              <div className="text-center">
                <span className="block text-2xl sm:text-3xl font-black text-white font-mono">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase font-bold text-red-300">
                  {lang === 'en' ? 'Mins' : 'Dak'}
                </span>
              </div>
              <span className="text-xl font-bold text-red-400 mb-3">:</span>
              <div className="text-center">
                <span className="block text-2xl sm:text-3xl font-black text-red-400 font-mono">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase font-bold text-red-300">
                  {lang === 'en' ? 'Secs' : 'Sek'}
                </span>
              </div>
            </div>

            {/* Book tickets button */}
            <button
              onClick={() => onSelectEvent(featuredEvent)}
              className="px-6 py-3.5 rounded-full btn-gradient btn-gradient-hover text-white text-sm font-bold flex items-center gap-2.5 shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>
                {lang === 'en'
                  ? `Get Derby Tickets from ${priceFormatted}`
                  : `Kata Tiketi ya Derby kuanzia ${priceFormatted}`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
