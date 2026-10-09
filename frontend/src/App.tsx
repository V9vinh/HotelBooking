import { useState } from 'react';
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

export default function App() {
  const { i18n, t } = useTranslation();
  const { FEATURED_STAYS, COLLECTIONS, TESTIMONIALS } = getAurelleData(i18n.language);

  const [selectedStay, setSelectedStay] = useState<HotelStay | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<CollectionType | null>(null);
  const [searchFilter, setSearchFilter] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);

  // Filter stays based on collection category and search destination
  const displayedStays = FEATURED_STAYS.filter((stay) => {
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
      <AurelleHeader onFindStayClick={scrollToBookingBar} />

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

      {/* HOTEL DETAIL MODAL */}
      <AurelleDetailModal
        stay={selectedStay}
        onClose={() => setSelectedStay(null)}
      />
    </div>
  );
}
