import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="site-header" id="site-header">
      <div className="container header-inner">
        <a href="#" className="brand-logo" id="brand-logo">
          <div className="brand-icon">A</div>
          <div className="brand-text">
            <h1>Aurora Grand</h1>
            <span>Hotel &amp; Suites</span>
          </div>
        </a>

        <div className="header-right">
          <div className="hotline-badge" id="hotline-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>Hotline 24/7: <strong>1900 6868</strong></span>
          </div>
        </div>
      </div>
    </header>
  );
};
