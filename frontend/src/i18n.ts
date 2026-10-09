import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        destinations: 'Destinations',
        collections: 'Collections',
        offers: 'Special Offers',
        experience: 'The Experience'
      },
      header: {
        findStay: 'Find a Stay'
      },
      hero: {
        tag: 'Curated Resort Sanctuaries',
        title: 'Find Your Own Paradise.',
        subtitle: 'Curated private villas, coastal retreats, and alpine pavilions designed for effortless stillness, architectural wonder, and bespoke hospitality.',
        exploreBtn: 'Explore Destinations'
      },
      search: {
        where: 'Destination',
        dates: 'Dates',
        datesPh: 'Check in - Check out',
        guests: 'Guests',
        searchBtn: 'Find a Stay',
        searching: 'Searching...',
        options: {
          destinations: {
            all: 'All Sanctuaries (Global)',
            amalfi: 'Amalfi Coast, Italy',
            kyoto: 'Arashiyama, Kyoto, Japan',
            stbarts: 'St. Barts, French West Indies',
            zermatt: 'Zermatt, Switzerland'
          },
          guests: {
            g1: '1 Guest (Solo Sanctuary)',
            g2: '2 Guests (Couples Retreat)',
            g4: '4 Guests (Family Suite)',
            g6: '6 Guests (Private Villa)',
            g8: '8+ Guests (Estate Buyout)'
          }
        }
      },
      featured: {
        tag: 'Handcrafted Hospitality',
        title: 'Featured Sanctuaries',
        resetFilter: 'Reset Filter',
        showing: 'Showing',
        curatedStays: 'curated stays',
        guests: 'Guests',
        suites: 'Suites',
        sqft: 'sq ft',
        from: 'From',
        night: '/ night',
        viewDetails: 'View Details'
      },
      collections: {
        tag: 'Curated Geographies',
        title: 'Explore Collections',
        subtitle: 'Filter our global portfolio of architectural sanctuaries by topography and lifestyle.',
        privateSanctuaries: 'Private Sanctuaries',
        activeFilter: 'Active Filter ✓',
        exploreStays: 'Explore Stays'
      },
      experience: {
        tag: 'Unscripted Moments',
        title: 'The Aurelle Experience',
        subtitle: 'Our guests speak of moments that linger long after they return.',
        readMore: 'Read More Stories'
      },
      footer: {
        tag: 'AURELLE STAYS',
        description: 'Bespoke resort sanctuaries for the discerning traveler. Curated architectural stillness across the world’s most mesmerizing horizons.',
        destinations: 'Destinations',
        collectionsPolicies: 'Collections & Policies',
        journal: 'The Aurelle Journal',
        journalDesc: 'Receive our quarterly monograph on architectural travel, private previews, and unlisted stays.',
        emailPh: 'Enter your email address',
        joinBtn: 'Join Private Monograph',
        successMsg: '✓ Welcome. You are now inscribed into the Aurelle Journal private edition.',
        errorMsg: 'Please enter a valid email address.',
        copyright: '© 2026 AURELLE STAYS LTD. All rights reserved.',
        disclaimer: '*Illustrative luxury hospitality showcase. No real booking or payment processing occurs.*'
      },
      footerLinks: {
        destinations: [
          'Amalfi Coast, Italy',
          'Arashiyama, Kyoto, Japan',
          'St. Barts, French West Indies',
          'Zermatt, Swiss Alps',
          'Santorini, Cyclades'
        ],
        policies: [
          'Beachfront Havens',
          'Alpine & Cedar Pavilions',
          'Private Island Buyouts',
          'Cancellation & Discretion',
          'Private Aviation Services'
        ]
      },
      modal: {
        capacity: 'Capacity',
        upTo: 'Up to',
        guests: 'Guests',
        bedrooms: 'Bedrooms',
        suites: 'Luxury Suites',
        bathrooms: 'Bathrooms',
        baths: 'Marble Baths',
        livingSpace: 'Living Space',
        sqft: 'sq ft',
        overview: 'Estate Overview',
        inclusions: 'Signature Inclusions',
        reserve: 'Reserve This Sanctuary',
        demoNote: '*UI Demo Simulation — No real payment required*',
        duration: 'Duration:',
        nights: 'Nights',
        total: 'Total:',
        success: 'Inquiry submitted! Our bespoke concierge will prepare your private itinerary for {{stay}} within 2 hours.',
        requestBtn: 'Request Sanctuary Reservation'
      }
    }
  },
  vi: {
    translation: {
      nav: {
        destinations: 'Điểm đến',
        collections: 'Bộ sưu tập',
        offers: 'Ưu đãi',
        experience: 'Trải nghiệm'
      },
      header: {
        findStay: 'Tìm phòng'
      },
      hero: {
        tag: 'Nơi Trú Ẩn Được Tuyển Chọn',
        title: 'Tìm chốn bình yên cho riêng bạn.',
        subtitle: 'Khám phá bộ sưu tập chọn lọc gồm những khu nghỉ dưỡng độc quyền, biệt thự riêng tư và những nơi trú ẩn thanh bình trên toàn thế giới.',
        exploreBtn: 'Khám phá Điểm đến'
      },
      search: {
        where: 'Điểm đến',
        dates: 'Ngày đi - Ngày về',
        datesPh: 'Nhận phòng - Trả phòng',
        guests: 'Số khách',
        searchBtn: 'Tìm phòng',
        searching: 'Đang tìm...',
        options: {
          destinations: {
            all: 'Tất cả khu nghỉ dưỡng (Toàn cầu)',
            amalfi: 'Bờ biển Amalfi, Ý',
            kyoto: 'Arashiyama, Kyoto, Nhật Bản',
            stbarts: 'St. Barts, Tây Ấn thuộc Pháp',
            zermatt: 'Zermatt, Thụy Sĩ'
          },
          guests: {
            g1: '1 Khách (Trú ẩn cá nhân)',
            g2: '2 Khách (Kỳ nghỉ cặp đôi)',
            g4: '4 Khách (Phòng Suite gia đình)',
            g6: '6 Khách (Biệt thự riêng)',
            g8: '8+ Khách (Bao trọn khu)'
          }
        }
      },
      featured: {
        tag: 'Dịch vụ Đẳng cấp',
        title: 'Nơi lưu trú nổi bật',
        resetFilter: 'Xóa bộ lọc',
        showing: 'Hiển thị',
        curatedStays: 'nơi lưu trú',
        guests: 'Khách',
        suites: 'Phòng Suite',
        sqft: 'm²',
        from: 'Từ',
        night: '/ đêm',
        viewDetails: 'Xem chi tiết'
      },
      collections: {
        tag: 'Địa lý Đặc trưng',
        title: 'Bộ sưu tập chọn lọc',
        subtitle: 'Khám phá những điểm dừng chân được thiết kế riêng cho hành trình tìm kiếm sự tĩnh lặng và phiêu lưu của bạn.',
        privateSanctuaries: 'Khu nghỉ dưỡng riêng',
        activeFilter: 'Bộ lọc đang bật ✓',
        exploreStays: 'Khám phá'
      },
      experience: {
        tag: 'Những Khoảnh Khắc Đáng Nhớ',
        title: 'Trải nghiệm cùng Aurelle',
        subtitle: 'Khách hàng của chúng tôi kể về những khoảnh khắc đọng lại mãi sau chuyến đi.',
        readMore: 'Đọc thêm câu chuyện'
      },
      footer: {
        tag: 'AURELLE STAYS',
        description: 'Tuyển chọn những nơi trú ẩn tinh tế và biệt lập nhất thế giới cho du khách hiện đại tìm kiếm sự tĩnh lặng sâu sắc.',
        destinations: 'Điểm đến',
        collectionsPolicies: 'Bộ sưu tập & Chính sách',
        journal: 'Tạp chí Aurelle',
        journalDesc: 'Nhận ấn phẩm hàng quý của chúng tôi về du lịch kiến trúc, quyền xem trước và các kỳ nghỉ không được niêm yết.',
        emailPh: 'Nhập địa chỉ email của bạn',
        joinBtn: 'Tham gia Ấn phẩm Riêng tư',
        successMsg: '✓ Chào mừng. Bạn đã được đăng ký vào phiên bản riêng tư của Tạp chí Aurelle.',
        errorMsg: 'Vui lòng nhập địa chỉ email hợp lệ.',
        copyright: '© 2026 AURELLE STAYS LTD. Đã đăng ký Bản quyền.',
        disclaimer: '*Giao diện mô phỏng dịch vụ lưu trú cao cấp. Không có giao dịch đặt phòng hoặc thanh toán thực tế nào diễn ra.*'
      },
      footerLinks: {
        destinations: [
          'Bờ biển Amalfi, Ý',
          'Arashiyama, Kyoto, Nhật Bản',
          'St. Barts, Tây Ấn thuộc Pháp',
          'Zermatt, Thụy Sĩ',
          'Santorini, Hy Lạp'
        ],
        policies: [
          'Khu nghỉ dưỡng sát biển',
          'Biệt thự trên núi & Rừng thông',
          'Bao trọn đảo riêng',
          'Chính sách hủy & Bảo mật',
          'Dịch vụ Hàng không Cá nhân'
        ]
      },
      modal: {
        capacity: 'Sức chứa',
        upTo: 'Lên đến',
        guests: 'Khách',
        bedrooms: 'Phòng ngủ',
        suites: 'Phòng Suite cao cấp',
        bathrooms: 'Phòng tắm',
        baths: 'Phòng tắm cẩm thạch',
        livingSpace: 'Không gian sống',
        sqft: 'm²',
        overview: 'Tổng quan khu nghỉ dưỡng',
        inclusions: 'Tiện nghi đặc quyền',
        reserve: 'Đặt khu nghỉ dưỡng này',
        demoNote: '*Giao diện mô phỏng — Không yêu cầu thanh toán thực*',
        duration: 'Thời gian:',
        nights: 'Đêm',
        total: 'Tổng cộng:',
        success: 'Yêu cầu đã được gửi! Đội ngũ trợ lý riêng của chúng tôi sẽ chuẩn bị lịch trình cá nhân cho {{stay}} trong vòng 2 giờ.',
        requestBtn: 'Yêu cầu đặt phòng'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
