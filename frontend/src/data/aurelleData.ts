import type { HotelStay, CollectionCategory, Testimonial } from '../types/aurelle';

const FEATURED_STAYS_EN: HotelStay[] = [
  {
    id: '1',
    title: 'Deluxe City View',
    subtitle: 'Panoramic City Views',
    location: 'Ho Chi Minh City',
    country: 'Vietnam',
    collection: 'Rooms',
    pricePerNight: 2500000,
    rating: 4.90,
    reviewsCount: 120,
    imageUrl: '/images/rooms/r1_1.jpg',
    gallery: [
      '/images/rooms/r1_1.jpg',
      '/images/rooms/r1_2.jpg',
      '/images/rooms/r1_3.jpg'
    ],
    specs: { guests: 2, bedrooms: 1, bathrooms: 1, areaSqFt: 480, hasInfinityPool: false, hasPrivateButler: false },
    description: 'A 45 sqm Deluxe Room offering sweeping views of downtown Ho Chi Minh City. Designed with a Warm Ivory and Forest Green palette.',
    amenities: ['Wi-Fi', 'Smart TV 55"', 'Bathtub', 'Nespresso Coffee Machine'],
    highlights: ['City skyline views', 'Luxurious bedding']
  },
  {
    id: '2',
    title: 'Premium Signature Suite',
    subtitle: 'Executive Luxury',
    location: 'Ho Chi Minh City',
    country: 'Vietnam',
    collection: 'Suites',
    pricePerNight: 4500000,
    rating: 4.98,
    reviewsCount: 85,
    imageUrl: '/images/rooms/r2_1.jpg',
    gallery: [
      '/images/rooms/r2_1.jpg',
      '/images/rooms/r2_2.jpg',
      '/images/rooms/r2_3.jpg'
    ],
    specs: { guests: 2, bedrooms: 1, bathrooms: 1, areaSqFt: 915, hasInfinityPool: false, hasPrivateButler: false },
    description: 'An 85 sqm Premium Suite overlooking the Saigon River and Landmark 81. Includes exclusive Executive Lounge access.',
    amenities: ['Executive Lounge', 'Wi-Fi', 'Smart TV 65"', 'Jacuzzi Bathtub', 'Artisan Lotus Tea'],
    highlights: ['Panoramic river views', 'Executive Lounge access']
  },
  {
    id: '3',
    title: 'Family Connecting Room',
    subtitle: 'Spacious Family Comfort',
    location: 'Ho Chi Minh City',
    country: 'Vietnam',
    collection: 'Family',
    pricePerNight: 5200000,
    rating: 4.95,
    reviewsCount: 64,
    imageUrl: '/images/rooms/r3_1.jpg',
    gallery: [
      '/images/rooms/r3_1.jpg',
      '/images/rooms/r3_2.jpg',
      '/images/rooms/r3_3.jpg'
    ],
    specs: { guests: 4, bedrooms: 2, bathrooms: 2, areaSqFt: 960, hasInfinityPool: false, hasPrivateButler: false },
    description: 'A 90 sqm connecting room ideal for families, offering privacy while keeping everyone together.',
    amenities: ['Wi-Fi', '2 Smart TVs', '2 Bathrooms', 'Private Dining Area'],
    highlights: ['Ideal for families', 'Spacious layout']
  },
  {
    id: '4',
    title: 'Executive River View',
    subtitle: 'Sunset Over The River',
    location: 'Ho Chi Minh City',
    country: 'Vietnam',
    collection: 'Rooms',
    pricePerNight: 3200000,
    rating: 4.92,
    reviewsCount: 45,
    imageUrl: '/images/rooms/r4_1.jpg',
    gallery: [
      '/images/rooms/r4_1.jpg',
      '/images/rooms/r4_2.jpg',
      '/images/rooms/r4_3.jpg'
    ],
    specs: { guests: 2, bedrooms: 1, bathrooms: 1, areaSqFt: 590, hasInfinityPool: false, hasPrivateButler: false },
    description: 'Located on high floors, this 55 sqm Executive Room offers breathtaking sunset views over the Saigon River.',
    amenities: ['Executive Lounge', 'Complimentary Minibar', 'Turndown Service'],
    highlights: ['Stunning sunset views', 'High floor location']
  },
  {
    id: '5',
    title: 'The Imperial Haven Presidential Suite',
    subtitle: 'The Ultimate Luxury',
    location: 'Ho Chi Minh City',
    country: 'Vietnam',
    collection: 'Suites',
    pricePerNight: 15000000,
    rating: 5.0,
    reviewsCount: 12,
    imageUrl: '/images/rooms/r5_1.jpg',
    gallery: [
      '/images/rooms/r5_1.jpg',
      '/images/rooms/r5_2.jpg',
      '/images/rooms/r5_3.jpg'
    ],
    specs: { guests: 4, bedrooms: 2, bathrooms: 2, areaSqFt: 2690, hasInfinityPool: false, hasPrivateButler: true },
    description: 'The pinnacle of luxury. A 250 sqm Presidential Suite with bespoke furniture, delivering a royal experience in the heart of Saigon.',
    amenities: ['24/7 Private Butler', 'Private Kitchen', 'Private Meeting Room', 'Airport Transfer'],
    highlights: ['250 sqm of pure luxury', 'Private butler service']
  }
];

