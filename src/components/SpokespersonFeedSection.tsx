import React, { useState } from 'react';
import { SpokespersonNewsItem } from '../types';
import { SPOKESPERSON_FEEDS } from '../data/experiencesData';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sparkles,
  CheckCircle,
  ExternalLink,
  ShieldAlert,
  Flame,
  Filter,
} from 'lucide-react';

interface SpokespersonFeedSectionProps {
  feeds?: SpokespersonNewsItem[];
  lang: 'en' | 'sw';
}

export const SpokespersonFeedSection: React.FC<SpokespersonFeedSectionProps> = ({
  feeds = SPOKESPERSON_FEEDS,
  lang,
}) => {
  const activeFeeds = feeds && feeds.length > 0 ? feeds : SPOKESPERSON_FEEDS;
  const [selectedSpokesperson, setSelectedSpokesperson] = useState<string>('all');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likesCount, setLikesCount] = useState<Record<string, number>>(() => {
    const counts: Record<string, number> = {};
    (activeFeeds || []).forEach((f) => {
      counts[f.id] = f.likes;
    });
    return counts;
  });
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => {
      const isLiked = !prev[id];
      setLikesCount((prevCounts) => ({
        ...prevCounts,
        [id]: (prevCounts[id] || 0) + (isLiked ? 1 : -1),
      }));
      return { ...prev, [id]: isLiked };
    });
  };

  const handleShare = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredFeeds =
    selectedSpokesperson === 'all'
      ? activeFeeds
      : activeFeeds.filter((f) =>
          f.spokesperson.name.toLowerCase().includes(selectedSpokesperson.toLowerCase())
        );

  const spokespersonsList = [
    { id: 'all', labelEn: 'All Updates', labelSw: 'Habari Zote', badge: '🔥' },
    { id: 'Ahmed', labelEn: 'Ahmed Ally (Simba)', labelSw: 'Ahmed Ally (Simba)', badge: '🦁' },
    { id: 'Ali Kamwe', labelEn: 'Ali Kamwe (Yanga)', labelSw: 'Ali Kamwe (Yanga)', badge: '🔰' },
    { id: 'Zakaria', labelEn: 'Zaka Zakazi (Azam)', labelSw: 'Zaka Zakazi (Azam)', badge: '🍦' },
    { id: 'Clifford', labelEn: 'Clifford Ndimbo (TFF)', labelSw: 'Clifford Ndimbo (TFF)', badge: '🇹🇿' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16" id="spokesperson-news">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 fill-red-600" />
            <span>
              {lang === 'en'
                ? 'Official Instagram Feed • Team Spokespersons'
                : 'Instagram Rasmi • Wasemaji wa Vilabu'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {lang === 'en'
              ? 'Tanzania Football News & Spokesperson Hype'
              : 'Habari za Soka & Kauli za Wasemaji wa Vilabu'}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 font-normal max-w-2xl">
            {lang === 'en'
              ? 'Direct match statements, press conferences, and derby hype from Ahmed Ally, Ali Kamwe, Zaka Zakazi, and the Tanzania Football Federation (TFF).'
              : 'Kauli rasmi za mechi, mikutano na waandishi, na hamasa ya Kariakoo Derby kutoka kwa Ahmed Ally, Ali Kamwe, Zaka Zakazi, na TFF.'}
          </p>
        </div>

        {/* Anti-betting integrity assurance badge */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold self-start md:self-auto">
          <ShieldAlert className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>
            {lang === 'en'
              ? '100% Match Events & Fan News • Zero Betting/Gambling'
              : 'Matukio ya Soka & Tiketi • Hakuna Kamari/Betting'}
          </span>
        </div>
      </div>

      {/* Spokesperson Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {spokespersonsList.map((tab) => {
          const isActive = selectedSpokesperson === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedSpokesperson(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer shadow-sm ${
                isActive
                  ? 'bg-red-600 text-white shadow-red-600/20 scale-[1.02]'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-600'
              }`}
            >
              <span>{tab.badge}</span>
              <span>{lang === 'en' ? tab.labelEn : tab.labelSw}</span>
            </button>
          );
        })}
      </div>

      {/* Instagram-style Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeeds.map((feed) => {
          const isLiked = !!likedPosts[feed.id];
          const count = likesCount[feed.id] || feed.likes;
          const isPlayingAudio = playingAudioId === feed.id;

          return (
            <article
              key={feed.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              {/* Post Header: Profile & Story Ring */}
              <div className="p-4 flex items-center justify-between border-b border-gray-50 bg-white">
                <div className="flex items-center gap-3">
                  {/* Story ring with Instagram red/orange gradient */}
                  <div className="p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                    <div className="p-0.5 bg-white rounded-full">
                      <img
                        src={feed.spokesperson.avatar}
                        alt={feed.spokesperson.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-black text-gray-900 leading-none">
                        {feed.spokesperson.name}
                      </h4>
                      {feed.spokesperson.verified && (
                        <CheckCircle className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                      )}
                      <span className="text-[10px]">{feed.spokesperson.clubBadge}</span>
                    </div>
                    <span className="text-[11px] text-gray-500 block leading-tight font-medium">
                      {feed.spokesperson.handle} •{' '}
                      <span className="text-gray-400">{feed.timestamp}</span>
                    </span>
                    <span className="text-[10px] text-red-600 font-bold tracking-tight">
                      {feed.spokesperson.club}
                    </span>
                  </div>
                </div>

                {/* Competition Tag */}
                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold">
                  {feed.competitionTag}
                </span>
              </div>

              {/* Media Container with photo and video/live badge */}
              <div className="relative aspect-[4/3] bg-gray-900 overflow-hidden">
                <img
                  src={feed.mediaUrl}
                  alt={feed.spokesperson.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Live / Official Broadcast pill */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>Instagram Official</span>
                </div>

                {/* Audio Voice Note Simulator if available */}
                {feed.audioDuration && (
                  <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md p-2.5 rounded-2xl border border-white/40 shadow-lg flex items-center justify-between gap-3">
                    <button
                      onClick={() =>
                        setPlayingAudioId(isPlayingAudio ? null : feed.id)
                      }
                      className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 hover:bg-red-700 shadow-md transition-colors"
                      title={isPlayingAudio ? 'Pause' : 'Play Voice Note'}
                    >
                      {isPlayingAudio ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[10px] font-bold text-gray-800">
                        <span>{isPlayingAudio ? 'Playing Spokesperson Voice' : 'Spokesperson Voice Note'}</span>
                        <span className="text-red-600 font-mono">{feed.audioDuration}</span>
                      </div>
                      {/* Audio waveform mockup */}
                      <div className="flex items-center gap-0.5 mt-1 h-3">
                        {[40, 70, 30, 90, 60, 100, 45, 80, 50, 95, 30, 65, 85, 40, 75, 55, 90, 35].map(
                          (height, i) => (
                            <span
                              key={i}
                              className={`w-1 rounded-full transition-all duration-300 ${
                                isPlayingAudio
                                  ? 'bg-red-600 animate-pulse'
                                  : 'bg-gray-300'
                              }`}
                              style={{
                                height: `${height}%`,
                                animationDelay: `${i * 0.05}s`,
                              }}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Engagement Bar: Heart, Comment, Share */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    {/* Heart Like */}
                    <button
                      onClick={() => toggleLike(feed.id)}
                      className="flex items-center gap-1.5 text-gray-700 hover:text-red-600 transition-colors cursor-pointer group/btn"
                    >
                      <Heart
                        className={`w-5 h-5 transition-transform group-hover/btn:scale-125 ${
                          isLiked
                            ? 'text-red-600 fill-red-600 scale-110'
                            : 'text-gray-700'
                        }`}
                      />
                      <span className="text-xs font-bold">
                        {count.toLocaleString()}
                      </span>
                    </button>

                    {/* Comments */}
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-xs font-bold">
                        {feed.commentsCount.toLocaleString()}
                      </span>
                    </div>

                    {/* Share */}
                    <button
                      onClick={() =>
                        handleShare(
                          feed.id,
                          `${feed.spokesperson.name} (${feed.spokesperson.club}): "${feed.captionSw}"`
                        )
                      }
                      className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                      title="Share / Copy"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  <Bookmark className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
                </div>

                {copiedId === feed.id && (
                  <div className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg mb-2">
                    {lang === 'en' ? 'Statement copied to clipboard!' : 'Kauli imenakiliwa!'}
                  </div>
                )}

                {/* Caption with Spokesperson emphasis */}
                <div className="text-xs text-gray-800 leading-relaxed font-normal mt-2">
                  <span className="font-extrabold mr-1 text-gray-900">
                    {feed.spokesperson.handle}
                  </span>
                  <span>{lang === 'en' ? feed.captionEn : feed.captionSw}</span>
                </div>

                {/* Fan reaction teaser */}
                <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                  <span className="italic">
                    {feed.spokesperson.club.includes('Simba')
                      ? 'Fans: "Mnyama mkali! Mkapa unajaa mapema!"'
                      : feed.spokesperson.club.includes('Young')
                      ? 'Fans: "Daima Mbele Nyuma Mwiko! Wapigweee!"'
                      : 'Fans: "Lambaramba safi sana, tuko tayari!"'}
                  </span>
                  <a
                    href={`https://instagram.com`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-red-600 font-bold hover:underline flex items-center gap-0.5"
                  >
                    <span>Instagram</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
