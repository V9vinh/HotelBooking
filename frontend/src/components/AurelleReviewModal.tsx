import React, { useState } from 'react';

interface AurelleReviewModalProps {
  bookingId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const AurelleReviewModal: React.FC<AurelleReviewModalProps> = ({ bookingId, onClose, onSuccess }) => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    fetch(`http://localhost:8088/api/bookings/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        maPhieu: bookingId,
        diemSo: rating,
        noiDung: comment
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          onSuccess();
        } else {
          setError(data.message || 'Đánh giá thất bại.');
        }
      })
      .catch(err => {
        console.error("Review error", err);
        setError('Có lỗi xảy ra khi gửi đánh giá.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          width: '100%',
          maxWidth: '500px',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.8)',
            border: 'none',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#1A1A1A' }}>close</span>
        </button>

        <div style={{ padding: '30px 24px 20px', textAlign: 'center', borderBottom: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1A1A1A', margin: '0 0 8px 0' }}>Đánh giá chuyến đi</h2>
          <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Mã phiếu đặt phòng: #{bookingId}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '30px 24px', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="material-symbols-outlined"
                onClick={() => setRating(star)}
                style={{
                  fontSize: '40px',
                  cursor: 'pointer',
                  color: star <= rating ? 'var(--color-champagne)' : '#E5E7EB',
                  transition: 'color 0.2s'
                }}
              >
                {star <= rating ? 'star' : 'grade'}
              </span>
            ))}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--color-charcoal)' }}>
              Nhận xét của bạn
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Chia sẻ trải nghiệm của bạn..."
              rows={4}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                fontSize: '14px',
                resize: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {error && (
            <div style={{ color: '#DC2626', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              backgroundColor: '#1A1A1A',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '14px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>autorenew</span>
                Đang gửi...
              </>
            ) : (
              'Gửi đánh giá'
            )}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};
