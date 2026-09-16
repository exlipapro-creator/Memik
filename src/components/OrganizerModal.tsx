import React, { useState } from 'react';
import { X, Sparkles, Check, Send, ShieldCheck } from 'lucide-react';

interface OrganizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'sw';
}

export const OrganizerModal: React.FC<OrganizerModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    activityType: 'sports',
    city: 'Dar es Salaam',
    description: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-red-600 to-red-500 text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <h3 className="font-extrabold text-base tracking-tight">
              {lang === 'en' ? 'Publish on Memik Tanzania • Partner Portal' : 'Tangaza kwenye Memik • Tovuti ya Washirika'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="text-xl font-black text-gray-900">
                {lang === 'en' ? 'Application Received!' : 'Ombi Limepokelewa!'}
              </h4>
              <p className="text-xs text-gray-600 mt-2 max-w-md mx-auto leading-relaxed">
                {lang === 'en'
                  ? `Asante ${formData.name}. Our Tanzania ticketing and tour partner team will review your submission and contact you at ${formData.email} within 24 hours.`
                  : `Ahsante ${formData.name}. Timu yetu ya tiketi na utalii itapitia maelezo yako na kuwasiliana nawe kupitia ${formData.email} ndani ya saa 24.`}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-6 px-6 py-2.5 rounded-full btn-gradient text-white text-xs font-bold shadow-md cursor-pointer"
              >
                {lang === 'en' ? 'Close & Return to Home' : 'Funga & Rudi Nyumbani'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-gray-500 mb-2">
                {lang === 'en'
                  ? 'Join football clubs, stadium tour guides, and certified Tanzania tour operators offering authentic fan experiences.'
                  : 'Ungana na vilabu vya ligi, waelekezi wa safari za viwanja na kampuni za utalii kote Tanzania.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === 'en' ? 'Your Name' : 'Jina Lako'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="mfano: Juma Rashid Mwamba"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === 'en' ? 'Email Address' : 'Barua Pepe'} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="official@club.co.tz"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === 'en' ? 'Organization / Club / Agency' : 'Shirika / Klabu / Kampuni'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Serengeti Safari & Fans"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === 'en' ? 'Phone Number (M-Pesa / Tigo)' : 'Namba ya Simu'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+255 712 345 678"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === 'en' ? 'Activity / Match Type' : 'Aina ya Tukio'}
                  </label>
                  <select
                    value={formData.activityType}
                    onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500"
                  >
                    <option value="sports">NBC League / Cup Match Tickets</option>
                    <option value="travel">Serengeti & Wildlife Safaris</option>
                    <option value="island">Zanzibar & Island Excursions</option>
                    <option value="art">Swahili Cultural & Music Festivals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === 'en' ? 'Host City / Region' : 'Mkoa / Jiji'}
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500"
                  >
                    <option value="Dar es Salaam">Dar es Salaam</option>
                    <option value="Zanzibar">Zanzibar</option>
                    <option value="Arusha">Arusha</option>
                    <option value="Mwanza">Mwanza</option>
                    <option value="Dodoma">Dodoma</option>
                    <option value="Kilimanjaro">Kilimanjaro</option>
                    <option value="Tanga">Tanga</option>
                    <option value="Mbeya">Mbeya</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {lang === 'en' ? 'Event / Package Overview' : 'Maelezo ya Tukio / Safari'}
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={
                    lang === 'en'
                      ? 'Tell us about the match or experience, expected fans, pricing in TZS, and gate access...'
                      : 'Eleza kuhusu mechi au ziara, idadi ya mashabiki, bei katika TZS na milango ya uwanja...'
                  }
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  {lang === 'en'
                    ? 'Memik enforces a strict anti-gambling policy. All listings must be genuine tickets or tours.'
                    : 'Memik haihusiki na kamari au kubashiri. Tiketi zote lazima ziwe halisi za michezo au utalii.'}
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full btn-gradient btn-gradient-hover text-white text-xs font-bold shadow-md shadow-red-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Submit Partner Application' : 'Wasilisha Ombi la Ushirika'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
