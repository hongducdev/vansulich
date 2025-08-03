import holidaysData from "../assets/data/holidays.json";
import { solarToLunar } from "./VILunar";

export interface Holiday {
    date: string; // Format: "DD-MM" or "DD" for lunar_monthly
    name_vi: string;
    name_en?: string;
    type: "international" | "vn_gregorian" | "vn_lunar" | "lunar_monthly";
}

export interface HolidayInfo {
    holiday: Holiday;
    type: "international" | "vn_gregorian" | "vn_lunar" | "lunar_monthly";
}

export type HolidayType =
    | "international"
    | "vn_gregorian"
    | "vn_lunar"
    | "lunar_monthly";

// Type assertion cho dữ liệu JSON
const typedHolidaysData = holidaysData as {
    international_holidays: Holiday[];
    vn_holidays_gregorian: Holiday[];
    vn_holidays_lunar: Holiday[];
    lunar_monthly: Holiday[];
};

// Tạo map để truy cập nhanh ngày lễ theo ngày
const createHolidayMap = () => {
    const holidayMap = new Map<string, HolidayInfo[]>();

    // Thêm ngày lễ quốc tế
    typedHolidaysData.international_holidays.forEach((holiday) => {
        const key = holiday.date;
        if (!holidayMap.has(key)) {
            holidayMap.set(key, []);
        }
        holidayMap.get(key)!.push({
            holiday,
            type: "international",
        });
    });

    // Thêm ngày lễ Việt Nam dương lịch
    typedHolidaysData.vn_holidays_gregorian.forEach((holiday) => {
        const key = holiday.date;
        if (!holidayMap.has(key)) {
            holidayMap.set(key, []);
        }
        holidayMap.get(key)!.push({
            holiday,
            type: "vn_gregorian",
        });
    });

    return holidayMap;
};

const holidayMap = createHolidayMap();

// Hàm kiểm tra ngày lễ dương lịch
export const getGregorianHolidays = (date: Date): HolidayInfo[] => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const dateKey = `${day}-${month}`;

    return holidayMap.get(dateKey) || [];
};

// Hàm kiểm tra ngày lễ âm lịch
export const getLunarHolidays = (date: Date): HolidayInfo[] => {
    try {
        const lunarInfo = solarToLunar(date);
        const lunarDay = lunarInfo.lunarDate.day.toString().padStart(2, "0");
        const lunarMonth = lunarInfo.lunarDate.month
            .toString()
            .padStart(2, "0");
        const lunarDateKey = `${lunarDay}-${lunarMonth}`;

        const lunarHolidays = typedHolidaysData.vn_holidays_lunar.filter(
            (holiday) => holiday.date === lunarDateKey
        );

        return lunarHolidays.map((holiday) => ({
            holiday,
            type: "vn_lunar",
        }));
    } catch (error) {
        return [];
    }
};

// Hàm kiểm tra ngày mùng 1 và 15 âm hàng tháng
export const getLunarMonthlyHolidays = (date: Date): HolidayInfo[] => {
    try {
        const lunarInfo = solarToLunar(date);
        const lunarDay = lunarInfo.lunarDate.day.toString().padStart(2, "0");

        const monthlyHolidays = typedHolidaysData.lunar_monthly.filter(
            (holiday) => holiday.date === lunarDay
        );

        return monthlyHolidays.map((holiday) => ({
            holiday,
            type: "lunar_monthly",
        }));
    } catch (error) {
        return [];
    }
};

// Hàm lấy tất cả ngày lễ cho một ngày cụ thể
export const getAllHolidays = (date: Date): HolidayInfo[] => {
    const gregorianHolidays = getGregorianHolidays(date);
    const lunarHolidays = getLunarHolidays(date);
    const lunarMonthlyHolidays = getLunarMonthlyHolidays(date);

    return [...gregorianHolidays, ...lunarHolidays, ...lunarMonthlyHolidays];
};

