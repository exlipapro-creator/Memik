import React, { useState } from 'react';
import { X, Mail, Lock, Check, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'sw';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, lang }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedInUser(email || 'Mwanasoka');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center text-white font-bold text-xs">
              M
            </div>
            <h3 className="font-extrabold text-base text-gray-900">
              {isSignUp
                ? lang === 'en'
                  ? 'Create Memik Tanzania Account'
                  : 'Fungua Akaunti ya Memik'
                : lang === 'en'
                ? 'Welcome Back Fan'
                : 'Karibu Tena Shujaa'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {loggedInUser ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">
                {lang === 'en' ? 'Signed in successfully!' : 'Umefanikiwa Kuingia!'}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {lang === 'en'
                  ? `Karibu, ${loggedInUser}. Your match tickets, derby passes, and safari bookings are ready.`
                  : `Karibu, ${loggedInUser}. Tiketi zako za ligi na safari zimeunganishwa.`}
              </p>
              <button
                onClick={() => {
                  setLoggedInUser(null);
                  onClose();
                }}
                className="mt-5 w-full py-2.5 rounded-full btn-gradient text-white text-xs font-bold shadow-md cursor-pointer"
              >
                {lang === 'en' ? 'Continue' : 'Endelea'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {lang === 'en' ? 'Email or Mobile Number' : 'Barua Pepe au Namba ya Simu'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="juma@domain.co.tz au 0712..."
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-gray-700">
                    {lang === 'en' ? 'Password' : 'Nenosiri'}
                  </label>
                  {!isSignUp && (
                    <a
                      href="#forgot"
                      className="text-[11px] text-red-600 font-semibold hover:underline"
                    >
                      {lang === 'en' ? 'Forgot?' : 'Umesahau?'}
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full btn-gradient btn-gradient-hover text-white text-xs font-bold shadow-md shadow-red-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>
                  {isSignUp
                    ? lang === 'en'
                      ? 'Create Free Account'
                      : 'Fungua Akaunti Bure'
                    : lang === 'en'
                    ? 'Sign In to Memik'
                    : 'Ingia kwenye Memik'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-400 font-semibold text-[10px]">
                    {lang === 'en' ? 'Or continue with' : 'Au endelea na'}
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLoggedInUser('Google User')}
                  className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-semibold text-gray-700 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLoggedInUser('Apple User')}
                  className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-semibold text-gray-700 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current text-gray-900" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.64-.78 1.08-1.86.96-2.95-1 .04-2.13.66-2.77 1.41-.57.66-.99 1.77-.85 2.81 1.12.09 2.02-.49 2.66-1.27z" />
                  </svg>
                  <span>Apple</span>
                </button>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-xs text-gray-600 hover:text-red-600 font-semibold cursor-pointer"
                >
                  {isSignUp
                    ? lang === 'en'
                      ? 'Already have an account? Sign in'
                      : 'Tayari una akaunti? Ingia'
                    : lang === 'en'
                    ? "Don't have an account? Sign up"
                    : 'Huna akaunti? Fungua bure'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