const COLLECTIONS_EN: CollectionCategory[] = [
  { id: 'Rooms', title: 'Premium Rooms', description: 'Elegant rooms offering stunning city and river views.', count: 12, imageUrl: '/images/rooms/r1_1.jpg' },
  { id: 'Suites', title: 'Luxury Suites', description: 'Spacious suites with exclusive Executive Lounge privileges.', count: 5, imageUrl: '/images/rooms/r2_1.jpg' },
  { id: 'Family', title: 'Family Rooms', description: 'Connecting rooms designed for perfect family getaways.', count: 3, imageUrl: '/images/rooms/r3_1.jpg' }
];

const TESTIMONIALS_EN: Testimonial[] = [
  { id: 'test-1', author: 'Elena & Marcus Vance', title: 'Design Director & Architect', location: 'London, UK', stayName: 'Premium Signature Suite', rating: 5, quote: 'The Imperial Haven Ho Chi Minh curated our entire weekend with effortless discretion. The architecture, the river view, and the stillness of the suite are burned into our memories.', date: 'August 2026' },
  { id: 'test-2', author: 'Kenji Takahashi', title: 'Venture Partner', location: 'San Francisco, CA', stayName: 'The Imperial Haven Presidential Suite', rating: 5, quote: 'In twenty years of luxury travel, rarely have I witnessed such profound architectural harmony in a bustling city. The private butler service was impeccable.', date: 'September 2026' },
  { id: 'test-3', author: 'Claire de Montmirail', title: 'Art Historian', location: 'Paris, France', stayName: 'Deluxe City View', rating: 5, quote: 'Waking up to the Saigon skyline bathed in golden dawn light was magical. The Imperial Haven’s concierge team handled every minute detail with grace and elegance.', date: 'January 2026' }
];

const FEATURED_STAYS_VI: HotelStay[] = [
  {
    id: '1',
    title: 'Deluxe City View',
    subtitle: 'Tầm nhìn toàn cảnh thành phố',
    location: 'Hồ Chí Minh',
    country: 'Việt Nam',
    collection: 'Rooms',
    pricePerNight: 2500000,
    rating: 4.90,
    reviewsCount: 120,
    imageUrl: '/images/rooms/r1_1.jpg',
    gallery: [
      '/images/rooms/r1_1.jpg',
      '/images/rooms/r1_2.jpg',
      '/images/rooms/r1_3.jpg'
    ],
    specs: { guests: 2, bedrooms: 1, bathrooms: 1, areaSqFt: 480, hasInfinityPool: false, hasPrivateButler: false },
    description: 'Phòng Deluxe rộng 45m2 với tầm nhìn toàn cảnh trung tâm thành phố. Thiết kế sang trọng với tông màu Warm Ivory và điểm nhấn Forest Green.',
    amenities: ['Wi-Fi', 'Smart TV 55"', 'Bồn tắm nằm', 'Máy pha cà phê Nespresso'],
    highlights: ['Tầm nhìn tuyệt đẹp ra trung tâm thành phố', 'Nội thất sang trọng']
  },
  {
    id: '2',
    title: 'Premium Signature Suite',
    subtitle: 'Đặc quyền thượng lưu',
    location: 'Hồ Chí Minh',
    country: 'Việt Nam',
    collection: 'Suites',
    pricePerNight: 4500000,
    rating: 4.98,
    reviewsCount: 85,
    imageUrl: '/images/rooms/r2_1.jpg',
    gallery: [
      '/images/rooms/r2_1.jpg',
      '/images/rooms/r2_2.jpg',
      '/images/rooms/r2_3.jpg'
    ],
    specs: { guests: 2, bedrooms: 1, bathrooms: 1, areaSqFt: 915, hasInfinityPool: false, hasPrivateButler: false },
    description: 'Suite cao cấp 85m2 với tầm nhìn bao quát Sông Sài Gòn và Landmark 81. Đặc quyền sử dụng Executive Lounge.',
    amenities: ['Executive Lounge', 'Wi-Fi', 'Smart TV 65"', 'Bồn tắm jacuzzi', 'Trà sen thủ công'],
    highlights: ['Tầm nhìn bao quát Sông Sài Gòn', 'Đặc quyền Executive Lounge']
  },
  {
    id: '3',
    title: 'Family Connecting Room',
    subtitle: 'Không gian gia đình rộng rãi',
    location: 'Hồ Chí Minh',
    country: 'Việt Nam',
    collection: 'Family',
    pricePerNight: 5200000,
    rating: 4.95,
    reviewsCount: 64,
    imageUrl: '/images/rooms/r3_1.jpg',
    gallery: [
      '/images/rooms/r3_1.jpg',
      '/images/rooms/r3_2.jpg',
      '/images/rooms/r3_3.jpg'
    ],
    specs: { guests: 4, bedrooms: 2, bathrooms: 2, areaSqFt: 960, hasInfinityPool: false, hasPrivateButler: false },
    description: 'Phòng thông nhau lý tưởng cho gia đình, rộng 90m2. Thiết kế linh hoạt mang lại sự riêng tư nhưng vẫn gắn kết.',
    amenities: ['Wi-Fi', '2 Smart TV', '2 Phòng tắm', 'Khu vực ăn uống riêng'],
    highlights: ['Thiết kế lý tưởng cho gia đình', 'Không gian rộng rãi, thoải mái']
  },
  {
    id: '4',
    title: 'Executive River View',
    subtitle: 'Hoàng hôn trên Sông Sài Gòn',
    location: 'Hồ Chí Minh',
    country: 'Việt Nam',
    collection: 'Rooms',
    pricePerNight: 3200000,
    rating: 4.92,
    reviewsCount: 45,
    imageUrl: '/images/rooms/r4_1.jpg',
    gallery: [
      '/images/rooms/r4_1.jpg',
      '/images/rooms/r4_2.jpg',
      '/images/rooms/r4_3.jpg'
    ],
    specs: { guests: 2, bedrooms: 1, bathrooms: 1, areaSqFt: 590, hasInfinityPool: false, hasPrivateButler: false },
    description: 'Nằm trên các tầng cao, phòng Executive 55m2 mang đến khung cảnh hoàng hôn tuyệt đẹp trên sông Sài Gòn.',
    amenities: ['Executive Lounge', 'Minibar miễn phí', 'Dịch vụ chỉnh trang phòng'],
    highlights: ['Tầm nhìn hoàng hôn tuyệt đẹp', 'Vị trí tầng cao yên tĩnh']
  },
  {
    id: '5',
    title: 'The Imperial Haven Presidential Suite',
    subtitle: 'Biểu tượng của sự xa hoa',
    location: 'Hồ Chí Minh',
    country: 'Việt Nam',
    collection: 'Suites',
    pricePerNight: 15000000,
    rating: 5.0,
    reviewsCount: 12,
    imageUrl: '/images/rooms/r5_1.jpg',
    gallery: [
      '/images/rooms/r5_1.jpg',
      '/images/rooms/r5_2.jpg',
      '/images/rooms/r5_3.jpg'
    ],
    specs: { guests: 4, bedrooms: 2, bathrooms: 2, areaSqFt: 2690, hasInfinityPool: false, hasPrivateButler: true },
    description: 'Biểu tượng của sự xa hoa, Suite Tổng thống rộng 250m2 với nội thất độc bản, mang đến trải nghiệm hoàng gia giữa lòng Sài Gòn.',
    amenities: ['Quản gia riêng 24/7', 'Bếp riêng', 'Phòng họp riêng', 'Đưa đón sân bay'],
    highlights: ['Trải nghiệm hoàng gia độc bản', 'Dịch vụ quản gia riêng tận tâm']
  }
];

