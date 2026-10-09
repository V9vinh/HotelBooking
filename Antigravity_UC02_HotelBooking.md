# MASTER PROMPT CHO ANTIGRAVITY — HOTELBOOKING
## Triển khai tuần tự UC02–UC21, kiểm thử đầy đủ, commit từng UC và lưu tiến độ để tiếp tục không bị gián đoạn

> Đặt file này ở thư mục gốc `D:\Projects\HotelBooking` với tên `HOTELBOOKING_IMPLEMENTATION_PLAN.md`. Antigravity phải đọc toàn bộ file trước khi làm. Đây vừa là kế hoạch triển khai, vừa là sổ theo dõi tiến độ sống; bắt buộc cập nhật sau mỗi UC và commit file này cùng UC tương ứng.

## 1. Mục tiêu và nguyên tắc làm việc

UC01 – Đăng ký tài khoản đã được ghi nhận là triển khai và merge vào `develop`. Tiếp tục từ code thực tế hiện có, bắt đầu ở UC chưa hoàn tất đầu tiên, dự kiến UC02. Triển khai theo thứ tự UC02 → UC03 → ... → UC21.

**Với từng UC, bắt buộc:** khảo sát → triển khai backend → test backend → triển khai frontend → test frontend/tích hợp → cập nhật file Markdown này → rà soát diff và bảo mật → commit UC hiện tại → xác minh commit → tạo branch UC tiếp theo → tiếp tục UC kế tiếp. Không tạo branch mới trước khi UC hiện tại đã được test và commit thành công.

Không hỏi tôi sau mỗi UC rằng có muốn tiếp tục không. Tự động chuyển sang UC kế tiếp nếu kiểm thử đạt và không có blocker. Chỉ dừng khi cần người dùng xử lý thao tác bên ngoài, có xung đột nghiệp vụ/SQL, lỗi nghiêm trọng không giải quyết được, hoặc quy trình PR yêu cầu người dùng merge. Trước khi dừng, cập nhật file này để phiên làm việc sau tiếp tục được.

## 2. Thông tin dự án (phải kiểm tra lại với workspace)

- Root: `D:\Projects\HotelBooking`
- Backend: `D:\Projects\HotelBooking\backend`
- Frontend: `D:\Projects\HotelBooking\frontend`
- Backend: Spring Boot 4.1.1, Java 25, Maven; package `com.hotelbooking.backend`
- Frontend: React + TypeScript + Vite
- MySQL 8; database đang dùng: `hotelbookingdb`
- Backend URL: `http://localhost:8080`; frontend URL: `http://localhost:5173`
- SQL chuẩn: `BookingAI.sql`
- Git remote đã ghi nhận: `https://github.com/V9vinh/HotelBooking.git`
- UC01 đăng ký đã merge vào `develop`; các phần còn lại của UC01 chưa được xác nhận đầy đủ.

Không coi các thông tin này là lý do để bỏ qua việc kiểm tra workspace, branch và cấu trúc thực tế. Không chuyển branch khi có thay đổi chưa commit mà chưa xác định được cách bảo toàn chúng.

## 3. Quy tắc dữ liệu — SQL là nguồn chuẩn

Đọc `BookingAI.sql` trước khi triển khai dữ liệu. 14 bảng đã ghi nhận: `TAIKHOAN`, `KHACHHANG`, `NHANVIEN`, `LOAIPHONG`, `PHONG`, `KHUYENMAI`, `DICHVU`, `PHIEUDATPHONG`, `CHITIETDATPHONG`, `HOADON`, `THANHTOAN`, `SUDUNGDICHVU`, `DANHGIA`, `PHATSINH`.

Xác minh tên cột, kiểu dữ liệu, PK/FK, ENUM và ràng buộc trực tiếp từ SQL. Không tự thêm/xóa/đổi tên bảng, cột, ENUM, quan hệ hoặc nghiệp vụ. Không sửa schema để code dễ viết hơn. Nếu nghiệp vụ yêu cầu dữ liệu không có trong SQL hoặc có nhiều cách hiểu quan trọng, ghi blocker trong file này và dừng phần bị ảnh hưởng để hỏi tôi; không tự sửa SQL.

## 4. Quy tắc khảo sát và code

