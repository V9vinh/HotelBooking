import type { HotelStay, CollectionCategory, Testimonial } from '../types/aurelle';

const FEATURED_STAYS_EN: HotelStay[] = [
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
    specs: { guests: 6, bedrooms: 3, bathrooms: 4, areaSqFt: 3800, hasInfinityPool: true, hasPrivateButler: true },
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
    specs: { guests: 4, bedrooms: 2, bathrooms: 3, areaSqFt: 2950, hasInfinityPool: false, hasPrivateButler: true },
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
    specs: { guests: 8, bedrooms: 4, bathrooms: 5, areaSqFt: 5200, hasInfinityPool: true, hasPrivateButler: true },
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
    specs: { guests: 6, bedrooms: 3, bathrooms: 3, areaSqFt: 3400, hasInfinityPool: false, hasPrivateButler: true },
    description: 'An engineering marvel suspended above pine valleys. Floor-to-ceiling glass frames the iconic Matterhorn, while geothermal heat, reclaimed larch wood, and a stone hearth create an intimate winter haven.',
    amenities: ['Ski-in / Ski-out Chauffeur', 'Cedar Sauna & Cold Plunge', 'Matterhorn View Hearth', 'Heated Ski Boot Room', 'Fondue & Truffle Cellar', 'Private Mountain Guide'],
    highlights: ['Unrivaled Matterhorn sunrise view', 'Warm Nordic architectural minimalism', 'Helicopter transfer from Zurich/Geneva']
  }
];