const COLLECTIONS_VI: CollectionCategory[] = [
  { id: 'Rooms', title: 'Phòng Cao Cấp', description: 'Các hạng phòng thanh lịch với tầm nhìn tuyệt đẹp ra thành phố và sông Sài Gòn.', count: 12, imageUrl: '/images/rooms/r1_1.jpg' },
  { id: 'Suites', title: 'Suite Thượng Hạng', description: 'Không gian rộng rãi với đặc quyền độc quyền tại Executive Lounge.', count: 5, imageUrl: '/images/rooms/r2_1.jpg' },
  { id: 'Family', title: 'Phòng Gia Đình', description: 'Thiết kế thông nhau mang lại sự gắn kết trọn vẹn cho kỷ nghỉ gia đình.', count: 3, imageUrl: '/images/rooms/r3_1.jpg' }
];

const TESTIMONIALS_VI: Testimonial[] = [
  { id: 'test-1', author: 'Elena & Marcus Vance', title: 'Giám đốc thiết kế', location: 'London, Anh', stayName: 'Premium Signature Suite', rating: 5, quote: 'The Imperial Haven Ho Chi Minh mang đến một trải nghiệm nghỉ dưỡng hoàn hảo giữa lòng đô thị. Tầm nhìn ra sông Sài Gòn từ Suite thực sự khó quên.', date: 'Tháng 8, 2026' },
  { id: 'test-2', author: 'Kenji Takahashi', title: 'Đối tác Đầu tư', location: 'San Francisco, Mỹ', stayName: 'The Imperial Haven Presidential Suite', rating: 5, quote: 'Một ốc đảo tĩnh lặng và xa hoa đáng kinh ngạc giữa Sài Gòn nhộn nhịp. Dịch vụ quản gia riêng chuyên nghiệp đến mức hoàn hảo.', date: 'Tháng 9, 2026' },
  { id: 'test-3', author: 'Claire de Montmirail', title: 'Nhà sử học Nghệ thuật', location: 'Paris, Pháp', stayName: 'Deluxe City View', rating: 5, quote: 'Thức dậy cùng ánh bình minh chiếu rọi qua những tòa nhà chọc trời của Sài Gòn. Đội ngũ The Imperial Haven đã chăm chút từng chi tiết nhỏ nhất.', date: 'Tháng 1, 2026' }
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
