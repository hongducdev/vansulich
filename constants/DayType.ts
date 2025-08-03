export type DayType = "hoang-dao" | "hac-dao" | "thuong";

export type Chi =
    | "Tý"
    | "Sửu"
    | "Dần"
    | "Mão"
    | "Thìn"
    | "Tỵ"
    | "Ngọ"
    | "Mùi"
    | "Thân"
    | "Dậu"
    | "Tuất"
    | "Hợi";

export type CungHoangDao =
    | "Kiến"
    | "Trừ"
    | "Mãn"
    | "Bình"
    | "Định"
    | "Chấp"
    | "Phá"
    | "Nguy"
    | "Thành"
    | "Thâu"
    | "Khai"
    | "Bế";

const cungHoangDaoByDay: Record<number, CungHoangDao> = {
    1: "Kiến",
    2: "Trừ",
    3: "Mãn",
    4: "Bình",
    5: "Định",
    6: "Chấp",
    7: "Phá",
    8: "Nguy",
    9: "Thành",
    10: "Thâu",
    11: "Khai",
    12: "Bế",
    13: "Kiến",
    14: "Trừ",
    15: "Mãn",
    16: "Bình",
    17: "Định",
    18: "Chấp",
    19: "Phá",
    20: "Nguy",
    21: "Thành",
    22: "Thâu",
    23: "Khai",
    24: "Bế",
    25: "Kiến",
    26: "Trừ",
    27: "Mãn",
    28: "Bình",
    29: "Định",
    30: "Chấp",
};

const chiToHoangDaoCung: Record<Chi, CungHoangDao[]> = {
    Tý: ["Kiến", "Trừ", "Mãn"],
    Sửu: ["Thành", "Thâu", "Khai"],
    Dần: ["Định", "Chấp", "Phá"],
    Mão: ["Nguy", "Bình", "Bế"],
    Thìn: ["Kiến", "Thâu", "Định"],
    Tỵ: ["Khai", "Chấp", "Trừ"],
    Ngọ: ["Thành", "Nguy", "Mãn"],
    Mùi: ["Kiến", "Phá", "Bế"],
    Thân: ["Khai", "Chấp", "Thâu"],
    Dậu: ["Trừ", "Nguy", "Bình"],
    Tuất: ["Mãn", "Định", "Phá"],
    Hợi: ["Kiến", "Thành", "Bế"],
};

const chiToHacDaoCung: Record<Chi, CungHoangDao[]> = {
    Tý: ["Phá", "Nguy", "Bế"],
    Sửu: ["Bình", "Chấp", "Định"],
    Dần: ["Kiến", "Khai", "Thâu"],
    Mão: ["Trừ", "Mãn", "Thành"],
    Thìn: ["Nguy", "Phá", "Chấp"],
    Tỵ: ["Bình", "Bế", "Định"],
    Ngọ: ["Kiến", "Trừ", "Thâu"],
    Mùi: ["Nguy", "Mãn", "Khai"],
    Thân: ["Phá", "Bình", "Thành"],
    Dậu: ["Kiến", "Định", "Chấp"],
    Tuất: ["Trừ", "Thâu", "Khai"],
    Hợi: ["Mãn", "Nguy", "Phá"],
};

export function getCungHoangDao(lunarDay: number): CungHoangDao {
    const dayInCycle = ((lunarDay - 1) % 12) + 1;
    return cungHoangDaoByDay[dayInCycle] || "Kiến";
}

export function getDayType(chi: Chi, cung: CungHoangDao): DayType {
    const hoangDao = chiToHoangDaoCung[chi] || [];
    const hacDao = chiToHacDaoCung[chi] || [];

    if (hoangDao.includes(cung)) return "hoang-dao";
    if (hacDao.includes(cung)) return "hac-dao";
    return "thuong";
}

export const dayTypeLabel: Record<DayType, string> = {
    "hoang-dao": "Hoàng đạo (tốt)",
    "hac-dao": "Hắc đạo (xấu)",
    thuong: "Ngày thường",
};

export const dayTypeColor: Record<DayType, string> = {
    "hoang-dao": "bg-green-100",
    "hac-dao": "bg-gray-100",
    thuong: "bg-white",
};

export const dayTypeTextColor: Record<DayType, string> = {
    "hoang-dao": "text-red-800",
    "hac-dao": "text-gray-700",
    thuong: "text-gray-800",
};
