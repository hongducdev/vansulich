import Heading from "@/components/Heading";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const SettingsScreen = () => {
    return (
        <ScrollView className="flex-1 bg-gray-50">
            <View className="mt-10 p-4">
                <Heading
                    title="Cài đặt"
                    icon={<Feather name="settings" size={16} color="white" />}
                />

                <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                    <Text className="text-lg font-semibold text-gray-800 mb-2">
                        Thông tin ứng dụng
                    </Text>
                    <Text className="text-gray-600">
                        Vạn Sự Lịch - Ứng dụng âm lịch Việt Nam
                    </Text>
                    <Text className="text-gray-600 mt-1">Phiên bản: 1.0.0</Text>
                </View>

                <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                    <Text className="text-lg font-semibold text-gray-800 mb-2">
                        Tính năng
                    </Text>
                    <Text className="text-gray-600">
                        • Xem ngày âm lịch hiện tại
                    </Text>
                    <Text className="text-gray-600">
                        • Thông tin can chi ngày/tháng/năm
                    </Text>
                    <Text className="text-gray-600">
                        • Giờ hoàng đạo trong ngày
                    </Text>
                    <Text className="text-gray-600">• Lịch tháng âm lịch</Text>
                </View>

                <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                    <Text className="text-lg font-semibold text-gray-800 mb-2">
                        Hỗ trợ
                    </Text>
                    <Text className="text-gray-600">
                        Nếu bạn gặp vấn đề hoặc có góp ý, vui lòng liên hệ:
                    </Text>
                    <Text className="text-blue-600 mt-2">
                        support@vansulich.com
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default SettingsScreen;