Trước mỗi UC:
1. Đọc file này, `git status`, branch hiện tại, lịch sử commit và tiến độ đã lưu.
2. Đọc `BookingAI.sql` và các Entity/Enum/Repository/Service/Controller/DTO/config liên quan.
3. Kiểm tra cấu trúc frontend, routing, API client, component, CSS, `package.json`; kiểm tra `pom.xml`.
4. Tái sử dụng code hiện có. Không tạo lớp trùng hoặc viết lại phần đang hoạt động nếu không cần.
5. Liệt kê file sẽ tạo/sửa và kế hoạch ngắn trước khi sửa.
6. Chỉ thay đổi phạm vi UC hiện tại và phần nền tảng tối thiểu thực sự cần thiết.

Giữ cấu trúc backend đang có (dự kiến `entity/`, `enums/`, `repository/`, `service/`, `controller/`, `dto/`, `config/` — phải xác minh thực tế). Giữ React + TypeScript + Vite và quy ước hiện tại. Không thêm thư viện nếu không thực sự cần.

Bảo mật: không đưa mật khẩu DB, token hoặc thông tin bí mật vào code, log, Git hay báo cáo; không trả mật khẩu/hash mật khẩu hoặc dữ liệu nhạy cảm trong response; validate đầu vào, xử lý lỗi hợp lý, không trả stack trace cho client. Không tích hợp cổng thanh toán, email/SMS hoặc dịch vụ ngoài nếu chưa được yêu cầu và cấu hình hợp lệ.

## 5. Quy trình hoàn thành MỖI UC

### A. Khảo sát
- Đối chiếu phạm vi UC với SQL và code hiện có.
- Xác định luồng thành công, lỗi, quyền truy cập và ràng buộc.
- Ghi các file dự kiến tạo/sửa; không thêm chức năng ngoài phạm vi.

### B. Backend
- Triển khai nghiệp vụ qua Repository/Service/Controller/DTO theo kiến trúc hiện có.
- Validate dữ liệu, dùng HTTP status phù hợp, transaction khi nhiều thay đổi phải thành công/thất bại cùng nhau.
- Bảo vệ endpoint theo vai trò và không để người dùng tự nâng quyền.
- Không triển khai trước API của UC tương lai, trừ nền tảng tối thiểu bắt buộc.

### C. Test backend — bắt buộc
Trong `backend`, chạy ít nhất `mvn clean compile` và `mvn test`. Viết/cập nhật unit hoặc integration test phù hợp. Bao gồm trường hợp thành công, dữ liệu thiếu/sai, không tìm thấy, dữ liệu trùng/vi phạm ràng buộc, không đủ quyền và chuyển trạng thái không hợp lệ khi phù hợp. Nếu có thể, kiểm tra API thực tế bằng HTTP/Postman. Nếu test lỗi, tìm nguyên nhân, sửa trong phạm vi và chạy lại. Không xóa test hoặc che giấu lỗi để làm build xanh. Không tuyên bố đã test endpoint nếu chỉ compile.

### D. Frontend
Sau khi API backend phù hợp hoạt động, làm giao diện UC đó. Dùng API thật, không hard-code dữ liệu thay backend. Tái sử dụng component/style/routing/API client. Có loading, lỗi, trạng thái rỗng, thông báo thành công/thất bại và validation. Không tạo menu/trang/feature ngoài danh sách UC.

### E. Test frontend và tích hợp — bắt buộc
Kiểm tra `package.json`, chạy script build hiện có (thường `npm run build`) và lint nếu script tồn tại. Không tự tạo script giả để báo thành công. Kiểm tra frontend gọi đúng endpoint, method và tên trường request/response. Kiểm tra các luồng chính, lỗi API, dữ liệu rỗng và validation. Nếu không thể chạy browser/integration test do thiếu dịch vụ, ghi chính xác giới hạn; không tuyên bố đã kiểm thử khi chưa làm.

Chỉ đánh dấu UC “Hoàn thành – đã test và commit” khi backend compile, test phù hợp đạt, frontend build đạt và luồng tích hợp chính được kiểm tra ở mức môi trường cho phép. Nếu một kiểm tra không thể chạy, ghi rõ và không che giấu.

### F. Cập nhật file Markdown trước khi commit
- Cập nhật trạng thái UC ở Mục 7.
- Thêm nhật ký chi tiết vào Mục 8.
- Cập nhật trạng thái tiếp tục ở Mục 9: UC đang làm, UC hoàn thành gần nhất, branch, commit, lệnh test, blocker và UC tiếp theo.
- Chỉ ghi kết quả thực tế đã xác minh; không bịa commit hash, test result hay branch.
- Giữ lại lịch sử cũ; không xóa nhật ký của UC trước.
- Xem diff file Markdown để bảo đảm đúng với code.

