export type CollectionType = 'Beach Escapes' | 'Mountain Retreats' | 'Private Villas';

export interface HotelStay {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  country: string;
  collection: CollectionType;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  gallery: string[];
  specs: {
    guests: number;
    bedrooms: number;
    bathrooms: number;
    areaSqFt: number;
    hasInfinityPool: boolean;
    hasPrivateButler: boolean;
  };
  description: string;
  amenities: string[];
  highlights: string[];
}

export interface BookingSearchQuery {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface CollectionCategory {
  id: CollectionType;
  title: string;
  description: string;
  count: number;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  author: string;
  title: string;
  location: string;
  quote: string;
  rating: number;
  stayName: string;
  date: string;
}
