import { useState, useEffect } from 'react';

export function AdminPromotionsPage() {
  return (
    <div style={{ fontFamily: 'var(--font-sans)', padding: '20px 0' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-charcoal)', letterSpacing: '-0.02em', marginBottom: '24px' }}>
        Quản lý Khuyến mãi
      </h1>
      
      <div style={{ 
        backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '10px', 
        padding: '60px 20px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' 
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#9CA3AF', marginBottom: '16px' }}>local_offer</span>
        <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Chức năng Quản lý Khuyến mãi</h3>
        <p style={{ color: '#6B7280', fontSize: '16px', maxWidth: '400px', margin: '0 auto' }}>
          Bạn có thể quản lý các mã giảm giá và chương trình khuyến mãi tại đây trong các bản cập nhật sắp tới.
        </p>
      </div>
    </div>
  );
}
