import { CAN, CHI } from "./VILunar";

// 12 giờ trong ngày (từ Tý đến Hợi)
export const HOURS = [
    "Tý", // 23:00 - 00:59
    "Sửu", // 01:00 - 02:59
    "Dần", // 03:00 - 04:59
    "Mão", // 05:00 - 06:59
    "Thìn", // 07:00 - 08:59
    "Tỵ", // 09:00 - 10:59
    "Ngọ", // 11:00 - 12:59
    "Mùi", // 13:00 - 14:59
    "Thân", // 15:00 - 16:59
    "Dậu", // 17:00 - 18:59
    "Tuất", // 19:00 - 20:59
    "Hợi", // 21:00 - 22:59
];

// Thời gian tương ứng với mỗi giờ
export const HOUR_RANGES = [
    { start: 23, end: 0 }, // Tý
    { start: 1, end: 2 }, // Sửu
    { start: 3, end: 4 }, // Dần
    { start: 5, end: 6 }, // Mão
    { start: 7, end: 8 }, // Thìn
    { start: 9, end: 10 }, // Tỵ
    { start: 11, end: 12 }, // Ngọ
    { start: 13, end: 14 }, // Mùi
    { start: 15, end: 16 }, // Thân
    { start: 17, end: 18 }, // Dậu
    { start: 19, end: 20 }, // Tuất
    { start: 21, end: 22 }, // Hợi
];

// Các loại giờ
export enum HourType {
    HOANG_DAO = "Hoàng đạo", // Giờ tốt
    HAC_DAO = "Hắc đạo", // Giờ xấu
    TRUNG_TINH = "Trung tính", // Giờ bình thường
}

// Interface cho thông tin giờ
export interface HourInfo {
    hour: string; // Tên giờ (Tý, Sửu, ...)
    type: HourType; // Loại giờ
    startTime: string; // Giờ bắt đầu (HH:mm)
    endTime: string; // Giờ kết thúc (HH:mm)
    description: string; // Mô tả
}

// Interface cho kết quả giờ hoàng đạo trong ngày
export interface AuspiciousHoursResult {
    date: Date;
    dayCan: string;
    dayChi: string;
    hours: HourInfo[];
    auspiciousHours: HourInfo[];
    inauspiciousHours: HourInfo[];
    neutralHours: HourInfo[];
}

/**
 * Tính giờ hoàng đạo dựa trên Can Chi của ngày
 * Quy tắc: Giờ hoàng đạo là giờ có Can tương sinh với Can của ngày
 */
function calculateAuspiciousHours(dayCan: string, dayChi: string): HourInfo[] {
    const hours: HourInfo[] = [];

    // Quy tắc tính giờ hoàng đạo:
    // 1. Giờ có Can tương sinh với Can của ngày
    // 2. Giờ có Chi tương hợp với Chi của ngày
    // 3. Tránh giờ xung khắc

    // Bảng tương sinh Can
    const canRelations = {
        Giáp: ["Bính", "Đinh"], // Giáp sinh Bính, Đinh
        Ất: ["Đinh", "Mậu"],
        Bính: ["Mậu", "Kỷ"],
        Đinh: ["Kỷ", "Canh"],
        Mậu: ["Canh", "Tân"],
        Kỷ: ["Tân", "Nhâm"],
        Canh: ["Nhâm", "Quý"],
        Tân: ["Quý", "Giáp"],
        Nhâm: ["Giáp", "Ất"],
        Quý: ["Ất", "Bính"],
    };

    // Bảng tương hợp Chi
    const chiRelations = {
        Tý: ["Sửu", "Thân"], // Tý hợp Sửu, Thân
        Sửu: ["Tý", "Dậu"],
        Dần: ["Mão", "Tuất"],
        Mão: ["Dần", "Hợi"],
        Thìn: ["Tỵ", "Tý"],
        Tỵ: ["Thìn", "Sửu"],
        Ngọ: ["Mùi", "Dần"],
        Mùi: ["Ngọ", "Mão"],
        Thân: ["Dậu", "Thìn"],
        Dậu: ["Thân", "Tỵ"],
        Tuất: ["Hợi", "Ngọ"],
        Hợi: ["Tuất", "Mùi"],
    };

    // Bảng xung khắc Chi
    const chiConflicts = {
        Tý: ["Ngọ"], // Tý xung Ngọ
        Sửu: ["Mùi"],
        Dần: ["Thân"],
        Mão: ["Dậu"],
        Thìn: ["Tuất"],
        Tỵ: ["Hợi"],
        Ngọ: ["Tý"],
        Mùi: ["Sửu"],
        Thân: ["Dần"],
        Dậu: ["Mão"],
        Tuất: ["Thìn"],
        Hợi: ["Tỵ"],
    };

    // Tính Can của từng giờ
    for (let i = 0; i < 12; i++) {
        const hourChi = CHI[i];
        const hourCan = CAN[(i + 1) % 10]; // Can của giờ

        let type = HourType.TRUNG_TINH;
        let description = "Giờ bình thường";

        // Kiểm tra giờ hoàng đạo
        const auspiciousCans =
            canRelations[dayCan as keyof typeof canRelations] || [];
        const auspiciousChis =
            chiRelations[dayChi as keyof typeof chiRelations] || [];
        const conflictChis =
            chiConflicts[dayChi as keyof typeof chiConflicts] || [];

        if (
            auspiciousCans.includes(hourCan) &&
            auspiciousChis.includes(hourChi)
        ) {
            type = HourType.HOANG_DAO;
            description = "Giờ hoàng đạo - Rất tốt cho mọi việc";
        } else if (
            auspiciousCans.includes(hourCan) ||
            auspiciousChis.includes(hourChi)
        ) {
            type = HourType.HOANG_DAO;
            description = "Giờ hoàng đạo - Tốt cho nhiều việc";
        } else if (conflictChis.includes(hourChi)) {
            type = HourType.HAC_DAO;
            description = "Giờ hắc đạo - Nên tránh";
        }

        const startHour = HOUR_RANGES[i].start;
        const endHour = HOUR_RANGES[i].end;

        hours.push({
            hour: hourChi,
            type,
            startTime: `${startHour.toString().padStart(2, "0")}:00`,
            endTime: `${endHour.toString().padStart(2, "0")}:59`,
            description,
        });
    }

    return hours;
}

