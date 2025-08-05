# Tính năng Thông báo Hàng ngày - Văn Sử Lịch

## Tổng quan

Tính năng thông báo hàng ngày cho phép ứng dụng Văn Sử Lịch gửi thông báo vào một thời điểm cố định mỗi ngày để nhắc nhở người dùng xem thông tin ngày hôm đó và các sự kiện sắp đến.

## Cách sử dụng

### 1. Bật thông báo

-   Mở ứng dụng Văn Sử Lịch
-   Vào tab "Cài đặt"
-   Tìm phần "Thông báo hàng ngày"
-   Bật switch "Bật thông báo"

### 2. Chọn thời gian thông báo

-   Sau khi bật thông báo, bạn sẽ thấy tùy chọn "Thời gian thông báo"
-   Nhấn vào để chọn giờ và phút mong muốn
-   Thời gian mặc định là 8:00 sáng

### 3. Thử nghiệm thông báo

-   Nhấn nút "Thử nghiệm thông báo" để kiểm tra
-   Nếu chưa có quyền thông báo, ứng dụng sẽ yêu cầu cấp quyền
-   Thông báo thử nghiệm sẽ hiển thị ngay lập tức

### 4. Thêm Widget

-   Vào phần "Widget màn hình chính"
-   Xem preview của các widget có sẵn
-   Nhấn "Thêm" để thêm widget vào màn hình chính
-   Nhấn "Hướng dẫn" để xem cách sử dụng widget

## Quyền cần thiết

### Android 13+ (API 33+)

-   Quyền `POST_NOTIFICATIONS` - Cần thiết để gửi thông báo
-   Ứng dụng sẽ tự động yêu cầu quyền khi cần thiết

### Android 12 trở xuống

-   Không cần quyền đặc biệt cho thông báo

## Cách cấp quyền thủ công

Nếu quyền thông báo bị từ chối, bạn có thể cấp quyền thủ công:

1. Vào **Cài đặt** > **Ứng dụng** > **Văn Sử Lịch**
2. Chọn **Quyền** > **Thông báo**
3. Bật quyền thông báo

## Nội dung thông báo

Thông báo sẽ bao gồm:

-   **Tiêu đề**: "Văn Sử Lịch - [Thứ] [Ngày/Tháng/Năm]"
-   **Nội dung chi tiết**:
    -   Thông tin ngày dương lịch hiện tại
    -   Ngày âm lịch với can chi
    -   Danh sách giờ hoàng đạo trong ngày
    -   Lời nhắc mở ứng dụng để xem chi tiết
-   **Hành động**: Nhấn vào thông báo để mở ứng dụng

## Tính năng đặc biệt

### Tự động khởi động lại

-   Thông báo sẽ tự động khởi động lại khi thiết bị khởi động
-   Không cần mở ứng dụng để duy trì thông báo

### Thông báo chi tiết

-   Hiển thị ngày trong tuần (Thứ 2, Thứ 3, v.v.)
-   Hiển thị ngày tháng đầy đủ
-   Thông tin âm lịch với can chi
-   Danh sách giờ hoàng đạo trong ngày
-   Thông tin mở rộng khi vuốt xuống

### Tùy chỉnh thời gian

-   Chọn bất kỳ giờ nào từ 00:00 đến 23:59
-   Thay đổi thời gian bất cứ lúc nào
-   Áp dụng ngay lập tức

### Widget màn hình chính

-   **Widget Lịch**: Hiển thị lịch tháng hiện tại
-   **Widget Sự kiện**: Hiển thị các sự kiện sắp đến
-   **Widget Âm lịch**: Hiển thị thông tin âm lịch và giờ hoàng đạo
-   Tự động cập nhật thông tin hàng ngày
-   Click vào widget để mở ứng dụng
-   Có thể tùy chỉnh kích thước và vị trí

## Xử lý sự cố

### Thông báo không hiển thị

1. Kiểm tra quyền thông báo trong Cài đặt
2. Đảm bảo ứng dụng không bị tối ưu hóa pin
3. Thử nghiệm thông báo để kiểm tra

### Thông báo không đúng giờ

1. Kiểm tra múi giờ thiết bị
2. Đảm bảo thiết bị không ở chế độ tiết kiệm pin
3. Thử đặt lại thời gian thông báo

### Ứng dụng bị tắt

-   Thông báo vẫn hoạt động ngay cả khi ứng dụng bị tắt
-   Chỉ cần thiết bị không bị tắt hoàn toàn

## Lưu ý quan trọng

-   Tính năng chỉ khả dụng trên Android
-   Cần cấp quyền thông báo để hoạt động
-   Thông báo sẽ gửi hàng ngày vào thời gian đã chọn
-   Có thể tắt thông báo bất cứ lúc nào bằng cách tắt switch

## Hỗ trợ

Nếu gặp vấn đề với tính năng thông báo, vui lòng:

1. Kiểm tra quyền thông báo
2. Thử nghiệm thông báo
3. Khởi động lại ứng dụng
4. Liên hệ hỗ trợ nếu vấn đề vẫn tiếp tục
