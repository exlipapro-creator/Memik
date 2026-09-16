export type CategoryId = 'all' | 'sports' | 'travel' | 'art' | 'learning';

export interface CategoryItem {
  id: number;
  slug: CategoryId;
  title: {
    en: string;
    sw: string;
    fr?: string;
  };
  labels: string[];
  img: string;
  count: number;
}

export interface MatchTicketTier {
  name: string; // e.g., 'VIP A', 'VIP B', 'Machungwa (Orange)', 'Mzunguko (Regular)'
  nameSw?: string;
  priceTzs: number;
  gate?: string;
  available: boolean;
}

export interface TeamInfo {
  name: string;
  shortName: string;
  logo: string;
  primaryColor: string;
  secondaryColor?: string;
}

export interface MatchDetails {
  competition:
    | 'NBC Premier League'
    | 'Community Shield (Ngao ya Jamii)'
    | 'Mapinduzi Cup'
    | 'CRDB Federation Cup'
    | 'CAF Champions League';
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  stadium: string;
  city: string;
  round?: string;
  kickoffTime: string;
  broadcast?: string;
  status: 'Upcoming' | 'Tickets on Sale' | 'Selling Fast' | 'Sold Out';
  ticketTiers: MatchTicketTier[];
  noBettingNotice?: string;
}

export interface ExperienceItem {
  id: number;
  title: string;
  slug: string;
  is_wishlisted?: boolean;
  img_card: {
    main: string;
    original?: string;
  };
  gallery?: string[];
  start_date: string;
  end_date?: string;
  tz?: string;
  location: string;
  city: string;
  country: {
    code: string;
    name: string;
  };
  final_min_price: string;
  currency: string;
  category: string;
  categoryId: CategoryId;
  sub_type: 'EV' | 'AC'; // EV = Event/Match, AC = Activity
  is_soldout?: boolean;
  is_closed?: boolean;
  rating?: number;
  reviews_count?: number;
  duration?: string;
  organizer?: {
    name: string;
    avatar?: string;
    verified?: boolean;
    role?: string;
  };
  description?: string;
  highlights?: string[];
  included?: string[];
  match_details?: MatchDetails;
}

export interface SpokespersonNewsItem {
  id: string;
  spokesperson: {
    name: string;
    role: string;
    club: string;
    handle: string;
    avatar: string;
    verified: boolean;
    clubBadge: string;
  };
  timestamp: string;
  captionEn: string;
  captionSw: string;
  mediaType: 'image' | 'video' | 'voice_note';
  mediaUrl: string;
  likes: number;
  commentsCount: number;
  competitionTag: string; // 'NBC Premier League' | 'Community Shield' | 'Mapinduzi Cup'
  audioDuration?: string;
  audioQuote?: string;
  isPinned?: boolean;
}

export interface PastExperienceItem {
  id: number;
  title: string;
  date: string;
  city: string;
  country: string;
  category: string;
  attendeesCount: number;
  img: string;
  testimonial?: {
    quote: string;
    author: string;
  };
}

export interface SearchFilters {
  query: string;
  category: CategoryId;
  city: string;
  date: string;
  competition?: string;
}

