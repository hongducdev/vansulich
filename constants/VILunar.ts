export const CAN = [
    "Giáp",
    "Ất",
    "Bính",
    "Đinh",
    "Mậu",
    "Kỷ",
    "Canh",
    "Tân",
    "Nhâm",
    "Quý",
];
export const CHI = [
    "Tý",
    "Sửu",
    "Dần",
    "Mão",
    "Thìn",
    "Tỵ",
    "Ngọ",
    "Mùi",
    "Thân",
    "Dậu",
    "Tuất",
    "Hợi",
];
export const WEEKDAY = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
];
export const MONTH_VI = [
    "Giêng",
    "Hai",
    "Ba",
    "Tư",
    "Năm",
    "Sáu",
    "Bảy",
    "Tám",
    "Chín",
    "Mười",
    "Mười Một",
    "Chạp",
];

// Các điểm Trung khí (Major Solar Terms)
export const SOLAR_TERMS = [
    "Xuân phân",
    "Thanh minh",
    "Cốc vũ",
    "Lập hạ",
    "Tiểu mãn",
    "Mang chủng",
    "Hạ chí",
    "Tiểu thử",
    "Đại thử",
    "Lập thu",
    "Xử thử",
    "Bạch lộ",
    "Thu phân",
    "Hàn lộ",
    "Sương giáng",
    "Lập đông",
    "Tiểu tuyết",
    "Đại tuyết",
    "Đông chí",
    "Tiểu hàn",
    "Đại hàn",
    "Lập xuân",
    "Vũ thủy",
    "Kinh trập",
];

// Các hằng số cho tính toán âm lịch
const VIETNAM_TIMEZONE = 7; // GMT+7, kinh tuyến 105° đông
const PI = Math.PI;

// Interface cho kết quả âm lịch
export interface LunarDate {
    day: number;
    month: number;
    year: number;
    isLeapMonth: boolean;
    can: string;
    chi: string;
    weekday: string;
    monthName: string;
    dayCan: string; // Can của ngày
    dayChi: string; // Chi của ngày
    monthCan: string; // Can của tháng
    monthChi: string; // Chi của tháng
}

// Interface cho thông tin chi tiết
export interface LunarInfo {
    lunarDate: LunarDate;
    solarDate: Date;
    isLeapYear: boolean;
    solarTerm: string;
    nextSolarTerm: string;
    daysInMonth: number;
}

/**
 * Discard the fractional part of a number
 */
function INT(d: number): number {
    return Math.floor(d);
}

/**
 * Compute the Julian day number of day dd/mm/yyyy
 */
