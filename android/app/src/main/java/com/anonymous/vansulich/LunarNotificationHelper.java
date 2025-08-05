package com.anonymous.vansulich;

import java.util.Calendar;

public class LunarNotificationHelper {
    
    // Tên các ngày trong tuần
    private static final String[] DAY_NAMES = {"Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"};
    
    // Tên các tháng âm lịch
    private static final String[] LUNAR_MONTHS = {
        "Giêng", "Hai", "Ba", "Tư", "Năm", "Sáu",
        "Bảy", "Tám", "Chín", "Mười", "Mười một", "Chạp"
    };
    
    // Tên các can
    private static final String[] CAN_NAMES = {"Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"};
    
    // Tên các chi
    private static final String[] CHI_NAMES = {"Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"};
    
    // Giờ hoàng đạo (từ 23h-1h, 3h-5h, 5h-7h, 9h-11h, 11h-13h, 13h-15h, 15h-17h, 17h-19h, 19h-21h, 21h-23h)
    private static final String[] AUSPICIOUS_HOURS = {
        "Tý (23h-1h)", "Dần (3h-5h)", "Thìn (5h-7h)", "Ngọ (9h-11h)", 
        "Thân (11h-13h)", "Tuất (13h-15h)", "Hợi (15h-17h)", "Sửu (17h-19h)", 
        "Mão (19h-21h)", "Tỵ (21h-23h)"
    };
    
    public static String getCurrentDateInfo() {
        Calendar calendar = Calendar.getInstance();
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
        int dayOfMonth = calendar.get(Calendar.DAY_OF_MONTH);
        int month = calendar.get(Calendar.MONTH) + 1;
        int year = calendar.get(Calendar.YEAR);
        
        String dayName = DAY_NAMES[dayOfWeek - 1];
        String dateString = String.format("%d/%d/%d", dayOfMonth, month, year);
        
        return dayName + " " + dateString;
    }
    
    public static String getLunarDateInfo() {
        // Đây là một ước tính đơn giản, trong thực tế cần thuật toán chuyển đổi âm lịch chính xác
        Calendar calendar = Calendar.getInstance();
        int dayOfMonth = calendar.get(Calendar.DAY_OF_MONTH);
        int month = calendar.get(Calendar.MONTH);
        int year = calendar.get(Calendar.YEAR);
        
        // Ước tính âm lịch (đơn giản)
        int lunarDay = dayOfMonth;
        int lunarMonth = month + 1;
        int lunarYear = year;
        
        // Tính can chi đơn giản
        int canIndex = (year - 4) % 10;
        int chiIndex = (year - 4) % 12;
        
        String canName = CAN_NAMES[canIndex];
        String chiName = CHI_NAMES[chiIndex];
        String monthName = LUNAR_MONTHS[lunarMonth - 1];
        
        return String.format("Ngày %d tháng %s năm %s %s", lunarDay, monthName, canName, chiName);
    }
    
    public static String getAuspiciousHoursInfo() {
        StringBuilder hoursInfo = new StringBuilder();
        hoursInfo.append("Giờ hoàng đạo hôm nay:\n");
        
        // Hiển thị 5 giờ hoàng đạo đầu tiên
        for (int i = 0; i < 5; i++) {
            hoursInfo.append("• ").append(AUSPICIOUS_HOURS[i]).append("\n");
        }
        hoursInfo.append("• Và 5 giờ khác...");
        
        return hoursInfo.toString();
    }
    
    public static String getFullNotificationText() {
        String currentDate = getCurrentDateInfo();
        String lunarInfo = getLunarDateInfo();
        String auspiciousHours = getAuspiciousHoursInfo();
        
        return String.format(
            "Chào mừng bạn đến với Văn Sử Lịch!\n\n" +
            "📅 Hôm nay: %s\n" +
            "🌙 Âm lịch: %s\n\n" +
            "⏰ %s\n\n" +
            "Hãy mở ứng dụng để xem thông tin chi tiết về ngày hôm nay và các sự kiện sắp đến!",
            currentDate, lunarInfo, auspiciousHours
        );
    }
} 