// Hàm kiểm tra xem một ngày có phải là ngày lễ không
export const isHoliday = (date: Date): boolean => {
    return getAllHolidays(date).length > 0;
};

// Hàm lấy tên ngày lễ chính (ngày lễ đầu tiên nếu có nhiều)
export const getMainHolidayName = (date: Date): string | null => {
    const holidays = getAllHolidays(date);
    return holidays.length > 0 ? holidays[0].holiday.name_vi : null;
};

// Hàm lấy màu sắc cho ngày lễ
export const getHolidayColor = (holidayType: HolidayType): string => {
    switch (holidayType) {
        case "international":
            return "text-blue-600";
        case "vn_gregorian":
            return "text-red-600";
        case "vn_lunar":
            return "text-purple-600";
        case "lunar_monthly":
            return "text-orange-600";
        default:
            return "text-gray-600";
    }
};

// Hàm lấy background color cho ngày lễ
export const getHolidayBackgroundColor = (holidayType: HolidayType): string => {
    switch (holidayType) {
        case "international":
            return "bg-blue-50";
        case "vn_gregorian":
            return "bg-red-50";
        case "vn_lunar":
            return "bg-purple-50";
        case "lunar_monthly":
            return "bg-orange-50";
        default:
            return "bg-gray-50";
    }
};

// Hàm lấy tất cả ngày lễ trong một tháng
export const getHolidaysInMonth = (
    year: number,
    month: number
): Map<number, HolidayInfo[]> => {
    const holidaysInMonth = new Map<number, HolidayInfo[]>();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const holidays = getAllHolidays(date);

        if (holidays.length > 0) {
            holidaysInMonth.set(day, holidays);
        }
    }

    return holidaysInMonth;
};

// Hàm tính khoảng cách giữa hai ngày
export const getDaysDifference = (date1: Date, date2: Date): number => {
    const timeDiff = Math.abs(date1.getTime() - date2.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

// Hàm lấy thông tin khoảng cách với ngày lễ gần nhất
export const getNearestHolidayInfo = (
    currentDate: Date
): {
    holiday: HolidayInfo;
    daysUntil: number;
} | null => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Lấy tất cả ngày lễ trong tháng hiện tại
    const holidaysInMonth = getHolidaysInMonth(currentYear, currentMonth);

    let nearestHoliday: HolidayInfo | null = null;
    let minDays = Infinity;

    // Kiểm tra tất cả ngày lễ trong tháng
    for (const [day, holidays] of holidaysInMonth) {
        const holidayDate = new Date(currentYear, currentMonth, day);
        const daysDiff = getDaysDifference(currentDate, holidayDate);

        if (daysDiff < minDays) {
            minDays = daysDiff;
            nearestHoliday = holidays[0]; // Lấy ngày lễ đầu tiên nếu có nhiều
        }
    }

    if (nearestHoliday) {
        return {
            holiday: nearestHoliday,
            daysUntil: minDays,
        };
    }

    return null;
};

// Hàm lấy danh sách ngày lễ trong tháng với khoảng cách
export const getHolidaysInMonthWithDistance = (
    currentDate: Date,
    year: number,
    month: number
): Array<{
    holiday: HolidayInfo;
    date: Date;
    daysUntil: number;
}> => {
    const holidaysInMonth = getHolidaysInMonth(year, month);
    const result: Array<{
        holiday: HolidayInfo;
        date: Date;
        daysUntil: number;
    }> = [];

    for (const [day, holidays] of holidaysInMonth) {
        const holidayDate = new Date(year, month, day);
        const daysDiff = getDaysDifference(currentDate, holidayDate);

        holidays.forEach((holiday) => {
            result.push({
                holiday,
                date: holidayDate,
                daysUntil: daysDiff,
            });
        });
    }

    // Sắp xếp theo khoảng cách
    return result.sort((a, b) => a.daysUntil - b.daysUntil);
};

// Export dữ liệu gốc để sử dụng nếu cần
export { holidaysData };
