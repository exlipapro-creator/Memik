/**
 * Format currency for Tanzania experiences and match tickets.
 * Base price is stored in TZS (Tanzanian Shilling).
 */
export const formatPrice = (priceTzs: string | number, curr: string = 'TZS'): string => {
  const val = typeof priceTzs === 'string' ? parseFloat(priceTzs) : priceTzs;
  if (isNaN(val)) return 'Free';

  if (curr === 'USD') {
    const usd = val / 2600;
    return usd < 1 ? `$${usd.toFixed(2)}` : `$${Math.round(usd)}`;
  }
  if (curr === 'EUR') {
    const eur = val / 2850;
    return eur < 1 ? `€${eur.toFixed(2)}` : `€${Math.round(eur)}`;
  }
  // Default TZS
  return `${val.toLocaleString('en-US')} TZS`;
};

export const formatTZS = formatPrice;

export const parseEventDate = (dateStr: string, lang: 'en' | 'sw' = 'en') => {
  const date = new Date(dateStr);
  const monthsEn = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const monthsSw = ['JAN', 'FEB', 'MAC', 'APR', 'MEI', 'JUN', 'JUL', 'AGO', 'SEP', 'OKT', 'NOV', 'DES'];
  const daysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysSw = ['Jpl', 'Jtt', 'Jnn', 'Tnn', 'Alh', 'Ijm', 'Jms'];

  const month = (lang === 'en' ? monthsEn : monthsSw)[date.getMonth()] || 'SEP';
  const dayNum = date.getDate();
  const dayName = (lang === 'en' ? daysEn : daysSw)[date.getDay()] || 'Jms';
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return {
    monthDay: `${month} ${dayNum}`,
    dayName,
    time: `${hours}:${minutes}`,
    fullDate: date.toLocaleDateString(lang === 'en' ? 'en-US' : 'sw-TZ', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  };
};