/**
 * Tính giờ hoàng đạo cho một ngày cụ thể
 */
export function getAuspiciousHours(date: Date): AuspiciousHoursResult {
    // Tính Can Chi của ngày
    const jd =
        Math.floor(
            (date.getTime() - new Date(1900, 0, 1).getTime()) /
                (24 * 60 * 60 * 1000)
        ) + 2415021;
    const dayCanIndex = (jd + 9) % 10;
    const dayChiIndex = (jd + 1) % 12;

    const dayCan = CAN[dayCanIndex];
    const dayChi = CHI[dayChiIndex];

    // Tính các giờ
    const hours = calculateAuspiciousHours(dayCan, dayChi);

    // Phân loại giờ
    const auspiciousHours = hours.filter((h) => h.type === HourType.HOANG_DAO);
    const inauspiciousHours = hours.filter((h) => h.type === HourType.HAC_DAO);
    const neutralHours = hours.filter((h) => h.type === HourType.TRUNG_TINH);

    return {
        date,
        dayCan,
        dayChi,
        hours,
        auspiciousHours,
        inauspiciousHours,
        neutralHours,
    };
}

/**
 * Lấy giờ hoàng đạo cho ngày hôm nay
 */
export function getTodayAuspiciousHours(): AuspiciousHoursResult {
    return getAuspiciousHours(new Date());
}

/**
 * Kiểm tra giờ hiện tại có phải giờ hoàng đạo không
 */
export function isCurrentHourAuspicious(): {
    isAuspicious: boolean;
    hourInfo?: HourInfo;
} {
    const now = new Date();
    const currentHour = now.getHours();

    // Tìm giờ tương ứng
    let hourIndex = -1;
    for (let i = 0; i < HOUR_RANGES.length; i++) {
        const range = HOUR_RANGES[i];
        if (range.start <= range.end) {
            if (currentHour >= range.start && currentHour <= range.end) {
                hourIndex = i;
                break;
            }
        } else {
            // Trường hợp đặc biệt: Tý (23:00 - 00:59)
            if (currentHour >= range.start || currentHour <= range.end) {
                hourIndex = i;
                break;
            }
        }
    }

    if (hourIndex === -1) {
        return { isAuspicious: false };
    }

    const result = getAuspiciousHours(now);
    const currentHourInfo = result.hours[hourIndex];

    return {
        isAuspicious: currentHourInfo.type === HourType.HOANG_DAO,
        hourInfo: currentHourInfo,
    };
}

/**
 * Lấy danh sách giờ hoàng đạo cho một khoảng thời gian
 */
export function getAuspiciousHoursForPeriod(
    startDate: Date,
    endDate: Date
): AuspiciousHoursResult[] {
    const results: AuspiciousHoursResult[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        results.push(getAuspiciousHours(new Date(currentDate)));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return results;
}

/**
 * Tìm giờ hoàng đạo tốt nhất trong ngày
 */
export function getBestAuspiciousHours(date: Date): HourInfo[] {
    const result = getAuspiciousHours(date);
    return result.auspiciousHours.filter(
        (hour) =>
            hour.description.includes("Rất tốt") ||
            hour.description.includes("Tốt cho nhiều việc")
    );
}
