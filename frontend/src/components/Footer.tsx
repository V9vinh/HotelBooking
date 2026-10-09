import React from 'react';

const currentYear = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer" id="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Aurora Grand Hotel &amp; Suites</h4>
            <p>
              Khách sạn 5 sao tiêu chuẩn quốc tế mang đến trải nghiệm nghỉ dưỡng hoàn hảo giữa lòng thành phố. Chúng tôi cam kết mang lại sự tiện nghi, an toàn và dịch vụ chu đáo nhất cho quý khách.
            </p>
          </div>

          <div className="footer-col">
            <h4>Liên hệ &amp; Vị trí</h4>
            <ul>
              <li>Địa chỉ: 123 Đường Trần Phú, Quận 1, TP. Hồ Chí Minh</li>
              <li>Hotline: 1900 6868 / 028 3822 9999</li>
              <li>Email: reservations@auroragrand.com</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Dịch vụ lưu trú</h4>
            <ul>
              <li>Phòng Standard &amp; Deluxe</li>
              <li>Executive Suite &amp; Penthouse</li>
              <li>Nhà hàng &amp; Bar ẩm thực cao cấp</li>
              <li>Spa &amp; Hồ bơi vô cực</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Aurora Grand Hotel. Quản lý phòng &amp; hệ thống đặt phòng theo tiêu chuẩn UC02.</p>
        </div>
      </div>
    </footer>
  );
};