### G. Rà soát trước commit
Chạy `git status` và `git diff --check`; xem `git diff` và `git diff --cached`. Chỉ stage code, test liên quan và file Markdown. Không commit `node_modules/`, `target/`, file build, log, bí mật, file môi trường có mật khẩu hoặc thay đổi cá nhân không liên quan. Stage file tường minh; không dùng `git add .` mù quáng.

### H. Commit UC hiện tại
Chỉ commit khi test đạt và Markdown đã cập nhật. Ví dụ: `feat(uc02): implement room search`, `feat(uc03): implement room booking`. Kiểm tra branch đúng, stage file liên quan, xem `git diff --cached`, commit rồi xác minh bằng `git status` và `git log -1 --oneline`. Ghi hash thực tế vào nhật ký. Nếu cần cập nhật file sau commit, tạo commit cập nhật bổ sung để code và file tiến độ không lệch nhau.

### I. Tạo branch kế tiếp — chỉ sau commit thành công
- Xác minh commit UC hiện tại đã tồn tại.
- Tạo branch tiếp theo theo mẫu `feat/ucNN-ten-ngan`, từ HEAD đã commit gần nhất để bảo đảm kế thừa code UC trước.
- Nếu branch đã tồn tại, kiểm tra nó trước; không ghi đè hoặc tạo trùng.
- Ghi branch mới và UC kế tiếp vào file Markdown; nếu file thay đổi sau khi commit UC vừa xong, commit cập nhật tiến độ trên branch mới trước khi tiếp tục code.
- Không merge vào `main`/`develop`, không push trực tiếp vào `develop`, và không tuyên bố PR đã merge khi chưa có bằng chứng.
- Nếu quy trình dự án yêu cầu PR và merge từng UC trước khi bắt đầu UC kế tiếp, push branch hiện tại nếu được phép, cập nhật file, rồi dừng để tôi merge PR. Sau khi tôi xác nhận merge, đồng bộ `develop` và tạo branch kế tiếp từ `develop` mới nhất. Không tự bỏ qua quy trình PR.

### J. Tiếp tục
Sau khi UC hoàn tất, test đạt, Markdown cập nhật, commit được xác minh và branch kế tiếp đã tạo, tự động bắt đầu UC tiếp theo mà không hỏi lại. Nếu có blocker, cập nhật Markdown rồi báo chính xác điều gì cần tôi làm.

## 6. Danh sách UC chính thức

### UC01 — Quản lý tài khoản cá nhân (tình trạng cần xác minh)
**Tác nhân:** Khách hàng
- Đăng ký
- Đăng nhập
- Đăng xuất
- Cập nhật thông tin cá nhân
- Đổi mật khẩu

Đăng ký đã được ghi nhận là triển khai và merge. Kiểm tra các chức năng còn lại trước khi đánh dấu toàn bộ UC01 hoàn thành. Không viết lại đăng ký nếu đang hoạt động đúng; không phá vỡ API hiện có. Nếu các chức năng còn thiếu, ghi rõ trong tiến độ và xác định thứ tự thực hiện phù hợp với phụ thuộc xác thực trước các chức năng cần đăng nhập.

### UC02 — Tìm kiếm và xem phòng (Khách hàng)
- Tìm phòng
- Xem chi tiết phòng
- Kiểm tra phòng trống
- Lọc phòng

### UC03 — Đặt phòng (Khách hàng)
- Chọn phòng
- Nhập thông tin
- Chọn ngày
- Áp dụng khuyến mãi
- Xác nhận đặt phòng

Không thêm thanh toán vào UC03; thanh toán thuộc UC05. Khi xác nhận đặt phòng phải kiểm tra lại phòng trống ở backend.

### UC04 — Quản lý đặt phòng (Khách hàng)
- Xem đặt phòng
- Xem chi tiết đặt phòng
- Hủy đặt phòng
- Theo dõi trạng thái đặt phòng

### UC05 — Thanh toán (Khách hàng)
- Chọn phương thức thanh toán
- Thanh toán
- Xác nhận thanh toán
- Xem lịch sử thanh toán

Chỉ dùng phương thức/trạng thái được SQL hỗ trợ. Không tích hợp hoặc giả lập giao dịch cổng thanh toán thật nếu chưa được yêu cầu.

