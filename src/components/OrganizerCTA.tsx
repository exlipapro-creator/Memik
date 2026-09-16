import React from 'react';
import { ArrowRight, BarChart3, Users, CreditCard, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

interface OrganizerCTAProps {
  onOpenOrganizerModal: () => void;
  lang: 'en' | 'sw';
}

export const OrganizerCTA: React.FC<OrganizerCTAProps> = ({
  onOpenOrganizerModal,
  lang,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 md:my-16" id="organizer">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#450A0A] via-[#280505] to-[#120202] text-white shadow-2xl border border-red-500/20">
        {/* Background glow & mesh */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 rounded-full bg-red-800/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Column: Text Content & CTA */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>{lang === 'en' ? 'Memik for Football Clubs & Tour Guides' : 'Memik kwa Vilabu na Waongoza Safari'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              {lang === 'en'
                ? 'Are you hosting a match, derby, or Tanzania tour?'
                : 'Je, unaandaa mechi, tamasha au safari Tanzania?'}
            </h2>

            <p className="mt-4 text-sm sm:text-base text-gray-300 font-normal leading-relaxed">
              {lang === 'en'
                ? 'Sell tickets digitally with M-Pesa & Tigo Pesa integration, eliminate fake gate passes, and reach thousands of passionate fans.'
                : 'Uza tiketi mtandaoni kwa M-Pesa na Tigo Pesa, zuia tiketi bandia za getini na fikia maelfu ya mashabiki wa soka na watalii.'}
            </p>

            {/* Benefit bullets */}
            <div className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>
                  {lang === 'en'
                    ? 'Automated QR code e-ticketing and instant gate turnstile scanning'
                    : 'Tiketi za QR code za kidijitali na ukaguzi wa haraka milangoni'}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>
                  {lang === 'en'
                    ? 'Instant mobile money settlement (M-Pesa, Tigo Pesa, Airtel Money)'
                    : 'Malipo ya papo hapo kwa njia za simu (M-Pesa, Tigo Pesa, Airtel)'}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>
                  {lang === 'en'
                    ? 'Real-time gate analytics and anti-touting ticket protection'
                    : 'Takwimu za moja kwa moja za mauzo na ulinzi dhidi ya walanguzi'}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-emerald-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  {lang === 'en'
                    ? '100% Betting-Free fan ecosystem compliant with sports federations'
                    : 'Jukwaa lisilo na kamari lenye heshima na weledi wa michezo'}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={onOpenOrganizerModal}
                className="px-8 py-3.5 rounded-full bg-white hover:bg-red-50 text-red-700 hover:text-red-800 font-bold text-sm shadow-xl shadow-black/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{lang === 'en' ? 'Register Your Club / Event' : 'Sajili Klabu / Tukio Lako'}</span>
                <ArrowRight className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>

          {/* Right Column: Dashboard Mockup Card */}
          <div className="w-full lg:w-[480px] flex-shrink-0">
            <div className="bg-gray-900/90 rounded-2xl border border-red-500/30 p-5 shadow-2xl backdrop-blur-xl">
              {/* Dashboard window header */}
              <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-xs font-mono text-gray-400 ml-2">
                    memik.co.tz/organizer
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-red-400 bg-red-950/60 px-2 py-0.5 rounded-md border border-red-800/40">
                  LIVE MATCH SALES
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-800/60 rounded-xl p-3 border border-gray-700/50">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                    <span>{lang === 'en' ? 'Gate Revenue' : 'Mapato ya Getini'}</span>
                    <CreditCard className="w-3.5 h-3.5 text-red-400" />
                  </div>
                  <div className="text-lg font-black text-white">48,250,000 TZS</div>
                  <span className="text-[10px] text-green-400 font-medium">
                    +44% vs previous derby
                  </span>
                </div>

                <div className="bg-gray-800/60 rounded-xl p-3 border border-gray-700/50">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                    <span>{lang === 'en' ? 'Fans Checked In' : 'Mashabiki Walioingia'}</span>
                    <Users className="w-3.5 h-3.5 text-red-400" />
                  </div>
                  <div className="text-lg font-black text-white">48,500 / 60k</div>
                  <span className="text-[10px] text-red-400 font-medium">
                    80.8% Mkapa Stadium capacity
                  </span>
                </div>
              </div>

              {/* Mini Chart Bars */}
              <div className="bg-gray-800/60 rounded-xl p-3 border border-gray-700/50">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>{lang === 'en' ? 'Hourly Gate Scan Traffic (EAT)' : 'Kasi ya Kuingia Getini (Saa)'}</span>
                  <BarChart3 className="w-3.5 h-3.5 text-red-400" />
                </div>
                <div className="flex items-end justify-between gap-1.5 h-16 pt-2">
                  {[20, 35, 55, 78, 92, 100, 85].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-sm bg-gradient-to-t from-red-600 to-red-400"
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-[9px] text-gray-500 font-mono">
                        {['12p', '1p', '2p', '3p', '4p', '5p', '6p'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
