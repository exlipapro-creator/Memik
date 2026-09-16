import React, { useState } from 'react';
import { ExperienceItem } from '../types';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Heart,
  Share2,
  ShieldCheck,
  Check,
  Star,
  Ticket,
  CheckCircle2,
  Tv,
  Smartphone,
} from 'lucide-react';
import { formatPrice } from '../utils/formatters';

interface ExperienceModalProps {
  experience: ExperienceItem | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: number) => void;
  lang: 'en' | 'sw';
  currency: string;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({
  experience,
  onClose,
  isWishlisted,
  onToggleWishlist,
  lang,
  currency,
}) => {
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!experience) return null;

  const unitPrice = parseFloat(experience.final_min_price);
  const totalPrice = unitPrice * ticketCount;

  const currentDisplayImage =
    selectedImage || experience.img_card.original || experience.img_card.main;

  const allImages = experience.gallery
    ? [experience.img_card.main, ...experience.gallery]
    : [experience.img_card.main];

  const match = experience.match_details;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleBook = () => {
    setBookingConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky top modal bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full btn-gradient text-white text-[11px] font-bold uppercase tracking-wider">
              {match ? match.competition : experience.category}
            </span>
            <span className="text-xs font-semibold text-gray-500">
              {experience.sub_type === 'EV'
                ? lang === 'en'
                  ? 'Official Match / Event'
                  : 'Mechi / Tukio Rasmi'
                : lang === 'en'
                ? 'Tanzania Activity'
                : 'Shughuli ya Utalii'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copiedLink && (
              <span className="text-[11px] font-bold text-red-600 animate-fadeIn">
                {lang === 'en' ? 'Link copied!' : 'Kiungo kimenakiliwa!'}
              </span>
            )}

            <button
              onClick={() => onToggleWishlist(experience.id)}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isWishlisted
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-500 hover:text-red-600 hover:bg-gray-100'
              }`}
              title="Wishlist"
            >
              <Heart
                className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
              />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Media Gallery */}
          <div>
            <div className="h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden relative shadow-md bg-gray-950">
              <img
                src={currentDisplayImage}
                alt={experience.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-semibold flex items-center gap-1.5 border border-white/15">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>{experience.location || experience.city}</span>
              </div>
              {match?.broadcast && (
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-yellow-300 text-xs font-bold flex items-center gap-1.5 border border-white/10">
                  <Tv className="w-3.5 h-3.5" />
                  <span>{match.broadcast}</span>
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {allImages.length > 1 && (
              <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1 no-scrollbar">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                      currentDisplayImage === img
                        ? 'border-red-600 scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Match Head to Head card if present */}
          {match && (
            <div className="bg-gradient-to-r from-gray-900 via-red-950 to-gray-900 rounded-3xl p-5 text-white shadow-lg border border-red-500/20">
              <div className="text-center text-xs font-bold uppercase tracking-widest text-red-300 mb-3">
                {match.competition} • Round {match.matchday}
              </div>
              <div className="flex items-center justify-around py-2">
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full mx-auto flex items-center justify-center font-black text-sm text-white shadow-md mb-2 border-2 border-white/30"
                    style={{ backgroundColor: match.homeTeam.primaryColor }}
                  >
                    {match.homeTeam.shortName.slice(0, 3)}
                  </div>
                  <span className="font-extrabold text-sm block">
                    {match.homeTeam.name}
                  </span>
                  <span className="text-[11px] text-gray-400">Home</span>
                </div>

                <div className="text-center px-4">
                  <span className="text-xl font-black text-red-400 block font-mono">
                    {match.kickoffTime.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-yellow-300 font-bold uppercase block mt-0.5">
                    {match.stadium}
                  </span>
                </div>

                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full mx-auto flex items-center justify-center font-black text-sm text-white shadow-md mb-2 border-2 border-white/30"
                    style={{ backgroundColor: match.awayTeam.primaryColor }}
                  >
                    {match.awayTeam.shortName.slice(0, 3)}
                  </div>
                  <span className="font-extrabold text-sm block">
                    {match.awayTeam.name}
                  </span>
                  <span className="text-[11px] text-gray-400">Away</span>
                </div>
              </div>
            </div>
          )}

          {/* Title & Metadata Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Details */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                  {experience.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-600">
                  {experience.rating && (
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2.5 py-1 rounded-md font-bold">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{experience.rating}</span>
                      <span className="text-gray-400 font-normal">
                        ({experience.reviews_count} reviews)
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-red-500" />
                    <span>
                      {new Date(experience.start_date).toLocaleDateString(
                        lang === 'en' ? 'en-US' : 'sw-TZ',
                        {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        }
                      )}
                    </span>
                  </div>

                  {experience.duration && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span>{experience.duration}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span>
                      {experience.location || `${experience.city}, Tanzania`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Organizer Card */}
              {experience.organizer && (
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={experience.organizer.avatar}
                      alt={experience.organizer.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <span className="text-[11px] uppercase font-bold text-gray-400 block">
                        {lang === 'en' ? 'Official Host / Organizer' : 'Mratibu Rasmi'}
                      </span>
                      <span className="text-sm font-bold text-gray-900 flex items-center gap-1">
                        {experience.organizer.name}
                        {experience.organizer.verified && (
                          <ShieldCheck className="w-4 h-4 text-red-500" />
                        )}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                    {lang === 'en' ? 'Verified Host' : 'Mwenyeji Aliyeidhinishwa'}
                  </span>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {lang === 'en' ? 'About this event' : 'Kuhusu tukio hili'}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                  {experience.description}
                </p>
              </div>

              {/* Highlights */}
              {experience.highlights && experience.highlights.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-3">
                    {lang === 'en' ? 'Experience Highlights' : 'Mambo Muhimu'}
                  </h3>
                  <div className="space-y-2">
                    {experience.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What's included */}
              {experience.included && experience.included.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-3">
                    {lang === 'en' ? "What's included" : 'Kilichojumuishwa'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {experience.included.map((inc, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 text-xs font-semibold text-gray-800"
                      >
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Strict No Betting / Fair Play Advisory */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-emerald-950">
                    {lang === 'en' ? 'Fan & Sports Integrity Guarantee' : 'Ulinzi na Usalama wa Michezo'}
                  </div>
                  <div className="mt-0.5 text-emerald-700">
                    {lang === 'en'
                      ? 'Memik is exclusively for matchday tickets, authentic fan experiences, and tours. Absolutely no gambling or betting services are hosted.'
                      : 'Memik ni jukwaa la tiketi halisi, matamasha na utalii. Hatuhusiki na kamari au kubashiri kwa aina yoyote.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Instant Booking Box */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 bg-white rounded-3xl border-2 border-red-100 p-5 shadow-xl shadow-red-950/5">
                {bookingConfirmed ? (
                  <div className="text-center py-6 animate-fadeIn">
                    <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">
                      <Check className="w-7 h-7 stroke-[3]" />
                    </div>
                    <h4 className="text-lg font-extrabold text-gray-900">
                      {lang === 'en' ? 'Booking Confirmed!' : 'Uwekaji Nafasi Umethibitishwa!'}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 mb-4">
                      {lang === 'en'
                        ? `We sent your digital QR e-ticket (${ticketCount}x) to your SMS & email.`
                        : `Tumetuma tiketi yako ya QR (${ticketCount}x) kwa ujumbe wa simu (SMS) na barua pepe.`}
                    </p>
                    <div className="p-3 bg-red-50 rounded-2xl text-left text-xs mb-4">
                      <div className="font-bold text-red-700">Memik Pass #TZ-8842</div>
                      <div className="text-gray-600 font-medium">{experience.title}</div>
                      <div className="text-gray-500 mt-1 font-mono">
                        {new Date(experience.start_date).toLocaleDateString()} • {match?.kickoffTime || '16:00 EAT'}
                      </div>
                      <div className="mt-2 text-[10px] text-emerald-700 font-bold">
                        Turnstile Gate Ready • QR Code Active
                      </div>
                    </div>
                    <button
                      onClick={() => setBookingConfirmed(false)}
                      className="w-full py-2.5 rounded-full border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      {lang === 'en' ? 'Book another slot' : 'Agiza tiketi nyingine'}
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 block">
                          {lang === 'en' ? 'Price per person' : 'Bei kwa mtu'}
                        </span>
                        <span className="text-2xl font-black text-red-600">
                          {formatPrice(experience.final_min_price, currency)}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        {lang === 'en' ? 'Instant QR Code' : 'QR ya Papo Hapo'}
                      </span>
                    </div>

                    {/* Ticket quantity selector */}
                    <div className="mb-4">
                      <label className="text-xs font-bold text-gray-700 block mb-1.5">
                        {lang === 'en' ? 'Tickets / Guests' : 'Idadi ya Tiketi / Wageni'}
                      </label>
                      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl p-1.5">
                        <button
                          type="button"
                          onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                          className="w-8 h-8 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-sm font-black text-gray-800">
                          {ticketCount} {ticketCount === 1 ? (lang === 'en' ? 'ticket' : 'tiketi') : (lang === 'en' ? 'tickets' : 'tiketi')}
                        </span>
                        <button
                          type="button"
                          onClick={() => setTicketCount(ticketCount + 1)}
                          className="w-8 h-8 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal calculation */}
                    <div className="space-y-1.5 py-3 border-t border-b border-gray-100 text-xs mb-4">
                      <div className="flex justify-between text-gray-500">
                        <span>{formatPrice(experience.final_min_price, currency)} × {ticketCount}</span>
                        <span>{formatPrice(totalPrice.toString(), currency)}</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>{lang === 'en' ? 'Service fee' : 'Ada ya huduma'}</span>
                        <span className="text-green-600 font-bold">{lang === 'en' ? 'Free' : 'Bure'}</span>
                      </div>
                      <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-2 border-t border-gray-100">
                        <span>{lang === 'en' ? 'Total' : 'Jumla'}</span>
                        <span className="text-red-600">{formatPrice(totalPrice.toString(), currency)}</span>
                      </div>
                    </div>

                    {/* Mobile money badges */}
                    <div className="mb-3 flex items-center justify-between text-[10px] text-gray-500 bg-gray-50 p-2 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-1 font-semibold text-gray-700">
                        <Smartphone className="w-3.5 h-3.5 text-red-600" />
                        <span>M-Pesa • Airtel • Tigo</span>
                      </div>
                      <span className="text-emerald-600 font-bold">Zero Fee</span>
                    </div>

                    {/* Book Now Button */}
                    <button
                      onClick={handleBook}
                      className="w-full py-3 rounded-full btn-gradient btn-gradient-hover text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                    >
                      <Ticket className="w-4 h-4" />
                      <span>
                        {match
                          ? lang === 'en'
                            ? 'Confirm & Get Match Ticket'
                            : 'Thibitisha & Kata Tiketi ya Mechi'
                          : lang === 'en'
                          ? 'Confirm & Book Tickets'
                          : 'Thibitisha & Lipia Nafasi'}
                      </span>
                    </button>

                    <p className="text-[10px] text-center text-gray-400 mt-3">
                      {lang === 'en'
                        ? 'Instant QR turnstile admission powered by Memik Pay. Strictly authentic sports tickets.'
                        : 'Tiketi ya QR ya kuingilia uwanjani kupitia Memik Pay. Hakuna kamari/betting.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