### UC06 — Đánh giá dịch vụ (Khách hàng)
- Chấm điểm
- Viết đánh giá
- Sửa đánh giá
- Xem đánh giá

Tuân thủ ràng buộc điểm số, quan hệ và trạng thái trong SQL. Không tự thêm trả lời/báo cáo đánh giá.

### UC07 — Quản lý đặt phòng (Lễ tân)
- Xem đặt phòng
- Tìm kiếm
- Tạo đặt phòng
- Sửa đặt phòng
- Hủy đặt phòng
- Xác nhận đặt phòng

Đây là luồng lễ tân, khác luồng khách hàng. Phân quyền và nguồn đặt phải phù hợp với SQL.

### UC08 — Quản lý nhận phòng / Check-in (Lễ tân)
- Tra cứu booking
- Kiểm tra khách
- Gán phòng
- Xác nhận nhận phòng

Dùng trạng thái đã có trong SQL; không tạo ENUM mới.

### UC09 — Quản lý trả phòng / Check-out (Lễ tân)
- Kiểm tra lưu trú
- Tính tiền
- Lập hóa đơn
- Xác nhận trả phòng

Đối chiếu `HOADON`, `PHATSINH`, `SUDUNGDICHVU`, `CHITIETDATPHONG` và các quan hệ thực tế. Không tự tạo trường/quy tắc tính phí không được xác định.

### UC10 — Quản lý thanh toán (Lễ tân)
- Xem hóa đơn
- Kiểm tra tiền
- Thanh toán
- Xác nhận
- Xuất hóa đơn

Phân biệt với UC05. Tái sử dụng nghiệp vụ phù hợp, tránh hai cách cập nhật tiền/trạng thái mâu thuẫn.

### UC11 — Tra cứu khách hàng (Lễ tân)
- Tìm kiếm khách hàng
- Xem thông tin
- Xem lịch sử đặt phòng
- Xem lịch sử lưu trú
- Xem lịch sử thanh toán

Chỉ trả về dữ liệu cần thiết và kiểm tra quyền truy cập.

### UC12 — Quản lý trạng thái phòng (Lễ tân)
- Xem trạng thái phòng
- Cập nhật trạng thái phòng

Chỉ dùng giá trị trạng thái đã có trong SQL.

### UC13 — Quản lý tài khoản (Quản trị viên)
- Xem tài khoản
- Thêm tài khoản
- Sửa tài khoản
- Xóa tài khoản
- Khóa/mở khóa
- Phân quyền

Bảo vệ API quản trị. Không để người dùng tự nâng quyền. Tuân thủ khóa ngoại và chính sách xóa dữ liệu hiện có.

### UC14 — Quản lý nhân viên (Quản trị viên)
- Xem nhân viên
- Thêm nhân viên
- Sửa nhân viên
- Xóa nhân viên
- Tìm kiếm
- Phân công

Dùng đúng trường/ENUM SQL. Không tự tạo bảng phân công nếu schema không có; nếu chức năng “phân công” chưa được schema hỗ trợ rõ, ghi blocker.

### UC15 — Quản lý khách hàng (Quản trị viên)
- Xem khách hàng
- Thêm khách hàng
- Sửa khách hàng
- Xóa khách hàng
- Tìm kiếm
- Xem lịch sử đặt phòng

Tôn trọng quan hệ `KHACHHANG`–`TAIKHOAN` và các khóa ngoại của lịch sử đặt phòng.

### UC16 — Quản lý phòng (Quản trị viên)
- Xem phòng
- Thêm phòng
- Sửa phòng
- Xóa phòng
- Tìm kiếm
- Cập nhật trạng thái

Tôn trọng quan hệ loại phòng và lịch sử đặt phòng. Không xóa dữ liệu theo cách làm hỏng booking/hóa đơn.

### UC17 — Quản lý loại phòng (Quản trị viên)
- Xem loại phòng
- Thêm loại phòng
- Sửa loại phòng
- Xóa loại phòng
- Giá
- Sức chứa
- Tiện nghi

Dùng trường hiện có. Kiểm tra phòng đang tham chiếu loại phòng trước khi xóa.

### UC18 — Quản lý khuyến mãi (Quản trị viên)
- Xem khuyến mãi
- Thêm khuyến mãi
- Sửa khuyến mãi
- Xóa khuyến mãi
- Kích hoạt
- Thời gian áp dụng

Tuân thủ mã khuyến mãi, ngày áp dụng, số lượng, số đã sử dụng và ENUM trạng thái trong SQL. Không tự tạo loại giảm giá mới.