function jdFromDate(dd: number, mm: number, yy: number): number {
    const a = INT((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    let jd =
        dd +
        INT((153 * m + 2) / 5) +
        365 * y +
        INT(y / 4) -
        INT(y / 100) +
        INT(y / 400) -
        32045;
    if (jd < 2299161) {
        jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
    }
    return jd;
}

/**
 * Convert a Julian day number to day/month/year
 */
function jdToDate(jd: number): { day: number; month: number; year: number } {
    let a, b, c, d, e, m, day, month, year;
    if (jd > 2299160) {
        a = jd + 32044;
        b = INT((4 * a + 3) / 146097);
        c = a - INT((b * 146097) / 4);
    } else {
        b = 0;
        c = jd + 32082;
    }
    d = INT((4 * c + 3) / 1461);
    e = c - INT((1461 * d) / 4);
    m = INT((5 * e + 2) / 153);
    day = e - INT((153 * m + 2) / 5) + 1;
    month = m + 3 - 12 * INT(m / 10);
    year = b * 100 + d - 4800 + INT(m / 10);
    return { day, month, year };
}

/**
 * Compute the time of the k-th new moon after the new moon of 1/1/1900 13:52 UCT
 */
function NewMoon(k: number): number {
    const T = k / 1236.85;
    const T2 = T * T;
    const T3 = T2 * T;
    const dr = PI / 180;
    let Jd1 =
        2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    let C1 =
        (0.1734 - 0.000393 * T) * Math.sin(M * dr) +
        0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 =
        C1 -
        0.0074 * Math.sin(dr * (M - Mpr)) +
        0.0004 * Math.sin(dr * (2 * F + M));
    C1 =
        C1 -
        0.0004 * Math.sin(dr * (2 * F - M)) -
        0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 =
        C1 +
        0.001 * Math.sin(dr * (2 * F - Mpr)) +
        0.0005 * Math.sin(dr * (2 * Mpr + M));
    let deltat;
    if (T < -11) {
        deltat =
            0.001 +
            0.000839 * T +
            0.0002261 * T2 -
            0.00000845 * T3 -
            0.000000081 * T * T3;
    } else {
        deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
    }
    const JdNew = Jd1 + C1 - deltat;
    return JdNew;
}

/**
 * Compute the longitude of the sun at any time
 */
function SunLongitude(jdn: number): number {
    const T = (jdn - 2451545.0) / 36525;
    const T2 = T * T;
    const dr = PI / 180;
    const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL =
        DL +
        (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) +
        0.00029 * Math.sin(dr * 3 * M);
    let L = L0 + DL;
    L = L * dr;
    L = L - PI * 2 * INT(L / (PI * 2));
    return L;
}

/**
 * Compute sun position at midnight of the day with the given Julian day number
 */
function getSunLongitude(dayNumber: number, timeZone: number): number {
    return INT((SunLongitude(dayNumber - 0.5 - timeZone / 24) / PI) * 6);
}

/**
 * Compute the day of the k-th new moon in the given time zone
 */
function getNewMoonDay(k: number, timeZone: number): number {
    return INT(NewMoon(k) + 0.5 + timeZone / 24);
}

/**
 * Find the day that starts the lunar month 11 of the given year
 */
function getLunarMonth11(yy: number, timeZone: number): number {
    let k, off, nm, sunLong;
    off = jdFromDate(31, 12, yy) - 2415021;
    k = INT(off / 29.530588853);
    nm = getNewMoonDay(k, timeZone);
    sunLong = getSunLongitude(nm, timeZone);
    if (sunLong >= 9) {
        nm = getNewMoonDay(k - 1, timeZone);
    }
    return nm;
}

/**
 * Find the index of the leap month after the month starting on the day a11
 */
function getLeapMonthOffset(a11: number, timeZone: number): number {
    let k, last, arc, i;
    k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    last = 0;
    i = 1;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    do {
        last = arc;
        i++;
        arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    } while (arc != last && i < 14);
    return i - 1;
}

/**
 * Convert solar date dd/mm/yyyy to the corresponding lunar date
 */
function convertSolar2Lunar(
    dd: number,
    mm: number,
    yy: number,
    timeZone: number
): {
    lunarDay: number;
    lunarMonth: number;
    lunarYear: number;
    lunarLeap: number;
} {
    let k,
        dayNumber,
        monthStart,
        a11,
        b11,
        lunarDay,
        lunarMonth,
        lunarYear,
        lunarLeap,
        diff,
        leapMonthDiff;
    dayNumber = jdFromDate(dd, mm, yy);
    k = INT((dayNumber - 2415021.076998695) / 29.530588853);
    monthStart = getNewMoonDay(k + 1, timeZone);
    if (monthStart > dayNumber) {
        monthStart = getNewMoonDay(k, timeZone);
    }
    a11 = getLunarMonth11(yy, timeZone);
    b11 = a11;
    if (a11 >= monthStart) {
        lunarYear = yy;
        a11 = getLunarMonth11(yy - 1, timeZone);
    } else {
        lunarYear = yy + 1;
        b11 = getLunarMonth11(yy + 1, timeZone);
    }
    lunarDay = dayNumber - monthStart + 1;
    diff = INT((monthStart - a11) / 29);
    lunarLeap = 0;
    lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
        leapMonthDiff = getLeapMonthOffset(a11, timeZone);
        if (diff >= leapMonthDiff) {
            lunarMonth = diff + 10;
            if (diff == leapMonthDiff) {
                lunarLeap = 1;
            }
        }
    }
    if (lunarMonth > 12) {
        lunarMonth = lunarMonth - 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
        lunarYear -= 1;
    }
    return { lunarDay, lunarMonth, lunarYear, lunarLeap };
}

/**
 * Convert a lunar date to the corresponding solar date
 */
function convertLunar2Solar(
    lunarDay: number,
    lunarMonth: number,
    lunarYear: number,
    lunarLeap: number,
    timeZone: number
): {
    day: number;
    month: number;
    year: number;
} {
    let k, a11, b11, off, leapOff, leapMonth, monthStart;
    if (lunarMonth < 11) {
        a11 = getLunarMonth11(lunarYear - 1, timeZone);
        b11 = getLunarMonth11(lunarYear, timeZone);
    } else {
        a11 = getLunarMonth11(lunarYear, timeZone);
        b11 = getLunarMonth11(lunarYear + 1, timeZone);
    }
    k = INT(0.5 + (a11 - 2415021.076998695) / 29.530588853);
    off = lunarMonth - 11;
    if (off < 0) {
        off += 12;
    }
    if (b11 - a11 > 365) {
        leapOff = getLeapMonthOffset(a11, timeZone);
        leapMonth = leapOff - 2;
        if (leapMonth < 0) {
            leapMonth += 12;
        }
        if (lunarLeap != 0 && lunarMonth != leapMonth) {
            return { day: 0, month: 0, year: 0 };
        } else if (lunarLeap != 0 || off >= leapOff) {
            off += 1;
        }
    }
    monthStart = getNewMoonDay(k + off, timeZone);
    const result = jdToDate(monthStart + lunarDay - 1);
    return result;
}

/**
 * Tính Can Chi của ngày
 */
function getDayCanChi(jd: number): { can: string; chi: string } {
    const canIndex = (jd + 9) % 10;
    const chiIndex = (jd + 1) % 12;
    return {
        can: CAN[canIndex],
        chi: CHI[chiIndex],
    };
}

/**
 * Tính Can Chi của tháng
 */
function getMonthCanChi(
    lunarYear: number,
    lunarMonth: number
): { can: string; chi: string } {
    const canIndex = (lunarYear * 12 + lunarMonth + 3) % 10;
    const chiIndex = (lunarMonth + 1) % 12;
    return {
        can: CAN[canIndex],
        chi: CHI[chiIndex],
    };
}

/**
 * Tính Can Chi của năm
 */
function getYearCanChi(year: number): { can: string; chi: string } {
    const canIndex = (year + 6) % 10;
    const chiIndex = (year + 8) % 12;
    return {
        can: CAN[canIndex],
        chi: CHI[chiIndex],
    };
}

/**
 * Tính ngày âm lịch từ ngày dương lịch - Sử dụng thuật toán Ho Ngoc Duc
 */
export function solarToLunar(solarDate: Date): LunarInfo {
    const year = solarDate.getFullYear();
    const month = solarDate.getMonth() + 1;
    const day = solarDate.getDate();

    const lunarResult = convertSolar2Lunar(day, month, year, VIETNAM_TIMEZONE);

    // Tính Can Chi
    const jd = jdFromDate(day, month, year);
    const dayCanChi = getDayCanChi(jd);
    const monthCanChi = getMonthCanChi(
        lunarResult.lunarYear,
        lunarResult.lunarMonth
    );
    const yearCanChi = getYearCanChi(lunarResult.lunarYear);

    // Tính ngày trong tuần
    const weekdayIndex = solarDate.getDay();

    // Tính Trung khí
    const solarTerm = getSunLongitude(jd, VIETNAM_TIMEZONE);
    const solarTermNames = [
        "Xuân phân",
        "Thanh minh",
        "Cốc vũ",
        "Lập hạ",
        "Tiểu mãn",
        "Mang chủng",
        "Hạ chí",
        "Tiểu thử",
        "Đại thử",
        "Lập thu",
        "Xử thử",
        "Bạch lộ",
        "Thu phân",
        "Hàn lộ",
        "Sương giáng",
        "Lập đông",
        "Tiểu tuyết",
        "Đại tuyết",
        "Đông chí",
        "Tiểu hàn",
        "Đại hàn",
        "Lập xuân",
        "Vũ thủy",
        "Kinh trập",
    ];

    const lunarDate: LunarDate = {
        day: lunarResult.lunarDay,
        month: lunarResult.lunarMonth,
        year: lunarResult.lunarYear,
        isLeapMonth: lunarResult.lunarLeap === 1,
        can: yearCanChi.can,
        chi: yearCanChi.chi,
        weekday: WEEKDAY[weekdayIndex],
        monthName: MONTH_VI[lunarResult.lunarMonth - 1],
        dayCan: dayCanChi.can,
        dayChi: dayCanChi.chi,
        monthCan: monthCanChi.can,
        monthChi: monthCanChi.chi,
    };

    return {
        lunarDate,
        solarDate,
        isLeapYear: false, // Cần tính thêm
        solarTerm: solarTermNames[solarTerm] || "Không xác định",
        nextSolarTerm: "",
        daysInMonth: 30, // Cần tính thêm
    };
}

/**
 * Chuyển đổi ngày âm lịch sang dương lịch
 */
export function lunarToSolar(
    lunarYear: number,
    lunarMonth: number,
    lunarDay: number,
    isLeapMonth: boolean = false
): Date {
    const lunarLeap = isLeapMonth ? 1 : 0;
    const solarResult = convertLunar2Solar(
        lunarDay,
        lunarMonth,
        lunarYear,
        lunarLeap,
        VIETNAM_TIMEZONE
    );

    return new Date(solarResult.year, solarResult.month - 1, solarResult.day);
}

/**
 * Lấy thông tin chi tiết về ngày âm lịch hiện tại
 */
export function getCurrentLunarDate(): LunarInfo {
    return solarToLunar(new Date());
}

/**
 * Kiểm tra năm nhuận âm lịch
 */
export function isLunarLeapYear(year: number): boolean {
    const a11 = getLunarMonth11(year, VIETNAM_TIMEZONE);
    const b11 = getLunarMonth11(year + 1, VIETNAM_TIMEZONE);
    return b11 - a11 > 365;
}
