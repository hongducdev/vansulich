# Vạn Sự Lịch

Ứng dụng âm lịch Việt Nam với thiết kế hiện đại và giao diện thân thiện.

## Tính năng

-   **Xem ngày âm lịch hiện tại**: Hiển thị ngày âm lịch tương ứng với ngày dương lịch
-   **Thông tin Can Chi**: Chi tiết can chi của ngày, tháng, năm âm lịch
-   **Giờ Hoàng Đạo**: Danh sách giờ hoàng đạo trong ngày với mô tả chi tiết
-   **Lịch tháng âm lịch**: Xem lịch tháng âm lịch đầy đủ
-   **Giao diện đẹp**: Thiết kế hiện đại với hình ảnh nền động

## Cài đặt

### Yêu cầu hệ thống

-   Node.js 18+
-   Yarn hoặc npm
-   Expo CLI
-   Android Studio (cho Android)
-   Xcode (cho iOS)

### Cài đặt dependencies

```bash
yarn install
```

### Chạy ứng dụng

```bash
# Khởi động Metro bundler
yarn start

# Chạy trên Android
yarn android

# Chạy trên iOS
yarn ios

# Chạy trên web
yarn web
```

## Build ứng dụng

### Build cho Android

```bash
yarn build:android
```

### Build cho iOS

```bash
yarn build:ios
```

### Build cho cả hai nền tảng

```bash
yarn build:all
```

## Cấu trúc dự án

```
vansulich/
├── app/                    # Expo Router pages
│   ├── (tabs)/           # Tab navigation
│   │   ├── day.tsx      # Màn hình chính
│   │   ├── month.tsx    # Lịch tháng
│   │   └── settings.tsx # Cài đặt
├── components/           # React components
├── constants/           # Constants và utilities
├── hooks/              # Custom hooks
├── assets/             # Images và fonts
└── android/            # Android native code
```

## Công nghệ sử dụng

-   **React Native**: Framework chính
-   **Expo**: Development platform
-   **Expo Router**: File-based routing
-   **NativeWind**: Tailwind CSS cho React Native
-   **TypeScript**: Type safety
-   **Expo Vector Icons**: Icon library

## App Icon

App sử dụng icon âm lịch ngày 5 làm icon mặc định, thể hiện sự may mắn và thịnh vượng trong văn hóa Việt Nam.

## Hỗ trợ

Nếu bạn gặp vấn đề hoặc có góp ý, vui lòng liên hệ:

-   Email: support@vansulich.com

## License

MIT License