const COLLECTIONS_EN: CollectionCategory[] = [
  { id: 'Beach Escapes', title: 'Beach Escapes', description: 'Sun-drenched private shores, warm breezes, and secluded azure waters.', count: 24, imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { id: 'Mountain Retreats', title: 'Mountain Retreats', description: 'Pristine alpine air, quiet cedar pavilions, and sweeping summit horizons.', count: 18, imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80' },
  { id: 'Private Villas', title: 'Private Villas', description: 'Entire standalone estates designed for complete sovereignty and tranquility.', count: 31, imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80' }
];

const TESTIMONIALS_EN: Testimonial[] = [
  { id: 'test-1', author: 'Elena & Marcus Vance', title: 'Design Director & Architect', location: 'London, UK', stayName: 'Villa Sole di Amalfi', rating: 5, quote: 'Aurelle Stays curated our entire fortnight on the Amalfi Coast with effortless discretion. The architecture, the bespoke morning sail, and the stillness of Positano at dawn are burned into our memories.', date: 'August 2026' },
  { id: 'test-2', author: 'Kenji Takahashi', title: 'Venture Partner', location: 'San Francisco, CA', stayName: 'Kyoto Zen Sanctuary', rating: 5, quote: 'In twenty years of luxury travel, rarely have I witnessed such profound architectural harmony. The private onsen amidst the bamboo forest provided the deepest mental rest I have ever experienced.', date: 'September 2026' },
  { id: 'test-3', author: 'Claire de Montmirail', title: 'Art Historian', location: 'Paris, France', stayName: 'The Alpine Glass Chalet', rating: 5, quote: 'Waking up to the Matterhorn bathed in golden alpine glow without another soul in sight. Aurelle’s concierge team handled every minute detail with grace and elegance.', date: 'January 2026' }
];

const FEATURED_STAYS_VI: HotelStay[] = [
  {
    id: 'stay-1',
    title: 'Biệt thự Sole di Amalfi',
    subtitle: 'Sân thượng bên vách đá & Tầm nhìn Địa Trung Hải',
    location: 'Bờ biển Amalfi',
    country: 'Ý',
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
    specs: { guests: 6, bedrooms: 3, bathrooms: 4, areaSqFt: 3800, hasInfinityPool: true, hasPrivateButler: true },
    description: 'Nằm chênh vênh trên vách đá vôi của Positano, Villa Sole là sự kết hợp hoàn hảo giữa kiến trúc tân cổ điển Ý với những sân thượng bằng đá travertine ngập tràn ánh nắng và một hồ bơi vô cực hòa mình vào chân trời biển Tyrrhenian.',
    amenities: ['Hồ bơi vô cực bên vách đá', 'Quản gia riêng 24/7', 'Hầm rượu riêng', 'Thuê du thuyền', 'Sân đỗ trực thăng', 'Đầu bếp Michelin'],
    highlights: ['Ngắm hoàng hôn Amalfi trọn vẹn', 'Đường ra biển với bến thuyền riêng', 'Nội thất gốm Vietri thủ công']
  },
  {
    id: 'stay-2',
    title: 'Nơi trú ẩn Kyoto Zen',
    subtitle: 'Đình Gỗ Hinoki & Vườn Rêu',
    location: 'Arashiyama, Kyoto',
    country: 'Nhật Bản',
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
    specs: { guests: 4, bedrooms: 2, bathrooms: 3, areaSqFt: 2950, hasInfinityPool: false, hasPrivateButler: true },
    description: 'Một tác phẩm kiến trúc tôn vinh thiết kế Sukiya-zukuri vượt thời gian. Thưởng thức nước suối nóng pha hương yuzu, các buổi trà đạo thiền định bởi các nghệ nhân trường phái Urasenke và lắng nghe tiếng xào xạc của rặng tre.',
    amenities: ['Onsen khoáng thiên nhiên', 'Đình trà đạo & Sân vườn', 'Bữa tối riêng Kaiseki', 'Cửa trượt Shoji thủ công', 'Hướng dẫn viên xe đạp', 'Bộ đồ giường Matsumoto'],
    highlights: ['Vườn rêu tư nhân hàng thế kỷ', 'Không gian tĩnh lặng trong rừng', 'Tour nghệ nhân Kyoto riêng']
  },
  {
    id: 'stay-3',
    title: 'Chốn ẩn mình Azure Cove',
    subtitle: 'Vịnh San hô Riêng tư & Bãi cát trắn',
    location: 'St. Barts',
    country: 'Tây Ấn Pháp',
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
    specs: { guests: 8, bedrooms: 4, bathrooms: 5, areaSqFt: 5200, hasInfinityPool: true, hasPrivateButler: true },
    description: 'Tọa lạc trên bãi cát trắng mịn, Azure Cove sở hữu các đình nghỉ dưỡng kiến trúc thuộc địa không gian mở, trần gỗ gụ chạm khắc tay và hồ bơi nước mặn chuẩn Olympic nhìn ra rạn san hô xanh ngọc của vùng Caribbean.',
    amenities: ['Bãi biển riêng tư', 'Du thuyền Catamaran', 'Rạp chiếu phim ngoài trời', 'Hầm rượu riêng', 'Spa ngoài trời', 'Dụng cụ lặn & chèo thuyền'],
    highlights: ['Hải sản tươi sống phục vụ mỗi ngày', 'Vịnh san hô hẻo lánh', 'Ăn tối ngắm sao trên bãi biển']
  },
  {
    id: 'stay-4',
    title: 'Biệt thự kính The Alpine',
    subtitle: 'Khung cảnh Sông băng & Ấm áp Gỗ',
    location: 'Zermatt',
    country: 'Thụy Sĩ',
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
    specs: { guests: 6, bedrooms: 3, bathrooms: 3, areaSqFt: 3400, hasInfinityPool: false, hasPrivateButler: true },
    description: 'Một tuyệt tác kỹ thuật treo lơ lửng trên thung lũng thông. Lớp kính từ trần đến sàn mở ra khung cảnh Matterhorn biểu tượng, cùng với hệ thống sưởi địa nhiệt, gỗ thông phục chế và lò sưởi đá tạo nên một nơi trú ẩn mùa đông ấm cúng.',
    amenities: ['Chauffeur trượt tuyết riêng', 'Phòng xông hơi gỗ tuyết tùng', 'Lò sưởi ngắm Matterhorn', 'Phòng sưởi dụng cụ trượt tuyết', 'Hầm phô mai & nấm Truffle', 'Hướng dẫn viên vùng núi'],
    highlights: ['Bình minh Matterhorn vô song', 'Kiến trúc tối giản Bắc Âu', 'Đưa đón bằng trực thăng']
  }
];

const COLLECTIONS_VI: CollectionCategory[] = [
  { id: 'Beach Escapes', title: 'Khu nghỉ dưỡng biển', description: 'Những bờ biển riêng rực nắng, làn gió ấm áp và làn nước xanh biếc hẻo lánh.', count: 24, imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { id: 'Mountain Retreats', title: 'Nơi trú ẩn vùng núi', description: 'Không khí trong lành của dãy Alps, những gian hàng tuyết tùng yên tĩnh và đường chân trời ngập tràn đỉnh núi.', count: 18, imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80' },
  { id: 'Private Villas', title: 'Biệt thự riêng tư', description: 'Toàn bộ các điền trang độc lập được thiết kế cho sự tĩnh lặng và tự do tuyệt đối.', count: 31, imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80' }
];

const TESTIMONIALS_VI: Testimonial[] = [
  { id: 'test-1', author: 'Elena & Marcus Vance', title: 'Giám đốc thiết kế & Kiến trúc sư', location: 'London, Anh', stayName: 'Villa Sole di Amalfi', rating: 5, quote: 'Aurelle Stays đã lên kế hoạch cho toàn bộ hai tuần của chúng tôi trên bờ biển Amalfi với sự kín đáo dễ dàng. Kiến trúc, chuyến đi thuyền buồm đặt riêng vào buổi sáng và sự tĩnh lặng của Positano lúc bình minh đã in sâu vào ký ức của chúng tôi.', date: 'Tháng 8, 2026' },
  { id: 'test-2', author: 'Kenji Takahashi', title: 'Đối tác Đầu tư', location: 'San Francisco, Mỹ', stayName: 'Kyoto Zen Sanctuary', rating: 5, quote: 'Trong 20 năm du lịch hạng sang, hiếm khi tôi chứng kiến sự hài hòa kiến trúc sâu sắc đến vậy. Onsen riêng tư giữa rừng tre mang đến sự tĩnh tâm sâu sắc nhất mà tôi từng trải nghiệm.', date: 'Tháng 9, 2026' },
  { id: 'test-3', author: 'Claire de Montmirail', title: 'Nhà sử học Nghệ thuật', location: 'Paris, Pháp', stayName: 'The Alpine Glass Chalet', rating: 5, quote: 'Thức dậy với đỉnh Matterhorn tắm trong ánh sáng rực rỡ của dãy núi cao mà không có một bóng người. Đội ngũ trợ lý của Aurelle xử lý từng chi tiết nhỏ bằng sự duyên dáng và thanh lịch.', date: 'Tháng 1, 2026' }
];

export const getAurelleData = (lang: string) => {
  const isVi = lang.startsWith('vi');
  return {
    FEATURED_STAYS: isVi ? FEATURED_STAYS_VI : FEATURED_STAYS_EN,
    COLLECTIONS: isVi ? COLLECTIONS_VI : COLLECTIONS_EN,
    TESTIMONIALS: isVi ? TESTIMONIALS_VI : TESTIMONIALS_EN,
  };
};

export const FEATURED_STAYS = FEATURED_STAYS_EN;
export const COLLECTIONS = COLLECTIONS_EN;
export const TESTIMONIALS = TESTIMONIALS_EN;