### UC19 — Quản lý dịch vụ (Quản trị viên)
- Xem dịch vụ
- Thêm dịch vụ
- Sửa dịch vụ
- Xóa dịch vụ
- Giá
- Trạng thái

Dùng bảng `DICHVU`; kiểm tra quan hệ với dữ liệu sử dụng dịch vụ trước khi xóa.

### UC20 — Quản lý hóa đơn (Quản trị viên)
- Xem hóa đơn
- Tìm kiếm
- Xem chi tiết
- Cập nhật
- Xuất hóa đơn

Tôn trọng quan hệ `HOADON` với phiếu đặt phòng, nhân viên và thanh toán. Không cập nhật tùy tiện các số liệu tài chính khiến tổng tiền, đã thanh toán và còn lại sai lệch. Nếu quy tắc cập nhật chưa rõ, ghi blocker.

### UC21 — Thống kê và báo cáo (Quản trị viên)
- Thống kê doanh thu
- Thống kê đặt phòng
- Thống kê khách hàng
- Thống kê tình trạng phòng
- Tỷ lệ sử dụng phòng
- Thống kê dịch vụ
- Báo cáo doanh thu theo ngày/tháng/năm
- Báo cáo đặt phòng theo thời gian

Tính từ dữ liệu thật. Xác định rõ trạng thái và khoảng thời gian được tính. Không tạo số liệu giả. Nếu định nghĩa chỉ số chưa rõ, ghi giả định hoặc blocker.

## 7. Bảng tiến độ sống — bắt buộc cập nhật sau mỗi UC

Trạng thái ban đầu là thông tin cần xác minh từ workspace; không coi là kết quả test mới.

| UC | Tên | Trạng thái |
|---|---|---|
| UC01 | Quản lý tài khoản cá nhân | Một phần: đăng ký đã merge; xác minh đăng nhập/đăng xuất/cập nhật/đổi mật khẩu |
| UC02 | Tìm kiếm và xem phòng | Chưa xác minh; ứng viên tiếp theo |
| UC03 | Đặt phòng | Chưa xác minh |
| UC04 | Quản lý đặt phòng khách hàng | Chưa xác minh |
| UC05 | Thanh toán khách hàng | Chưa xác minh |
| UC06 | Đánh giá dịch vụ | Chưa xác minh |
| UC07 | Quản lý đặt phòng lễ tân | Chưa xác minh |
| UC08 | Check-in | Chưa xác minh |
| UC09 | Check-out | Chưa xác minh |
| UC10 | Quản lý thanh toán lễ tân | Chưa xác minh |
| UC11 | Tra cứu khách hàng | Chưa xác minh |
| UC12 | Quản lý trạng thái phòng | Chưa xác minh |
| UC13 | Quản lý tài khoản quản trị | Chưa xác minh |
| UC14 | Quản lý nhân viên | Chưa xác minh |
| UC15 | Quản lý khách hàng quản trị | Chưa xác minh |
| UC16 | Quản lý phòng quản trị | Chưa xác minh |
| UC17 | Quản lý loại phòng | Chưa xác minh |
| UC18 | Quản lý khuyến mãi | Chưa xác minh |
| UC19 | Quản lý dịch vụ | Chưa xác minh |
| UC20 | Quản lý hóa đơn | Chưa xác minh |
| UC21 | Thống kê và báo cáo | Chưa xác minh |

Dùng trạng thái rõ ràng: `Chưa bắt đầu`, `Đang làm`, `Hoàn thành – đã test và commit`, `Bị chặn`, `Cần kiểm tra lại`. Không đánh dấu hoàn thành chỉ vì code đã được viết.

## 8. Nhật ký triển khai — thêm một mục sau mỗi UC

Sau mỗi UC, thêm mục mới ở đầu nhật ký. Không xóa lịch sử cũ và không bịa dữ liệu.

**Mẫu:**
- UC và tên:
- Trạng thái:
- Branch:
- Commit hash + thông điệp:
- Backend API/nghiệp vụ:
- Frontend trang/component:
- File tạo mới:
- File sửa:
- Test backend: lệnh, kết quả, số test nếu có:
- Test frontend: lệnh và kết quả:
- Test tích hợp: đã kiểm tra gì:
- Vấn đề còn lại:
- Branch kế tiếp:
- Bước đầu tiên để tiếp tục:

