import React from 'react';
import { PAST_EXPERIENCES } from '../data/experiencesData';
import { Users, Calendar, MapPin, Quote } from 'lucide-react';

interface ItHappenedSectionProps {
  lang: 'en' | 'sw';
}

export const ItHappenedSection: React.FC<ItHappenedSectionProps> = ({ lang }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14" id="it-happened">
      {/* Title & Description */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          {lang === 'en' ? 'Historic Moments on Memik' : 'Yaliyotokea Kupitia Memik'}
        </h2>
        <p className="mt-1 text-sm text-gray-500 font-normal">
          {lang === 'en'
            ? 'Relive sold-out Kariakoo Derbies, Mapinduzi Cup triumphs, and unforgettable Tanzania adventures.'
            : 'Kumbuka mechi zilizojaa uwanjani za Kariakoo Derby, ubingwa wa Mapinduzi Cup, na safari za kihistoria.'}
        </p>
      </div>

      {/* Grid of Past Experiences */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PAST_EXPERIENCES.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image with overlay badge */}
            <div className="relative h-44 overflow-hidden bg-gray-950">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Category pill */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold border border-white/10">
                {item.category}
              </div>

              {/* Attendees count */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                <Users className="w-3 h-3" />
                <span>{item.attendeesCount.toLocaleString()} {lang === 'en' ? 'fans' : 'mashabiki'}</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-red-500" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>{item.city}</span>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                {item.testimonial && (
                  <div className="mt-3 p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-2">
                    <Quote className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] text-gray-600 italic line-clamp-2">
                        "{item.testimonial.quote}"
                      </p>
                      <span className="block text-[10px] font-bold text-gray-400 mt-1">
                        — {item.testimonial.author}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-400 font-medium">
                  {lang === 'en' ? 'Status: Concluded' : 'Hali: Imemalizika'}
                </span>
                <span className="text-red-600 font-bold hover:underline cursor-pointer">
                  {lang === 'en' ? 'View highlights' : 'Tazama kumbukumbu'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
