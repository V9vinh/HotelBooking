import React, { useState } from 'react';

interface AurellePaymentModalProps {
  bookingId: number;
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const AurellePaymentModal: React.FC<AurellePaymentModalProps> = ({ bookingId, amount, onClose, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Demo QR Code URL (VietQR format)
  // For production, replace with your actual bank info and credentials
  const qrUrl = `https://api.vietqr.io/image/970436-1014167362-Y2PqL2A.jpg?amount=${amount}&addInfo=THANH%20TOAN%20PHIEU%20${bookingId}`;

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setError(null);

    fetch(`http://localhost:8088/api/bookings/${bookingId}/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phuongThuc: 'ChuyenKhoan',
        soTien: amount
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          onSuccess();
        } else {
          setError(data.message || 'Thanh toán thất bại.');
        }
      })
      .catch(err => {
        console.error("Payment error", err);
        setError('Có lỗi xảy ra khi gọi hệ thống thanh toán.');
      })
      .finally(() => {
        setIsProcessing(false);
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
          maxWidth: '400px',
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
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1A1A1A', margin: '0 0 8px 0' }}>Thanh toán mã #{bookingId}</h2>
          <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Vui lòng quét mã QR bên dưới bằng ứng dụng ngân hàng hoặc ví điện tử.</p>
        </div>

        <div style={{ padding: '30px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: '240px',
            height: '240px',
            backgroundColor: '#F9FAFB',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            marginBottom: '20px'
          }}>
            <img src={qrUrl} alt="QR Code Thanh Toán" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>

          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Tổng số tiền</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#C5A880' }}>{formatVND(amount)}</div>
          </div>

          {error && (
            <div style={{ color: '#DC2626', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button
            onClick={handleConfirmPayment}
            disabled={isProcessing}
            style={{
              width: '100%',
              backgroundColor: '#1A1A1A',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '14px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              opacity: isProcessing ? 0.7 : 1,
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {isProcessing ? (
              <>
                <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>autorenew</span>
                Đang xử lý...
              </>
            ) : (
              'Tôi đã chuyển khoản'
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};
