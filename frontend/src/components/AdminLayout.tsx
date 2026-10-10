import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

type AdminPage = 'dashboard' | 'bookings' | 'rooms' | 'guests' | 'payments' | 'settings';

interface AdminLayoutProps {
  activePage: AdminPage;
  onNavigate: (page: AdminPage) => void;
  onExitAdmin: () => void;
  children: React.ReactNode;
}

const PAGE_LABELS: Record<AdminPage, string> = {
  dashboard: 'Dashboard',
  bookings: 'Quản lý Đặt phòng',
  rooms: 'Phòng',
  guests: 'Khách hàng',
  payments: 'Thanh toán',
  settings: 'Cài đặt',
};

const NAV_ITEMS = [
  { id: 'dashboard' as AdminPage, label: 'Dashboard', icon: 'dashboard' },
  { id: 'bookings' as AdminPage, label: 'Quản lý đặt phòng', icon: 'calendar_month' },
  { id: 'rooms' as AdminPage, label: 'Phòng', icon: 'king_bed' },
  { id: 'guests' as AdminPage, label: 'Khách hàng', icon: 'group' },
  { id: 'payments' as AdminPage, label: 'Thanh toán', icon: 'payments' },
];

export function AdminLayout({ activePage, onNavigate, onExitAdmin, children }: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    onExitAdmin();
  };

  const roleLabel = user?.vaiTro === 'Admin' ? 'Quản trị viên' : user?.vaiTro === 'QuanLy' ? 'Quản lý' : 'Lễ tân';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F7F3EB' }}>
      
      {/* ── Topbar (Full Width) ── */}
      <header style={{
        height: '64px', 
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E6DFD3',
        display: 'flex', 
        alignItems: 'center',
        padding: '0 24px', 
        gap: '16px',
        position: 'sticky', 
        top: 0, 
        zIndex: 40,
        flexShrink: 0,
      }}>
        {/* Mobile Toggle */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(p => !p)}
            style={{ 
              background: 'none', border: 'none', cursor: 'pointer', 
              color: 'var(--color-forest)', padding: '8px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '4px', transition: 'background-color 0.2s'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>menu</span>
          </button>
        )}

        {/* Brand Logo in Topbar for Mobile only (Sidebar handles desktop logo) */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/logo.png" alt="The Imperial Haven Logo" style={{ height: '24px', objectFit: 'contain' }} />
          </div>
        )}

        {/* Breadcrumb (Hidden on small mobile) */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', color: '#727976', fontFamily: 'Inter', marginLeft: sidebarOpen ? '260px' : '80px', transition: 'margin-left 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <span>Admin</span>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
            <span style={{ color: 'var(--color-forest)', fontWeight: 500 }}>{PAGE_LABELS[activePage] || 'Dashboard'}</span>
          </div>
        )}

        <div style={{ flex: 1 }} />

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#727976', display: 'flex', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-forest)'} onMouseLeave={e => e.currentTarget.style.color = '#727976'}>
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div style={{ width: '1px', height: '24px', backgroundColor: '#E6DFD3' }} />
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '6px 12px', borderRadius: '4px',
            backgroundColor: '#FDFAF4', border: '1px solid #E6DFD3'
          }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '4px',
              backgroundColor: 'var(--color-forest)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '15px', fontWeight: 600, color: '#fff', fontFamily: 'Inter'
            }}>
              {(user?.hoTen || user?.tenDangNhap || 'A').charAt(0).toUpperCase()}
            </div>
            {!isMobile && (
              <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-forest)', fontFamily: 'Inter' }}>
                {user?.hoTen || user?.tenDangNhap || 'Admin'}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ── Main Body (Sidebar + Content) ── */}
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        
        {/* Mobile Overlay Background */}
        {isMobile && sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed', top: '64px', left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(24, 53, 47, 0.4)', backdropFilter: 'blur(4px)',
              zIndex: 20
            }}
          />
        )}

        {/* ── Sidebar ── */}
        <aside
          style={{
            width: sidebarOpen ? '260px' : '80px',
            backgroundColor: '#FFFFFF',
            borderRight: '1px solid #E6DFD3',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease',
            position: 'absolute', // Absolute relative to the flex container so main content can sit next to it
            top: 0, 
            bottom: 0,
            zIndex: 30,
            transform: isMobile && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
            boxShadow: sidebarOpen ? '4px 0 24px rgba(24, 53, 47, 0.04)' : 'none',
          }}
        >
          {/* Sidebar Header Area (Logo & Toggle) */}
          <div style={{
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            padding: sidebarOpen ? '0 24px' : '0 0',
            justifyContent: sidebarOpen ? 'space-between' : 'center',
            borderBottom: '1px solid #E6DFD3',
            flexShrink: 0,
          }}>
            {/* Brand Logo & Text */}
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', 
              opacity: sidebarOpen ? 1 : 0, 
              width: sidebarOpen ? 'auto' : 0,
              overflow: 'hidden',
              transition: 'opacity 0.2s ease'
            }}>
              <img src="/logo.png" alt="The Imperial Haven Logo" style={{ height: '32px', objectFit: 'contain' }} />
            </div>

            {/* Desktop Hamburger Toggle */}
            {!isMobile && (
              <button
                onClick={() => setSidebarOpen(p => !p)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--color-forest)', padding: '6px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '4px', transition: 'background-color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(24, 53, 47, 0.05)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                  {sidebarOpen ? 'menu_open' : 'menu'}
                </span>
              </button>
            )}

            {/* Collapsed Logo (Only visible when closed on desktop) */}
            {!sidebarOpen && !isMobile && (
              <div style={{
                position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                height: '32px', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none'
              }}>
                <img src="/logo.png" alt="The Imperial Haven Logo" style={{ height: '24px', objectFit: 'contain' }} />
              </div>
            )}
          </div>

          {/* Main Navigation Group */}
          <nav style={{ flex: 1, padding: '24px 12px', overflowY: 'auto', overflowX: 'hidden' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {NAV_ITEMS.map(item => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    title={!sidebarOpen ? item.label : undefined}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      padding: sidebarOpen ? '12px 16px' : '12px 0',
                      justifyContent: sidebarOpen ? 'flex-start' : 'center',
                      backgroundColor: isActive ? 'rgba(184, 154, 104, 0.08)' : 'transparent',
                      border: 'none',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      borderRadius: '4px',
                      textAlign: 'left',
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(24, 53, 47, 0.03)'; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    {/* Active Indicator Line */}
                    {isActive && (
                      <div style={{
                        position: 'absolute',
                        left: 0, top: '15%', bottom: '15%', width: '3px',
                        backgroundColor: 'var(--color-champagne)',
                        borderRadius: '0 4px 4px 0'
                      }} />
                    )}
                    
                    <span className="material-symbols-outlined" style={{
                      fontSize: '24px',
                      color: isActive ? 'var(--color-champagne)' : '#727976',
                      flexShrink: 0,
                      transition: 'color 0.2s ease',
                      marginLeft: sidebarOpen ? (isActive ? '8px' : '11px') : '0', // Offset slightly when active line is present
                    }}>
                      {item.icon}
                    </span>
                    
                    <div style={{
                      marginLeft: '16px',
                      opacity: sidebarOpen ? 1 : 0,
                      width: sidebarOpen ? 'auto' : 0,
                      overflow: 'hidden',
                      transition: 'opacity 0.2s ease, width 0.2s ease',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontSize: '16px', 
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? 'var(--color-forest)' : '#414846',
                        fontFamily: 'Inter',
                        whiteSpace: 'nowrap',
                      }}>
                        {item.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Bottom Navigation Group */}
          <div style={{ padding: '16px 12px', borderTop: '1px solid #E6DFD3', flexShrink: 0 }}>
            <button
              onClick={() => onNavigate('settings')}
              title={!sidebarOpen ? 'Cài đặt' : undefined}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                padding: sidebarOpen ? '12px 16px' : '12px 0',
                justifyContent: sidebarOpen ? 'flex-start' : 'center',
                backgroundColor: activePage === 'settings' ? 'rgba(184, 154, 104, 0.08)' : 'transparent', 
                border: 'none', cursor: 'pointer', borderRadius: '4px',
                transition: 'all 0.2s ease', marginBottom: '8px', position: 'relative'
              }}
              onMouseEnter={e => { if (activePage !== 'settings') e.currentTarget.style.backgroundColor = 'rgba(24, 53, 47, 0.03)'; }}
              onMouseLeave={e => { if (activePage !== 'settings') e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              {activePage === 'settings' && (
                <div style={{
                  position: 'absolute', left: 0, top: '15%', bottom: '15%', width: '3px',
                  backgroundColor: 'var(--color-champagne)', borderRadius: '0 4px 4px 0'
                }} />
              )}
              <span className="material-symbols-outlined" style={{ 
                fontSize: '24px', color: activePage === 'settings' ? 'var(--color-champagne)' : '#727976', flexShrink: 0,
                marginLeft: sidebarOpen ? (activePage === 'settings' ? '8px' : '11px') : '0',
              }}>
                settings
              </span>
              <div style={{
                marginLeft: '16px', opacity: sidebarOpen ? 1 : 0, width: sidebarOpen ? 'auto' : 0,
                overflow: 'hidden', transition: 'opacity 0.2s ease'
              }}>
                <span style={{ fontSize: '16px', color: activePage === 'settings' ? 'var(--color-forest)' : '#414846', fontWeight: activePage === 'settings' ? 600 : 400, fontFamily: 'Inter', whiteSpace: 'nowrap' }}>Cài đặt</span>
              </div>
            </button>

            {/* Logout Action */}
            <button
              onClick={onExitAdmin}
              title={!sidebarOpen ? 'Thoát' : undefined}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                padding: sidebarOpen ? '12px 16px' : '12px 0',
                justifyContent: sidebarOpen ? 'flex-start' : 'center',
                backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '4px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(186, 26, 26, 0.05)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#ba1a1a', flexShrink: 0, marginLeft: sidebarOpen ? '11px' : '0' }}>logout</span>
              <div style={{
                marginLeft: '16px', opacity: sidebarOpen ? 1 : 0, width: sidebarOpen ? 'auto' : 0,
                overflow: 'hidden', transition: 'opacity 0.2s ease'
              }}>
                <span style={{ fontSize: '16px', color: '#ba1a1a', fontFamily: 'Inter', whiteSpace: 'nowrap', fontWeight: 500 }}>Đăng xuất</span>
              </div>
            </button>
          </div>
        </aside>

        {/* ── Main content area ── */}
        <main style={{ 
          flex: 1, 
          padding: '32px', 
          overflowY: 'auto', 
          backgroundColor: '#F7F3EB',
          marginLeft: isMobile ? '0' : (sidebarOpen ? '260px' : '80px'),
          transition: 'margin-left 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          minHeight: 'calc(100vh - 64px)'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export type { AdminPage };
