import type { HotelStay, CollectionCategory, Testimonial } from '../types/aurelle';

export const FEATURED_STAYS: HotelStay[] = [
  {
    id: 'stay-1',
    title: 'Villa Sole di Amalfi',
    subtitle: 'Cliffside Terraces & Mediterranean Panorama',
    location: 'Amalfi Coast',
    country: 'Italy',
    collection: 'Beach Escapes',
    pricePerNight: 890,
    rating: 4.98,
    reviewsCount: 38,
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      guests: 6,
      bedrooms: 3,
      bathrooms: 4,
      areaSqFt: 3800,
      hasInfinityPool: true,
      hasPrivateButler: true
    },
    description: 'Perched delicately on the limestone cliffs of Positano, Villa Sole merges Italian neoclassical architecture with sun-bleached travertine terraces and an infinity pool that blurs into the Tyrrhenian horizon.',
    amenities: ['Cliffside Infinity Pool', '24/7 Dedicated Butler', 'Private Wine Cellar', 'Yacht Tender Charter', 'Helipad Access', 'Michelin-Starred Chef Service'],
    highlights: ['Unobstructed Amalfi sunsets', 'Direct sea path with private boat mooring', 'Handmade Vietri ceramic finishes']
  },
  {
    id: 'stay-2',
    title: 'Kyoto Zen Sanctuary',
    subtitle: 'Hinoki Cedar Pavilion & Moss Garden',
    location: 'Arashiyama, Kyoto',
    country: 'Japan',
    collection: 'Mountain Retreats',
    pricePerNight: 760,
    rating: 4.96,
    reviewsCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      guests: 4,
      bedrooms: 2,
      bathrooms: 3,
      areaSqFt: 2950,
      hasInfinityPool: false,
      hasPrivateButler: true
    },
    description: 'An architectural tribute to timeless Sukiya-zukuri design. Savor hot spring waters infused with yuzu, meditative tea ceremonies by masters of the Urasenke school, and bamboo grove whispers.',
    amenities: ['Natural Mineral Onsen', 'Tea Pavilion & Garden', 'Kaiseki Private Dining', 'Shoji Artisan Screens', 'Bicycle Escort Guide', 'Matsumoto Linen Bedding'],
    highlights: ['Centuries-old protected private moss garden', 'Forest acoustic tranquility', 'Bespoke Kyoto artisan tours']
  },
  {
    id: 'stay-3',
    title: 'Azure Cove Hideaway',
    subtitle: 'Private Coral Bay & Barefoot Solitude',
    location: 'St. Barts',
    country: 'French West Indies',
    collection: 'Beach Escapes',
    pricePerNight: 1250,
    rating: 4.99,
    reviewsCount: 29,
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      guests: 8,
      bedrooms: 4,
      bathrooms: 5,
      areaSqFt: 5200,
      hasInfinityPool: true,
      hasPrivateButler: true
    },
    description: 'Set upon powdery white sands, Azure Cove offers open-air colonial pavilions, hand-carved mahogany ceilings, and an Olympic-length saltwater pool overlooking turquoise Caribbean reefs.',
    amenities: ['Private Beachfront Strand', 'Catamaran Day Cruiser', 'Open-Air Cinema', 'Sommelier Cellar', 'Wellness Spa Cabana', 'Paddle & Dive Gear'],
    highlights: ['Gourmet fresh catch delivered daily', 'Secluded coral cove without public access', 'Starlit beachfront dining']
  },
  {
    id: 'stay-4',
    title: 'The Alpine Glass Chalet',
    subtitle: 'Glacial Vistas & Timber Warmth',
    location: 'Zermatt',
    country: 'Switzerland',
    collection: 'Mountain Retreats',
    pricePerNight: 980,
    rating: 4.95,
    reviewsCount: 31,
    imageUrl: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      guests: 6,
      bedrooms: 3,
      bathrooms: 3,
      areaSqFt: 3400,
      hasInfinityPool: false,
      hasPrivateButler: true
    },
    description: 'An engineering marvel suspended above pine valleys. Floor-to-ceiling glass frames the iconic Matterhorn, while geothermal heat, reclaimed larch wood, and a stone hearth create an intimate winter haven.',
    amenities: ['Ski-in / Ski-out Chauffeur', 'Cedar Sauna & Cold Plunge', 'Matterhorn View Hearth', 'Heated Ski Boot Room', 'Fondue & Truffle Cellar', 'Private Mountain Guide'],
    highlights: ['Unrivaled Matterhorn sunrise view', 'Warm Nordic architectural minimalism', 'Helicopter transfer from Zurich/Geneva']
  }
];

export const COLLECTIONS: CollectionCategory[] = [
  {
    id: 'Beach Escapes',
    title: 'Beach Escapes',
    description: 'Sun-drenched private shores, warm breezes, and secluded azure waters.',
    count: 24,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'Mountain Retreats',
    title: 'Mountain Retreats',
    description: 'Pristine alpine air, quiet cedar pavilions, and sweeping summit horizons.',
    count: 18,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'Private Villas',
    title: 'Private Villas',
    description: 'Entire standalone estates designed for complete sovereignty and tranquility.',
    count: 31,
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Elena & Marcus Vance',
    title: 'Design Director & Architect',
    location: 'London, UK',
    stayName: 'Villa Sole di Amalfi',
    rating: 5,
    quote: 'Aurelle Stays curated our entire fortnight on the Amalfi Coast with effortless discretion. The architecture, the bespoke morning sail, and the stillness of Positano at dawn are burned into our memories.',
    date: 'August 2026'
  },
  {
    id: 'test-2',
    author: 'Kenji Takahashi',
    title: 'Venture Partner',
    location: 'San Francisco, CA',
    stayName: 'Kyoto Zen Sanctuary',
    rating: 5,
    quote: 'In twenty years of luxury travel, rarely have I witnessed such profound architectural harmony. The private onsen amidst the bamboo forest provided the deepest mental rest I have ever experienced.',
    date: 'September 2026'
  },
  {
    id: 'test-3',
    author: 'Claire de Montmirail',
    title: 'Art Historian',
    location: 'Paris, France',
    stayName: 'The Alpine Glass Chalet',
    rating: 5,
    quote: 'Waking up to the Matterhorn bathed in golden alpine glow without another soul in sight. Aurelle’s concierge team handled every minute detail with grace and elegance.',
    date: 'January 2026'
  }
];
