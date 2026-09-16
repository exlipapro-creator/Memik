import React from 'react';
import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Mail,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';

interface FooterProps {
  onOpenOrganizer: () => void;
  lang: 'en' | 'sw';
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrganizer, lang }) => {
  return (
    <footer className="bg-[#111317] text-gray-400 pt-16 pb-24 md:pb-12 border-t border-gray-800" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* App Download Callout Banner */}
        <div className="mb-14 rounded-3xl bg-gradient-to-r from-red-950/80 via-gray-900 to-gray-900 border border-red-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center text-white shadow-lg shadow-red-600/30 flex-shrink-0">
              <Smartphone className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-white text-lg sm:text-xl font-bold tracking-tight">
                {lang === 'en'
                  ? 'Download the Memik Tanzania app now'
                  : 'Pakua programu ya Memik Tanzania sasa'}
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                {lang === 'en'
                  ? 'Access offline turnstile match tickets, live stadium gates, and Serengeti excursions.'
                  : 'Pata tiketi za uwanjani hata bila mtandao, lango za uwanja na safari za Serengeti.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* App Store Button */}
            <a
              href="#app-store"
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white text-gray-900 hover:bg-gray-100 transition shadow-md"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.64-.78 1.08-1.86.96-2.95-1 .04-2.13.66-2.77 1.41-.57.66-.99 1.77-.85 2.81 1.12.09 2.02-.49 2.66-1.27z" />
              </svg>
              <div className="text-left">
                <span className="block text-[9px] uppercase font-semibold leading-tight text-gray-500">
                  Download on
                </span>
                <span className="block text-xs font-bold leading-tight text-gray-900">
                  App Store
                </span>
              </div>
            </a>

            {/* Google Play Button */}
            <a
              href="#google-play"
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white text-gray-900 hover:bg-gray-100 transition shadow-md"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M3.6 2.1c-.3.3-.4.8-.4 1.4v17c0 .6.2 1.1.4 1.4l9.3-9.9-9.3-9.9zm1.5-1.2l10.9 6.2-2.8 3-8.1-9.2zm10.9 16.9l-10.9 6.2 8.1-9.2 2.8 3zm1.1-1.2l3.4-1.9c1-.6 1-1.6 0-2.2l-3.4-1.9-3.2 3 3.2 3z" />
              </svg>
              <div className="text-left">
                <span className="block text-[9px] uppercase font-semibold leading-tight text-gray-500">
                  Get it on
                </span>
                <span className="block text-xs font-bold leading-tight text-gray-900">
                  Google Play
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* 4 Main Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: About Memik */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              {lang === 'en' ? 'About Memik' : 'Kuhusu Memik'}
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#about" className="hover:text-red-400 transition-colors">
                  {lang === 'en' ? 'Who we are' : 'Sisi ni Nani'}
                </a>
              </li>
              <li>
                <a href="#competitions" className="hover:text-red-400 transition-colors">
                  {lang === 'en' ? 'NBC Premier League & Cups' : 'Ligi Kuu NBC & Vikombe'}
                </a>
              </li>
              <li>
                <a href="#spokesperson-news" className="hover:text-red-400 transition-colors">
                  {lang === 'en' ? 'Club Spokesperson Feeds' : 'Habari za Wasemaji wa Klabu'}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-red-400 transition-colors">
                  {lang === 'en' ? 'Matchday FAQ' : 'Maswali ya Mara kwa Mara'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Clubs & Organizers */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              {lang === 'en' ? 'Clubs & Partners' : 'Vilabu & Washirika'}
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={onOpenOrganizer}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  {lang === 'en' ? 'TFF & Club Officials Portal' : 'Tovuti ya TFF & Maafisa'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenOrganizer}
                  className="hover:text-red-400 transition-colors text-left cursor-pointer"
                >
                  {lang === 'en' ? 'List an event or tour' : 'Sajili tukio au safari'}
                </button>
              </li>
              <li>
                <a href="#stadiums" className="hover:text-red-400 transition-colors">
                  {lang === 'en' ? 'Stadium Gate Guidelines' : 'Miongozo ya Milango ya Uwanja'}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-red-400 transition-colors">
                  {lang === 'en' ? 'Zero Fee Matchday Tickets' : 'Tiketi Bila Makato'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Integrity */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              {lang === 'en' ? 'Integrity & Legal' : 'Uadilifu & Sheria'}
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="mailto:support@memik.co.tz" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-red-500" />
                  <span>support@memik.co.tz</span>
                </a>
              </li>
              <li>
                <a href="#no-betting" className="hover:text-red-400 transition-colors text-emerald-400 font-semibold">
                  {lang === 'en' ? 'Anti-Gambling / No Betting Policy' : 'Sera dhidi ya Kamari/Kubashiri'}
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-red-400 transition-colors">
                  {lang === 'en' ? 'Terms of Stadium Admission' : 'Masharti ya Kuingia Uwanjani'}
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-red-400 transition-colors">
                  {lang === 'en' ? 'Privacy Policy' : 'Sera ya Faragha'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Follow Us & Social */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              {lang === 'en' ? 'Follow Tanzania Football' : 'Tufuate Mtandaoni'}
            </h5>
            <p className="text-xs text-gray-400 mb-3">
              {lang === 'en'
                ? 'Join over 120,000 Simba, Yanga, and Azam supporters across Tanzania.'
                : 'Jiunge na mashabiki zaidi ya 120,000 wa Simba, Yanga na Azam kote nchini.'}
            </p>
            <div className="flex items-center gap-3 text-gray-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods Section (Tanzania Mobile Money & Banks) */}
        <div className="pt-8 pb-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span>
              {lang === 'en'
                ? '100% Encrypted Local & Mobile Money Payments'
                : 'Malipo Salama ya Mitandao ya Simu na Benki 100%'}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center text-xs font-semibold text-gray-300">
            <span className="px-2.5 py-1 rounded bg-red-950/60 border border-red-500/30 text-red-300 font-bold">M-Pesa (Vodacom)</span>
            <span className="px-2.5 py-1 rounded bg-red-950/60 border border-red-500/30 text-red-300 font-bold">Airtel Money</span>
            <span className="px-2.5 py-1 rounded bg-blue-950/60 border border-blue-500/30 text-blue-300 font-bold">Tigo Pesa</span>
            <span className="px-2.5 py-1 rounded bg-orange-950/60 border border-orange-500/30 text-orange-300 font-bold">Halopesa</span>
            <span className="px-2.5 py-1 rounded bg-gray-800 text-gray-300">CRDB SimBanking</span>
            <span className="px-2.5 py-1 rounded bg-gray-800 text-gray-300">NMB Wakala</span>
            <span className="px-2.5 py-1 rounded bg-gray-800 text-gray-300">Mastercard</span>
            <span className="px-2.5 py-1 rounded bg-gray-800 text-gray-300">VISA</span>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-6 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-2">
          <div>
            © 2026 <span className="text-white font-bold">memik</span> Tanzania. {lang === 'en' ? 'All Rights Reserved.' : 'Haki zote zimehifadhiwa.'}
          </div>
          <div className="text-emerald-400/90 font-medium">
            {lang === 'en'
              ? 'Official matchday ticketing and tourist activities only. Betting and gambling strictly prohibited.'
              : 'Tiketi rasmi za mechi na shughuli za kitalii pekee. Kamari na kubashiri haviruhusiwi.'}
          </div>
        </div>
      </div>
    </footer>
  );
};