### Nhật ký hiện có
Chưa có kết quả UC02 trở đi được xác minh trong file này. Khi bắt đầu, kiểm tra Git và code thực tế rồi mới ghi nhận.

## 9. Trạng thái tiếp tục — cập nhật sau mỗi UC

Đây là phần để phiên Agent sau có thể tiếp tục mà không phụ thuộc lịch sử chat. Sau mỗi UC, thay các giá trị dưới đây bằng dữ liệu thật:

- **UC đang làm:** UC02 – Tìm kiếm và xem phòng (xác minh workspace trước khi bắt đầu).
- **UC hoàn thành gần nhất:** chưa xác minh từ workspace; UC01 đăng ký đã được ghi nhận là merge.
- **Branch hiện tại:** đọc `git branch --show-current`.
- **Commit gần nhất:** đọc `git log -1 --oneline`.
- **Working tree:** đọc `git status`.
- **Lệnh test gần nhất:** chưa xác minh; không bịa.
- **Blocker/quyết định cần xác nhận:** chưa ghi nhận; cập nhật khi phát hiện.
- **Branch kế tiếp cần tạo:** `feat/uc02-search-room` nếu chưa tồn tại và sau khi kiểm tra Git.
- **Việc đầu tiên khi tiếp tục:** đọc file này, kiểm tra Git/SQL, khảo sát code và tiếp tục UC chưa hoàn tất đầu tiên.

Khi một phiên làm việc bị ngắt, đọc file này trước, đối chiếu với code/Git, sau đó tiếp tục từ UC chưa hoàn tất đầu tiên. Không dựa riêng vào bộ nhớ hội thoại.

## 10. Quy ước branch và commit

Branch dự kiến:
- `feat/uc02-search-room`
- `feat/uc03-room-booking`
- `feat/uc04-customer-bookings`
- `feat/uc05-customer-payment`
- `feat/uc06-service-review`
- `feat/uc07-reception-bookings`
- `feat/uc08-check-in`
- `feat/uc09-check-out`
- `feat/uc10-reception-payment`
- `feat/uc11-customer-lookup`
- `feat/uc12-room-status`
- `feat/uc13-account-admin`
- `feat/uc14-employee-management`
- `feat/uc15-customer-management`
- `feat/uc16-room-management`
- `feat/uc17-room-type-management`
- `feat/uc18-promotion-management`
- `feat/uc19-service-management`
- `feat/uc20-invoice-management`
- `feat/uc21-reports`

Commit ví dụ: `feat(uc02): implement room search`, `feat(uc03): implement room booking`. Nội dung commit phải khớp với thay đổi thật.

Branch UC mới phải được tạo **sau khi** UC hiện tại test đạt, file Markdown cập nhật và commit được xác minh. Trong chuỗi làm việc liên tục, branch kế tiếp phải kế thừa HEAD đã commit gần nhất để không mất code. Ghi quan hệ branch/commit vào nhật ký. Không merge vào `main`/`develop`, không push trực tiếp vào `develop`, và không tuyên bố PR đã merge nếu chưa có bằng chứng.

Nếu quy trình nhóm yêu cầu PR/merge từng UC trước khi làm UC tiếp theo: push branch hiện tại nếu được phép, cập nhật file rồi dừng để tôi merge PR; sau khi tôi xác nhận merge, pull `develop` mới nhất và tạo branch UC kế tiếp từ đó. Không tự bỏ qua PR hoặc tự push thẳng vào `develop`.

## 11. Hành động đầu tiên bắt buộc

1. Đọc toàn bộ file này.
2. Chạy `git status`, `git branch --show-current`, `git branch --list`, `git log -5 --oneline`.
3. Tìm và đọc `BookingAI.sql`.
4. Kiểm tra UC01 đã triển khai những chức năng nào; không làm lại đăng ký nếu đang hoạt động.
5. Khảo sát cấu trúc backend/frontend thực tế.
6. Cập nhật Mục 7 và Mục 9 nếu trạng thái thực tế khác thông tin ban đầu.
7. Bắt đầu UC chưa hoàn tất đầu tiên, dự kiến UC02.
8. Với mỗi UC: backend → test → frontend → test tích hợp → cập nhật Markdown → rà soát diff/bảo mật → commit → xác minh commit → tạo branch kế tiếp → tiếp tục UC mới.

**Không bỏ qua kiểm thử. Không commit khi test chưa đạt. Không tạo branch UC mới trước khi commit UC hiện tại. Luôn cập nhật file Markdown để công việc không bị ngắt đoạn.**
