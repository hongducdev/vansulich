import Heading from "@/components/Heading";
import YearPickerBottomSheet from "@/components/YearPickerBottomSheet";
import {
    dayTypeColor,
    dayTypeLabel,
    dayTypeTextColor,
    getCungHoangDao,
    getDayType,
    type Chi,
    type DayType,
} from "@/constants/DayType";
import {
    getAllHolidays,
    getHolidayBackgroundColor,
    getHolidayColor,
    getHolidaysInMonthWithDistance,
    getNearestHolidayInfo,
    type HolidayInfo,
} from "@/constants/Holidays";
import {
    getCurrentLunarDate,
    solarToLunar,
    type LunarInfo,
} from "@/constants/VILunar";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    lunarInfo?: LunarInfo;
    dayType?: DayType;
    holidays?: HolidayInfo[];
}

const MonthCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
    const [currentLunar, setCurrentLunar] = useState<LunarInfo | null>(null);
    const [showYearPicker, setShowYearPicker] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const colorScheme = useColorScheme();

    useEffect(() => {
        generateCalendarDays();
        updateLunarDate();
        setSelectedYear(currentDate.getFullYear());
    }, [currentDate, selectedDate]);

    const updateLunarDate = () => {
        const lunarInfo = getCurrentLunarDate();
        setCurrentLunar(lunarInfo);
    };

    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const startDate = new Date(firstDayOfMonth);
        const firstDayWeekday = firstDayOfMonth.getDay();
        startDate.setDate(startDate.getDate() - firstDayWeekday);

        const days: CalendarDay[] = [];
        const today = new Date();

        for (let week = 0; week < 6; week++) {
            for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + week * 7 + dayOfWeek);

                const isCurrentMonth = date.getMonth() === month;
                const isToday = date.toDateString() === today.toDateString();
                const isSelected =
                    date.toDateString() === selectedDate.toDateString();

                days.push({
                    date,
                    isCurrentMonth,
                    isToday,
                    isSelected,
                    dayType: getDayTypeFromLunar(date),
                    holidays: getAllHolidays(date),
                });
            }
        }

        setCalendarDays(days);
    };

    const goToPreviousMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        );
    };

    const goToNextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        );
    };

    const selectDate = (day: CalendarDay) => {
        setSelectedDate(day.date);
        setCalendarDays((prevDays) =>
            prevDays.map((d) => ({
                ...d,
                isSelected: d.date.toDateString() === day.date.toDateString(),
            }))
        );
    };

    const goToYear = (year: number) => {
        setCurrentDate(new Date(year, currentDate.getMonth(), 1));
        setSelectedYear(year);
        setShowYearPicker(false);
    };

    const toggleYearPicker = () => {
        setShowYearPicker(!showYearPicker);
    };

    const getLunarDay = (date: Date) => {
        try {
            const lunarInfo = solarToLunar(date);
            return `${lunarInfo.lunarDate.day}/${lunarInfo.lunarDate.month}`;
        } catch (error) {
            // Fallback to simplified calculation
            const day = date.getDate();
            const month = date.getMonth() + 1;
            return `${day}/${month}`;
        }
    };

    const getDayTypeFromLunar = (date: Date): DayType | undefined => {
        try {
            const lunarInfo = solarToLunar(date);
            const chi = lunarInfo.lunarDate.dayChi as Chi;
            const lunarDay = lunarInfo.lunarDate.day;
            const cung = getCungHoangDao(lunarDay);
            return getDayType(chi, cung);
        } catch (error) {
            return undefined;
        }
    };

    const formatMonthYear = (date: Date) => {
        return date.toLocaleDateString("vi-VN", {
            month: "long",
            year: "numeric",
        });
    };

    const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    return (
        <>
            <ScrollView className="flex-1 bg-gray-50">
                <View className="mt-10 p-2">
                    {/* Header với background image */}
                    <ImageBackground
                        source={{
                            uri: "https://images.unsplash.com/photo-1545172538-171a802bd867?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        }}
                        className="overflow-hidden mb-6 shadow-2xl rounded-b-2xl relative"
                        imageStyle={{ opacity: 0.9 }}
                    >
                        <View className="bg-black/30 pt-16 pb-8">
                            <View className="flex-row items-center justify-between px-4 mb-4">
                                <TouchableOpacity
                                    onPress={goToPreviousMonth}
                                    className="bg-white/30 backdrop-blur-xl rounded-full p-3"
                                >
                                    <Ionicons
                                        name="chevron-back"
                                        size={24}
                                        color="white"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={toggleYearPicker}
                                    className="bg-white/30 backdrop-blur-xl rounded-full px-6 py-2"
                                >
                                    <Text className="text-xl font-semibold text-center text-white">
                                        {formatMonthYear(currentDate)}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={goToNextMonth}
                                    className="bg-white/30 backdrop-blur-xl rounded-full p-3"
                                >
                                    <Ionicons
                                        name="chevron-forward"
                                        size={24}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>

                    {/* Calendar Grid */}
                    <View className="mb-6">
                        <Heading
                            title="Lịch tháng"
                            icon={
                                <Feather
                                    name="calendar"
                                    size={16}
                                    color="white"
                                />
                            }
                        />

                        <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
                            <Text className="text-gray-600 text-sm mb-2 font-medium">
                                Chú thích:
                            </Text>
                            <View className="flex-row gap-4 flex-wrap">
                                <View className="flex-row items-center">
                                    <View className="w-4 h-4 bg-green-100 rounded mr-2"></View>
                                    <Text className="text-sm text-gray-600">
                                        Hoàng đạo
                                    </Text>
                                </View>
                                <View className="flex-row items-center">
                                    <View className="w-4 h-4 bg-gray-100 rounded mr-2"></View>
                                    <Text className="text-sm text-gray-600">
                                        Hắc đạo
                                    </Text>
                                </View>
                                <View className="flex-row items-center">
                                    <View className="w-4 h-4 bg-red-100 rounded mr-2"></View>
                                    <Text className="text-sm text-gray-600">
                                        Ngày lễ
                                    </Text>
                                </View>
                                <View className="flex-row items-center">
                                    <View className="w-4 h-4 bg-orange-100 rounded mr-2"></View>
                                    <Text className="text-sm text-gray-600">
                                        Mùng 1/Rằm
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View className="bg-white rounded-xl p-4 shadow-sm">
                            {/* Week days header */}
                            <View className="flex-row mb-2">
                                {weekDays.map((day, index) => (
                                    <View
                                        key={index}
                                        className="flex-1 items-center py-2"
                                    >
                                        <Text className="text-gray-600 font-semibold text-sm">
                                            {day}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            {/* Calendar days */}
                            <View>
                                {Array.from({ length: 6 }, (_, weekIndex) => (
                                    <View key={weekIndex} className="flex-row">
                                        {calendarDays
                                            .slice(
                                                weekIndex * 7,
                                                (weekIndex + 1) * 7
                                            )
                                            .map((day, dayIndex) => (
                                                <TouchableOpacity
                                                    key={dayIndex}
                                                    onPress={() =>
                                                        selectDate(day)
                                                    }
                                                    style={{
                                                        width: (width - 32) / 7,
                                                        height: 64,
                                                    }}
                                                    className={`items-center justify-center border border-gray-100 ${
                                                        day.isSelected
                                                            ? "bg-blue-300"
                                                            : day.isToday
                                                              ? "bg-blue-500"
                                                              : day.isCurrentMonth
                                                                ? day.dayType
                                                                    ? dayTypeColor[
                                                                          day
                                                                              .dayType
                                                                      ]
                                                                    : "bg-white"
                                                                : "bg-gray-50"
                                                    }`}
                                                >
                                                    <Text
                                                        className={`text-sm font-medium ${
                                                            day.isSelected
                                                                ? "text-blue-800"
                                                                : day.isToday
                                                                  ? "text-white"
                                                                  : day.isCurrentMonth
                                                                    ? day.holidays &&
                                                                      day
                                                                          .holidays
                                                                          .length >
                                                                          0
                                                                        ? "text-red-600"
                                                                        : "text-gray-800"
                                                                    : "text-gray-400"
                                                        }`}
                                                    >
                                                        {day.date.getDate()}
                                                    </Text>
                                                    <Text
                                                        className={`text-xs ${
                                                            day.isSelected
                                                                ? "text-white"
                                                                : day.isToday
                                                                  ? "text-white"
                                                                  : day.isCurrentMonth
                                                                    ? "text-gray-500"
                                                                    : "text-gray-300"
                                                        }`}
                                                    >
                                                        {getLunarDay(day.date)}
                                                    </Text>
                                                    {day.holidays &&
                                                        day.holidays.length >
                                                            0 && (
                                                            <View className="w-1 h-1 bg-red-500 rounded-full mt-1" />
                                                        )}
                                                </TouchableOpacity>
                                            ))}
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>

                    {/* Selected Date Info */}
                    <View className="mb-6">
                        <Heading
                            title="Thông tin ngày được chọn"
                            icon={
                                <Feather name="info" size={16} color="white" />
                            }
                        />

                        <View className="bg-white rounded-xl p-4 shadow-sm">
                            <View className="flex-row items-center justify-between mb-3">
                                <Text className="text-gray-800 font-semibold text-lg">
                                    {selectedDate.toLocaleDateString("vi-VN", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </Text>
                                <View className="bg-blue-100 rounded-full px-3 py-1">
                                    <Text className="text-blue-600 font-medium text-sm">
                                        {selectedDate.toLocaleDateString(
                                            "vi-VN",
                                            {
                                                weekday: "short",
                                            }
                                        )}
                                    </Text>
                                </View>
                            </View>

                            {(() => {
                                try {
                                    const selectedLunar =
                                        solarToLunar(selectedDate);
                                    const selectedDayType =
                                        getDayTypeFromLunar(selectedDate);

                                    return (
                                        <View className="bg-gray-50 rounded-lg p-3">
                                            <Text className="text-gray-600 text-sm mb-1">
                                                Âm lịch:
                                            </Text>
                                            <Text className="text-gray-800 font-medium">
                                                Ngày{" "}
                                                {selectedLunar.lunarDate.day}{" "}
                                                tháng{" "}
                                                {selectedLunar.lunarDate.month}{" "}
                                                năm{" "}
                                                {selectedLunar.lunarDate.year}
                                            </Text>
                                            <Text className="text-gray-600 text-sm mt-1">
                                                {selectedLunar.lunarDate.dayCan}{" "}
                                                {selectedLunar.lunarDate.dayChi}{" "}
                                                -{" "}
                                                {
                                                    selectedLunar.lunarDate
                                                        .monthCan
                                                }{" "}
                                                {
                                                    selectedLunar.lunarDate
                                                        .monthChi
                                                }
                                            </Text>

                                            {selectedDayType && (
                                                <View
                                                    className={`mt-3 p-2 rounded-lg ${dayTypeColor[selectedDayType]}`}
                                                >
                                                    <Text
                                                        className={`font-medium text-sm ${dayTypeTextColor[selectedDayType]}`}
                                                    >
                                                        {
                                                            dayTypeLabel[
                                                                selectedDayType
                                                            ]
                                                        }
                                                    </Text>
                                                </View>
                                            )}

                                            {/* Hiển thị ngày lễ */}
                                            {(() => {
                                                const selectedHolidays =
                                                    getAllHolidays(
                                                        selectedDate
                                                    );
                                                if (
                                                    selectedHolidays.length > 0
                                                ) {
                                                    return (
                                                        <View className="mt-3">
                                                            <Text className="text-gray-600 text-sm mb-2">
                                                                Ngày lễ:
                                                            </Text>
                                                            {selectedHolidays.map(
                                                                (
                                                                    holidayInfo,
                                                                    index
                                                                ) => (
                                                                    <View
                                                                        key={
                                                                            index
                                                                        }
                                                                        className={`p-2 rounded-lg mb-1 ${getHolidayBackgroundColor(holidayInfo.type)}`}
                                                                    >
                                                                        <Text
                                                                            className={`font-medium text-sm ${getHolidayColor(holidayInfo.type)}`}
                                                                        >
                                                                            {
                                                                                holidayInfo
                                                                                    .holiday
                                                                                    .name_vi
                                                                            }
                                                                        </Text>
                                                                    </View>
                                                                )
                                                            )}
                                                        </View>
                                                    );
                                                }
                                                return null;
                                            })()}
                                        </View>
                                    );
                                } catch (error) {
                                    return null;
                                }
                            })()}
                        </View>
                    </View>

                    {/* Khoảng cách với ngày lễ */}
                    <View className="mb-6">
                        <Heading
                            title="Khoảng cách với ngày lễ"
                            icon={
                                <Feather
                                    name="calendar"
                                    size={16}
                                    color="white"
                                />
                            }
                        />

                        <View className="bg-white rounded-xl p-4 shadow-sm">
                            {(() => {
                                const today = new Date();
                                const nearestHoliday =
                                    getNearestHolidayInfo(today);
                                const holidaysInMonth =
                                    getHolidaysInMonthWithDistance(
                                        today,
                                        currentDate.getFullYear(),
                                        currentDate.getMonth()
                                    );

                                if (holidaysInMonth.length === 0) {
                                    return (
                                        <Text className="text-gray-500 text-center py-4">
                                            Không có ngày lễ nào trong tháng này
                                        </Text>
                                    );
                                }

                                return (
                                    <View>
                                        {nearestHoliday && (
                                            <View className="mb-4 p-3 bg-blue-50 rounded-lg">
                                                <Text className="text-blue-600 font-semibold text-sm mb-1">
                                                    Ngày lễ gần nhất:
                                                </Text>
                                                <Text className="text-blue-800 font-medium">
                                                    {
                                                        nearestHoliday.holiday
                                                            .holiday.name_vi
                                                    }
                                                </Text>
                                                <Text className="text-blue-600 text-sm">
                                                    Còn{" "}
                                                    {nearestHoliday.daysUntil}{" "}
                                                    ngày
                                                </Text>
                                            </View>
                                        )}

                                        <Text className="text-gray-600 text-sm mb-2 font-medium">
                                            Tất cả ngày lễ trong tháng:
                                        </Text>
                                        {holidaysInMonth
                                            .slice(0, 5)
                                            .map((holidayData, index) => (
                                                <View
                                                    key={index}
                                                    className={`p-3 rounded-lg mb-2 ${getHolidayBackgroundColor(holidayData.holiday.type)}`}
                                                >
                                                    <View className="flex-row justify-between items-center">
                                                        <View className="flex-1">
                                                            <Text
                                                                className={`font-medium text-sm ${getHolidayColor(holidayData.holiday.type)}`}
                                                            >
                                                                {
                                                                    holidayData
                                                                        .holiday
                                                                        .holiday
                                                                        .name_vi
                                                                }
                                                            </Text>
                                                            <Text className="text-gray-600 text-xs">
                                                                {holidayData.date.toLocaleDateString(
                                                                    "vi-VN",
                                                                    {
                                                                        day: "numeric",
                                                                        month: "long",
                                                                        year: "numeric",
                                                                    }
                                                                )}
                                                            </Text>
                                                        </View>
                                                        <View className="bg-gray-100 rounded-full px-2 py-1">
                                                            <Text className="text-gray-600 text-xs font-medium">
                                                                {holidayData.daysUntil ===
                                                                0
                                                                    ? "Hôm nay"
                                                                    : holidayData.daysUntil >
                                                                        0
                                                                      ? `+${holidayData.daysUntil} ngày`
                                                                      : `${Math.abs(holidayData.daysUntil)} ngày trước`}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            ))}
                                        {holidaysInMonth.length > 5 && (
                                            <Text className="text-gray-500 text-center text-sm mt-2">
                                                Và {holidaysInMonth.length - 5}{" "}
                                                ngày lễ khác...
                                            </Text>
                                        )}
                                    </View>
                                );
                            })()}
                        </View>
                    </View>

                    {/* Quick Actions */}
                    <View className="mb-6">
                        <Heading
                            title="Thao tác nhanh"
                            icon={
                                <Feather name="zap" size={16} color="white" />
                            }
                        />

                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                className="flex-1 bg-blue-500 rounded-xl p-4 items-center"
                                onPress={() => {
                                    const today = new Date();
                                    setSelectedDate(today);
                                    setCurrentDate(today);
                                    setTimeout(() => {
                                        setCalendarDays((prevDays) =>
                                            prevDays.map((d) => ({
                                                ...d,
                                                isSelected:
                                                    d.date.toDateString() ===
                                                    today.toDateString(),
                                            }))
                                        );
                                    }, 100);
                                }}
                            >
                                <Ionicons
                                    name="today"
                                    size={24}
                                    color="white"
                                />
                                <Text className="text-white font-medium mt-2">
                                    Hôm nay
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="flex-1 bg-green-500 rounded-xl p-4 items-center"
                                onPress={() => {
                                    // TODO: Implement add event functionality
                                }}
                            >
                                <Ionicons name="add" size={24} color="white" />
                                <Text className="text-white font-medium mt-2">
                                    Thêm sự kiện
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="flex-1 bg-purple-500 rounded-xl p-4 items-center"
                                onPress={() => {
                                    // TODO: Implement settings functionality
                                }}
                            >
                                <Ionicons
                                    name="settings"
                                    size={24}
                                    color="white"
                                />
                                <Text className="text-white font-medium mt-2">
                                    Cài đặt
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Year Picker Bottom Sheet */}
            <YearPickerBottomSheet
                visible={showYearPicker}
                onClose={() => setShowYearPicker(false)}
                selectedYear={selectedYear}
                onYearSelect={goToYear}
            />
        </>
    );
};

export default MonthCalendar;
