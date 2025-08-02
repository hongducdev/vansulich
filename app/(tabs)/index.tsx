import {
    getCurrentLunarDate,
    SOLAR_TERMS,
    type LunarInfo,
} from "@/constants/VILunar";
import React, { useEffect, useState } from "react";
import {
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const HomeScreen = () => {
    const [currentLunar, setCurrentLunar] = useState<LunarInfo | null>(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        updateLunarDate();
    }, []);

    const updateLunarDate = () => {
        const lunarInfo = getCurrentLunarDate();
        setCurrentLunar(lunarInfo);
    };

    const formatLunarDisplay = (lunarInfo: LunarInfo) => {
        const { lunarDate } = lunarInfo;
        const leapText = lunarDate.isLeapMonth ? " nhuận" : "";
        return `Ngày ${lunarDate.dayCan} ${lunarDate.dayChi} - Tháng ${lunarDate.monthCan} ${lunarDate.monthChi}`;
    };

    const formatLunarDateDisplay = (lunarInfo: LunarInfo) => {
        const { lunarDate } = lunarInfo;
        const leapText = lunarDate.isLeapMonth ? " nhuận" : "";
        return `Ngày ${lunarDate.day} tháng ${lunarDate.monthName}${leapText} năm ${lunarDate.can} ${lunarDate.chi}`;
    };

    if (!currentLunar) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-lg">Đang tải thông tin âm lịch...</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-gray-50">
            <View className="p-4 mt-10">
                {/* Header với background image */}
                <ImageBackground
                    source={{
                        uri: "https://images.unsplash.com/photo-1545172538-171a802bd867?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    }}
                    className="rounded-2xl overflow-hidden mb-6 shadow-2xl"
                    imageStyle={{ opacity: 0.9 }}
                >
                    <View className="bg-black/30 pt-16">
                        <View className="self-center bg-white/30 backdrop-blur-xl rounded-full px-6 py-2 mb-20 shadow-lg border border-white/30">
                            <Text className="text-xl font-semibold text-center text-white">
                                {selectedDate.toLocaleDateString("vi-VN", {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </Text>
                        </View>
                        <View className="">
                            <Text className="text-3xl font-medium text-center text-white mb-4 drop-shadow-lg">
                                {selectedDate.toLocaleDateString("vi-VN", {
                                    weekday: "long",
                                })}
                            </Text>
                            <Text className="text-[120px] font-semibold text-center text-blue-200 mb-6 drop-shadow-2xl leading-none">
                                {selectedDate.toLocaleDateString("vi-VN", {
                                    day: "numeric",
                                })}
                            </Text>

                            <View className="self-center bg-white/25 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-white/40">
                                <Text className="text-white font-semibold text-lg">
                                    Âm lịch: {currentLunar.lunarDate.day}/
                                    {currentLunar.lunarDate.month}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                {/* Thông tin âm lịch chính */}
                <View className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-xl border border-white/50">
                    <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        📅 Thông tin âm lịch
                    </Text>

                    <View className="space-y-4">
                        <View className="flex-row justify-between items-center bg-white/60 rounded-xl p-4 shadow-sm">
                            <Text className="text-gray-700 font-semibold">
                                Ngày âm lịch:
                            </Text>
                            <Text className="text-gray-900 font-bold text-right flex-1 ml-4">
                                {formatLunarDateDisplay(currentLunar)}
                            </Text>
                        </View>

                        <View className="flex-row justify-between items-center bg-white/60 rounded-xl p-4 shadow-sm">
                            <Text className="text-gray-700 font-semibold">
                                Can Chi ngày:
                            </Text>
                            <Text className="text-gray-900 font-bold text-right flex-1 ml-4">
                                {formatLunarDisplay(currentLunar)}
                            </Text>
                        </View>

                        <View className="flex-row justify-between items-center bg-white/60 rounded-xl p-4 shadow-sm">
                            <Text className="text-gray-700 font-semibold">
                                Năm âm lịch:
                            </Text>
                            <Text className="text-gray-900 font-bold text-right flex-1 ml-4">
                                {currentLunar.isLeapYear
                                    ? "Năm nhuận"
                                    : "Năm thường"}
                            </Text>
                        </View>

                        <View className="flex-row justify-between items-center bg-white/60 rounded-xl p-4 shadow-sm">
                            <Text className="text-gray-700 font-semibold">
                                Tháng âm lịch:
                            </Text>
                            <Text className="text-gray-900 font-bold text-right flex-1 ml-4">
                                {currentLunar.lunarDate.isLeapMonth
                                    ? "Tháng nhuận"
                                    : "Tháng thường"}{" "}
                                - {currentLunar.daysInMonth} ngày
                            </Text>
                        </View>

                        <View className="flex-row justify-between items-center bg-white/60 rounded-xl p-4 shadow-sm">
                            <Text className="text-gray-700 font-semibold">
                                Thứ:
                            </Text>
                            <Text className="text-gray-900 font-bold text-right flex-1 ml-4">
                                {currentLunar.lunarDate.weekday}
                            </Text>
                        </View>

                        <View className="flex-row justify-between items-center bg-white/60 rounded-xl p-4 shadow-sm">
                            <Text className="text-gray-700 font-semibold">
                                Trung khí:
                            </Text>
                            <Text className="text-gray-900 font-bold text-right flex-1 ml-4">
                                {currentLunar.solarTerm}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Thông tin chi tiết */}
                <View className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-xl border border-white/50">
                    <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        🔍 Thông tin chi tiết
                    </Text>

                    <View className="space-y-4">
                        <View className="flex-row justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 shadow-sm border border-blue-100">
                            <Text className="text-gray-700 font-semibold">
                                Can ngày:
                            </Text>
                            <Text className="text-blue-900 font-bold text-right flex-1 ml-4">
                                {currentLunar.lunarDate.dayCan}
                            </Text>
                        </View>

                        <View className="flex-row justify-between items-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 shadow-sm border border-green-100">
                            <Text className="text-gray-700 font-semibold">
                                Chi ngày:
                            </Text>
                            <Text className="text-green-900 font-bold text-right flex-1 ml-4">
                                {currentLunar.lunarDate.dayChi}
                            </Text>
                        </View>

                        <View className="flex-row justify-between items-center bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 shadow-sm border border-purple-100">
                            <Text className="text-gray-700 font-semibold">
                                Can tháng:
                            </Text>
                            <Text className="text-purple-900 font-bold text-right flex-1 ml-4">
                                {currentLunar.lunarDate.monthCan}
                            </Text>
                        </View>

                        <View className="flex-row justify-between items-center bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 shadow-sm border border-orange-100">
                            <Text className="text-gray-700 font-semibold">
                                Chi tháng:
                            </Text>
                            <Text className="text-orange-900 font-bold text-right flex-1 ml-4">
                                {currentLunar.lunarDate.monthChi}
                            </Text>
                        </View>

                        <View className="flex-row justify-between items-center bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 shadow-sm border border-red-100">
                            <Text className="text-gray-700 font-semibold">
                                Can Chi năm:
                            </Text>
                            <Text className="text-red-900 font-bold text-right flex-1 ml-4">
                                {currentLunar.lunarDate.can}{" "}
                                {currentLunar.lunarDate.chi}
                            </Text>
                        </View>

                        <View className="flex-row justify-between items-center bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 shadow-sm border border-teal-100">
                            <Text className="text-gray-700 font-semibold">
                                Tên tháng:
                            </Text>
                            <Text className="text-teal-900 font-bold text-right flex-1 ml-4">
                                {currentLunar.lunarDate.monthName}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Danh sách Trung khí */}
                <View className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-xl border border-white/50">
                    <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        🌿 24 Trung khí
                    </Text>

                    <View className="flex-row flex-wrap">
                        {SOLAR_TERMS.map((term: string, index: number) => (
                            <View key={index} className="w-1/2 mb-3">
                                <View className="bg-white/70 rounded-lg p-3 shadow-sm border border-gray-100">
                                    <Text className="text-sm text-gray-700 font-medium">
                                        {index + 1}. {term}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Nút cập nhật */}
                <TouchableOpacity
                    className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 items-center shadow-xl"
                    onPress={updateLunarDate}
                >
                    <Text className="text-white font-bold text-lg">
                        🔄 Cập nhật thông tin
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
