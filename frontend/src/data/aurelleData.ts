import type { HotelStay, CollectionCategory, Testimonial } from '../types/aurelle';

const FEATURED_STAYS_EN: HotelStay[] = [
  {
    id: 'stay-1',
    title: 'InterContinental Danang Sun Peninsula',
    subtitle: 'Luxury Resort & Spa in Monkey Mountain',
    location: 'Da Nang',
    country: 'Vietnam',
    collection: 'Beach Escapes',
    pricePerNight: 8500000,
    rating: 4.98,
    reviewsCount: 38,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: { guests: 2, bedrooms: 1, bathrooms: 1, areaSqFt: 750, hasInfinityPool: true, hasPrivateButler: true },
    description: 'Designed by Bill Bensley, this multi-award winning resort cascades down the jungle-clad Son Tra Peninsula, featuring private beach access and exquisite dining experiences like La Maison 1888.',
    amenities: ['Private Beach', 'Infinity Pool', 'La Maison 1888', 'HARNN Heritage Spa', 'Cable Car (Nam Tram)', 'Kids Club'],
    highlights: ['Breathtaking ocean views', 'Unique architecture blending Vietnamese myth and luxury', 'Michelin-starred chef dining']
  },
  {
    id: 'stay-2',
    title: 'JW Marriott Phu Quoc Emerald Bay',
    subtitle: 'Lamarck University Themed Resort',
    location: 'Phu Quoc',
    country: 'Vietnam',
    collection: 'Beach Escapes',
    pricePerNight: 7200000,
    rating: 4.96,
    reviewsCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: { guests: 4, bedrooms: 2, bathrooms: 2, areaSqFt: 1200, hasInfinityPool: false, hasPrivateButler: false },
    description: 'Step back in time to the mythical Lamarck University. Located on the pristine Khem Beach, this whimsical resort features uniquely themed departments, a seashell-shaped pool, and unparalleled luxury.',
    amenities: ['Khem Beach Access', 'Chanterelle Spa', 'Shell Pool', 'Chemistry Bar', 'French Bakery', 'Water Sports'],
    highlights: ['Unique university-themed architecture', 'Crystal clear waters of Emerald Bay', 'Exceptional Alice in Wonderland inspired spa']
  },
  {
    id: 'stay-3',
    title: 'Topas Ecolodge Sapa',
    subtitle: 'Mountain Retreat Above the Clouds',
    location: 'Sapa',
    country: 'Vietnam',
    collection: 'Mountain Retreats',
    pricePerNight: 5500000,
    rating: 4.99,
    reviewsCount: 29,
    imageUrl: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: { guests: 2, bedrooms: 1, bathrooms: 1, areaSqFt: 450, hasInfinityPool: true, hasPrivateButler: false },
    description: 'Situated on a beautiful hilltop deep in the mountains of Hoang Lien National Park, Topas Ecolodge boasts stunning infinity pools overlooking terraced rice fields and offers a true escape from modern life.',
    amenities: ['Heated Infinity Pool', 'Rice Terrace Views', 'Red Dao Herbal Bath', 'Stilt House Restaurant', 'Mountain Biking', 'Trekking Tours'],
    highlights: ['Voted top eco-lodge by National Geographic', 'Stunning panoramic mountain and valley views', 'Sustainable and eco-friendly practices']
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
    title: 'InterContinental Danang Sun Peninsula',
    subtitle: 'Khu nghỉ dưỡng & Spa sang trọng trên núi Sơn Trà',
    location: 'Đà Nẵng',
    country: 'Việt Nam',
    collection: 'Beach Escapes',
    pricePerNight: 8500000,
    rating: 4.98,
    reviewsCount: 38,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: { guests: 2, bedrooms: 1, bathrooms: 1, areaSqFt: 750, hasInfinityPool: true, hasPrivateButler: true },
    description: 'Được thiết kế bởi Bill Bensley, khu nghỉ dưỡng từng đoạt nhiều giải thưởng này nằm thoai thoải trên Bán đảo Sơn Trà ngợp bóng cây, với bãi biển riêng và trải nghiệm ẩm thực tinh tế như nhà hàng La Maison 1888.',
    amenities: ['Bãi biển riêng', 'Hồ bơi vô cực', 'Nhà hàng La Maison 1888', 'HARNN Heritage Spa', 'Tàu hỏa leo núi Nam Tram', 'Câu lạc bộ trẻ em'],
    highlights: ['Tầm nhìn ngoạn mục ra đại dương', 'Kiến trúc độc đáo kết hợp huyền thoại Việt Nam và sự sang trọng', 'Trải nghiệm ăn tối với đầu bếp sao Michelin']
  },
  {
    id: 'stay-2',
    title: 'JW Marriott Phu Quoc Emerald Bay',
    subtitle: 'Khu nghỉ dưỡng chủ đề Đại học Lamarck',
    location: 'Phú Quốc',
    country: 'Việt Nam',
    collection: 'Beach Escapes',
    pricePerNight: 7200000,
    rating: 4.96,
    reviewsCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: { guests: 4, bedrooms: 2, bathrooms: 2, areaSqFt: 1200, hasInfinityPool: false, hasPrivateButler: false },
    description: 'Trở về quá khứ với trường đại học Lamarck huyền thoại. Tọa lạc trên bãi Khem tuyệt đẹp, khu nghỉ dưỡng độc đáo này mang chủ đề các khoa học kỳ thú, hồ bơi hình con sò và sự xa hoa không gì sánh bằng.',
    amenities: ['Bãi biển Khem', 'Chanterelle Spa', 'Hồ bơi hình con sò', 'Quầy bar Hóa học', 'Tiệm bánh Pháp', 'Thể thao dưới nước'],
    highlights: ['Kiến trúc chủ đề đại học độc đáo', 'Làn nước trong vắt của vịnh Ngọc lục bảo', 'Spa lấy cảm hứng từ Alice in Wonderland']
  },
  {
    id: 'stay-3',
    title: 'Topas Ecolodge Sapa',
    subtitle: 'Nơi ẩn mình trên những tầng mây',
    location: 'Sapa',
    country: 'Việt Nam',
    collection: 'Mountain Retreats',
    pricePerNight: 5500000,
    rating: 4.99,
    reviewsCount: 29,
    imageUrl: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: { guests: 2, bedrooms: 1, bathrooms: 1, areaSqFt: 450, hasInfinityPool: true, hasPrivateButler: false },
    description: 'Nằm trên một đỉnh đồi tuyệt đẹp sâu trong dãy núi của Vườn quốc gia Hoàng Liên, Topas Ecolodge tự hào với những hồ bơi vô cực ngắm nhìn những thửa ruộng bậc thang, mang đến một lối thoát thực sự khỏi nhịp sống hiện đại.',
    amenities: ['Hồ bơi vô cực nước ấm', 'Tầm nhìn ruộng bậc thang', 'Tắm lá thuốc người Dao Đỏ', 'Nhà hàng nhà sàn', 'Đạp xe leo núi', 'Tour đi bộ leo núi'],
    highlights: ['Được National Geographic bình chọn là khu nghỉ dưỡng sinh thái hàng đầu', 'Tầm nhìn toàn cảnh thung lũng ngoạn mục', 'Thực hành bền vững và thân thiện với môi trường']
  },
  {
    id: 'stay-4',
    title: 'Biệt thự kính The Alpine',
    subtitle: 'Khung cảnh Sông băng & Ấm áp Gỗ',
    location: 'Zermatt',
    country: 'Thụy Sĩ',
    collection: 'Mountain Retreats',
    pricePerNight: 24500000,
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
