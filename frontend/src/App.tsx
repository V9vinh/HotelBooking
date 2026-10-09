import { useState, useEffect } from 'react';
import { AurelleHeader } from './components/AurelleHeader';
import { AurelleHero } from './components/AurelleHero';
import { AurelleBookingBar } from './components/AurelleBookingBar';
import { AurelleFeaturedStays } from './components/AurelleFeaturedStays';
import { AurelleCollections } from './components/AurelleCollections';
import { AurelleExperience } from './components/AurelleExperience';
import { AurelleDetailModal } from './components/AurelleDetailModal';
import { AurelleFooter } from './components/AurelleFooter';
import { getAurelleData } from './data/aurelleData';
import { useTranslation } from 'react-i18next';
import type { HotelStay, BookingSearchQuery, CollectionType } from './types/aurelle';
import { AurelleAuthModal } from './components/AurelleAuthModal';
import { AurelleProfile } from './components/AurelleProfile';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { i18n } = useTranslation();
  const { FEATURED_STAYS, COLLECTIONS, TESTIMONIALS } = getAurelleData(i18n.language);

  const [selectedStay, setSelectedStay] = useState<HotelStay | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<CollectionType | null>(null);
  const [searchFilter, setSearchFilter] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);
  const [dbStays, setDbStays] = useState<HotelStay[]>([]);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetch('http://localhost:8088/api/rooms/types')
      .then(res => res.json())
      .then((data: any[]) => {
        const { FEATURED_STAYS: fallbackStays } = getAurelleData(i18n.language);
        const mappedStays: HotelStay[] = data.map((room, index) => {
          const fallback = fallbackStays[index % fallbackStays.length];
          return {
            id: `room-${room.maLoaiPhong}`,
            title: room.tenLoaiPhong,
            subtitle: fallback.subtitle,
            location: fallback.location, // fallback since DB doesn't have it
            country: fallback.country,
            pricePerNight: i18n.language.startsWith('vi') ? room.giaCoBan * 25000 : room.giaCoBan,
            rating: fallback.rating,
            reviewsCount: fallback.reviewsCount,
            imageUrl: fallback.imageUrl,
            gallery: fallback.gallery,
            description: room.moTa,
            collection: fallback.collection,
            amenities: room.tienNghi.split(',').map((s: string) => s.trim()),
            highlights: fallback.highlights,
            specs: {
              guests: room.sucChua,
              bedrooms: Math.max(1, Math.floor(room.sucChua / 2)),
              bathrooms: Math.max(1, Math.floor(room.sucChua / 2)),
              areaSqFt: 1000 + (room.sucChua * 200),
              hasInfinityPool: fallback.specs.hasInfinityPool,
              hasPrivateButler: fallback.specs.hasPrivateButler,
            }
          };
        });
        setDbStays(mappedStays);
      })
      .catch(err => console.error("Failed to load rooms", err));
  }, [i18n.language]);

  // Filter stays based on collection category and search destination
  const baseStays = dbStays.length > 0 ? dbStays : FEATURED_STAYS;
  const displayedStays = baseStays.filter((stay) => {
    if (selectedCollection && stay.collection !== selectedCollection) {
      return false;
    }
    if (searchFilter && !stay.location.toLowerCase().includes(searchFilter.toLowerCase()) && !stay.country.toLowerCase().includes(searchFilter.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleSearch = (query: BookingSearchQuery) => {
    setSearchLoading(true);
    setSearchFeedback(null);

    setTimeout(() => {
      setSearchLoading(false);
      if (query.destination) {
        setSearchFilter(query.destination);
        setSearchFeedback(`Found sanctuaries matching "${query.destination}" for ${query.guests} guests.`);
      } else {
        setSearchFilter(null);
        setSearchFeedback(`Showing all sanctuaries across all global destinations for ${query.guests} guests.`);
      }

      // Smooth scroll to destinations section
      const element = document.getElementById('destinations');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  const handleCollectionSelect = (cat: CollectionType) => {
    if (selectedCollection === cat) {
      setSelectedCollection(null);
    } else {
      setSelectedCollection(cat);
      const element = document.getElementById('destinations');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToBookingBar = () => {
    const element = document.getElementById('booking-bar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. STICKY HEADER */}
      <AurelleHeader 
        onFindStayClick={scrollToBookingBar} 
        onAuthClick={() => {
          if (isAuthenticated) {
            setShowProfile(true);
          } else {
            setShowAuthModal(true);
          }
        }}
      />

      {showProfile ? (
        <AurelleProfile onBack={() => setShowProfile(false)} />
      ) : (
        <>
          {/* 2. HERO SECTION */}
      <AurelleHero onExploreClick={() => {
        const element = document.getElementById('destinations');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* 3. BOOKING SEARCH BAR */}
      <AurelleBookingBar onSearch={handleSearch} isLoading={searchLoading} />

      {/* Search Feedback Notification */}
      {searchFeedback && (
        <div className="container-luxe" style={{ marginBottom: '20px' }}>
          <div
            style={{
              padding: '12px 20px',
              backgroundColor: 'var(--color-champagne-light)',
              border: '1px solid var(--color-champagne)',
              borderRadius: '6px',
              fontSize: '13px',
              color: 'var(--color-forest)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-champagne)' }}>
                info
              </span>
              <span>{searchFeedback}</span>
            </div>
            <button
              onClick={() => {
                setSearchFeedback(null);
                setSearchFilter(null);
              }}
              style={{ fontSize: '12px', textDecoration: 'underline', color: 'var(--color-forest)' }}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* 4. FEATURED STAYS */}
      <AurelleFeaturedStays
        stays={displayedStays}
        onSelectStay={(stay) => setSelectedStay(stay)}
        activeCollectionFilter={selectedCollection}
        onClearFilter={() => {
          setSelectedCollection(null);
          setSearchFilter(null);
        }}
      />

      {/* 5. EXPLORE COLLECTIONS */}
      <AurelleCollections
        collections={COLLECTIONS}
        onSelectCollection={handleCollectionSelect}
        selectedCollection={selectedCollection}
      />

      {/* 6. THE STAY EXPERIENCE */}
      <AurelleExperience testimonials={TESTIMONIALS} />

      {/* 7. FOOTER */}
      <AurelleFooter />
      </>
      )}

      {/* HOTEL DETAIL MODAL */}
      <AurelleDetailModal
        stay={selectedStay}
        onClose={() => setSelectedStay(null)}
      />

      {showAuthModal && <AurelleAuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}
