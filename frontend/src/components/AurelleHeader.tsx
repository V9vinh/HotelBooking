import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

interface AurelleHeaderProps {
  onFindStayClick: () => void;
  onAuthClick?: () => void;
}

export const AurelleHeader: React.FC<AurelleHeaderProps> = ({ onFindStayClick, onAuthClick }) => {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          transition: 'all 0.35s ease',
          backgroundColor: isScrolled ? 'rgba(247, 243, 235, 0.95)' : 'rgba(247, 243, 235, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: isScrolled ? '1px solid #E6DFD3' : '1px solid transparent',
          boxShadow: isScrolled ? '0 8px 24px rgba(24, 53, 47, 0.05)' : 'none',
        }}
      >
        <div
          className="container-luxe"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '80px',
          }}
        >
          {/* Brand Wordmark */}
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '22px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: 'var(--color-forest)',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--color-champagne)',
                borderRadius: '50%',
                display: 'inline-block',
              }}
            />
            AURELLE STAYS
          </a>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '36px',
            }}
            className="desktop-nav"
          >
            <button
              onClick={() => scrollToSection('destinations')}
              style={{
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-charcoal)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-champagne)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-charcoal)')}
            >
              {t('nav.destinations')}
            </button>
            <button
              onClick={() => scrollToSection('collections')}
              style={{
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-charcoal)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-champagne)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-charcoal)')}
            >
              {t('nav.collections')}
            </button>
            <button
              onClick={() => scrollToSection('special-offers')}
              style={{
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-charcoal)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-champagne)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-charcoal)')}
            >
              {t('nav.offers')}
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              style={{
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-charcoal)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-champagne)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-charcoal)')}
            >
              {t('nav.experience')}
            </button>
          </nav>

          {/* Right Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi')}
              style={{
                background: 'transparent',
                border: '1px solid var(--color-champagne)',
                padding: '4px 8px',
                borderRadius: '4px',
                color: 'var(--color-forest)',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>language</span>
              {i18n.language === 'vi' ? 'EN' : 'VI'}
            </button>
            <button
              onClick={onAuthClick}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-forest)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                person
              </span>
              {isAuthenticated ? user?.tenDangNhap : t('header.signIn')}
            </button>
            <button
              onClick={onFindStayClick}
              className="btn-gold"
              style={{
                padding: '10px 22px',
                fontSize: '13px',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                calendar_today
              </span>
              {t('header.findStay')}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger"
              aria-label="Toggle navigation drawer"
              style={{
                display: 'none',
                padding: '8px',
                color: 'var(--color-forest)',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 49,
            backgroundColor: 'rgba(24, 53, 47, 0.4)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              position: 'absolute',
              top: '80px',
              left: 0,
              right: 0,
              backgroundColor: 'var(--color-ivory)',
              borderBottom: '1px solid var(--color-border-hairline)',
              padding: '28px 24px 36px',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => scrollToSection('destinations')}
              style={{
                textAlign: 'left',
                fontSize: '16px',
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-forest)',
                padding: '8px 0',
                borderBottom: '1px solid #ECE6DB',
              }}
            >
              {t('nav.destinations')}
            </button>
            <button
              onClick={() => scrollToSection('collections')}
              style={{
                textAlign: 'left',
                fontSize: '16px',
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-forest)',
                padding: '8px 0',
                borderBottom: '1px solid #ECE6DB',
              }}
            >
              {t('nav.collections')}
            </button>
            <button
              onClick={() => scrollToSection('special-offers')}
              style={{
                textAlign: 'left',
                fontSize: '16px',
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-forest)',
                padding: '8px 0',
                borderBottom: '1px solid #ECE6DB',
              }}
            >
              {t('nav.offers')}
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              style={{
                textAlign: 'left',
                fontSize: '16px',
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-forest)',
                padding: '8px 0',
                borderBottom: '1px solid #ECE6DB',
              }}
            >
              {t('nav.experience')}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onFindStayClick();
              }}
              className="btn-gold"
              style={{ marginTop: '12px', width: '100%' }}
            >
              {t('header.findStay')}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};
