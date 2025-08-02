import Heading from "@/components/Heading";
import LunarInfoCard from "@/components/ui/LunarInfoCard";
import { getTodayAuspiciousHours, HourInfo } from "@/constants/AuspiciousHours";
import { getCurrentLunarDate, type LunarInfo } from "@/constants/VILunar";
import { Feather } from "@expo/vector-icons";
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
    const [auspiciousHours, setAuspiciousHours] = useState<any>(null);

    useEffect(() => {
        updateLunarDate();
        updateAuspiciousHours();
    }, []);

    const updateLunarDate = () => {
        const lunarInfo = getCurrentLunarDate();
        setCurrentLunar(lunarInfo);
    };

    const updateAuspiciousHours = () => {
        const hours = getTodayAuspiciousHours();
        setAuspiciousHours(hours);
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

    if (!currentLunar || !auspiciousHours) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-lg">Đang tải thông tin âm lịch...</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-gray-50">
            <View className="mt-10 p-2">
                {/* Header với background image */}
                <ImageBackground
                    source={{
                        uri: "https://images.unsplash.com/photo-1545172538-171a802bd867?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    }}
                    className="overflow-hidden mb-6 shadow-2xl rounded-b-2xl relative after:absolute after:top-0 after:left-0 after:w-full after:h-[20%] after:bg-gradient-to-b after:from-white after:to-transparent"
                    imageStyle={{ opacity: 0.9 }}
                >
                    <View className="bg-black/30 pt-16">
                        <View className="self-center bg-white/30 backdrop-blur-xl rounded-full px-6 py-2 mb-16 shadow-lg border border-white/30">
                            <Text className="text-xl font-semibold text-center text-white">
                                {selectedDate.toLocaleDateString("vi-VN", {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </Text>
                        </View>
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
                        <View className="self-center bg-white/30 backdrop-blur-xl rounded-full px-6 py-2 mb-16 shadow-lg border border-white/30">
                            <Text className="text-white font-semibold text-lg">
                                Âm lịch: {currentLunar.lunarDate.day}/
                                {currentLunar.lunarDate.month}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>

                {/* Thông tin âm lịch chính */}
                <View className="mb-6">
                    <Heading
                        title="Thông tin âm lịch"
                        icon={
                            <Feather name="calendar" size={16} color="white" />
                        }
                    />
                    <View className="flex-row justify-between gap-2 mb-6">
                        <LunarInfoCard
                            type="day"
                            lunarDate={currentLunar.lunarDate.day}
                            lunarCan={currentLunar.lunarDate.dayCan}
                            lunarChi={currentLunar.lunarDate.dayChi}
                        />
                        <LunarInfoCard
                            type="month"
                            lunarDate={currentLunar.lunarDate.month}
                            lunarCan={currentLunar.lunarDate.monthCan}
                            lunarChi={currentLunar.lunarDate.monthChi}
                        />
                        <LunarInfoCard
                            type="year"
                            lunarDate={currentLunar.lunarDate.year}
                            lunarCan={currentLunar.lunarDate.can}
                            lunarChi={currentLunar.lunarDate.chi}
                        />
                    </View>
                </View>
                <View className="mb-6">
                    <Heading
                        title="Giờ Hoàng Đạo"
                        icon={<Feather name="clock" size={16} color="white" />}
                    />
                    <View
                        className="bg-white rounded-xl p-4 mb-4 shadow-sm"
                        style={{ borderRadius: 10 }}
                    >
                        <View className="flex-row items-center justify-between mb-3">
                            <Text className="text-gray-800 font-semibold text-lg">
                                Tất cả giờ hoàng đạo hôm nay
                            </Text>
                            <TouchableOpacity>
                                <Feather
                                    name="info"
                                    size={20}
                                    color="#4CAF50"
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            {auspiciousHours.auspiciousHours.map(
                                (hour: HourInfo, index: number) => (
                                    <View
                                        key={index}
                                        className="flex-row items-center justify-between p-3"
                                    >
                                        <View className="flex-row items-center">
                                            <View>
                                                <Text className="text-gray-800 font-semibold">
                                                    {hour.hour} (
                                                    {hour.startTime} -{" "}
                                                    {hour.endTime})
                                                </Text>
                                                <Text className="text-gray-600 text-sm">
                                                    {hour.description}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
