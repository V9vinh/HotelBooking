import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

interface AurelleHeaderProps {
  onFindStayClick: () => void;
  onAuthClick?: (tab?: 'profile' | 'history') => void;
  onAdminClick?: () => void;
  onHomeClick?: () => void;
  onNavClick?: (sectionId: string) => void;
}

export const AurelleHeader: React.FC<AurelleHeaderProps> = ({ onFindStayClick, onAuthClick, onAdminClick, onHomeClick, onNavClick }) => {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.user-dropdown-container')) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavClick) {
      onNavClick(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
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
            onClick={(e) => {
              e.preventDefault();
              if (onHomeClick) onHomeClick();
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
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
            <img src="/logo.png" alt="The Imperial Haven Logo" style={{ height: '36px', objectFit: 'contain' }} />
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
                letterSpacing: '0.04em',
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
                letterSpacing: '0.04em',
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
                letterSpacing: '0.04em',
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
                letterSpacing: '0.04em',
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
            {isAuthenticated && user?.vaiTro === 'Admin' && (
              <button
                onClick={onAdminClick}
                style={{
                  background: 'var(--color-champagne)',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>admin_panel_settings</span>
                Admin
              </button>
            )}
            {isAuthenticated ? (
              <div className="user-dropdown-container" style={{ position: 'relative' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserMenuOpen(!userMenuOpen);
                  }}
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
                  {user?.tenDangNhap}
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', transition: 'transform 0.2s', transform: userMenuOpen ? 'rotate(180deg)' : 'none' }}>
                    expand_more
                  </span>
                </button>
                
                {userMenuOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '12px',
                    backgroundColor: 'var(--color-ivory)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    width: '220px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    border: '1px solid var(--color-border)',
                    zIndex: 100
                  }}>
                    <button 
                      onClick={() => { setUserMenuOpen(false); if (onAuthClick) (onAuthClick as any)('profile'); }} 
                      style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid var(--color-border)', cursor: 'pointer', borderTop: 'none', borderLeft: 'none', borderRight: 'none', background: 'transparent', fontSize: '14px', color: 'var(--color-charcoal)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      Cập nhật hồ sơ cá nhân
                    </button>
                    {user?.vaiTro !== 'Admin' && (
                      <button 
                        onClick={() => { setUserMenuOpen(false); if (onAuthClick) (onAuthClick as any)('history'); }} 
                        style={{ padding: '12px 16px', textAlign: 'left', cursor: 'pointer', borderTop: '1px solid var(--color-border)', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', background: 'transparent', fontSize: '14px', color: 'var(--color-charcoal)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        Lịch sử đặt phòng
                      </button>
                    )}
                    <button 
                      onClick={() => { 
                        setUserMenuOpen(false); 
                        logout();
                        if (onHomeClick) onHomeClick();
                      }}
                      style={{ padding: '12px 16px', textAlign: 'left', cursor: 'pointer', borderTop: '1px solid var(--color-border)', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', background: 'transparent', fontSize: '14px', color: '#991B1B' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEF2F2')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => { if (onAuthClick) onAuthClick(); }}
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
                {t('header.signIn')}
              </button>
            )}
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
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-forest)',
                padding: '8px 0',
                borderBottom: '1px solid #ECE6DB',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                fontWeight: 500,
              }}
            >
              {t('nav.destinations')}
            </button>
            <button
              onClick={() => scrollToSection('collections')}
              style={{
                textAlign: 'left',
                fontSize: '16px',
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-forest)',
                padding: '8px 0',
                borderBottom: '1px solid #ECE6DB',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                fontWeight: 500,
              }}
            >
              {t('nav.collections')}
            </button>
            <button
              onClick={() => scrollToSection('special-offers')}
              style={{
                textAlign: 'left',
                fontSize: '16px',
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-forest)',
                padding: '8px 0',
                borderBottom: '1px solid #ECE6DB',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                fontWeight: 500,
              }}
            >
              {t('nav.offers')}
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              style={{
                textAlign: 'left',
                fontSize: '16px',
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-forest)',
                padding: '8px 0',
                borderBottom: '1px solid #ECE6DB',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                fontWeight: 500,
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
