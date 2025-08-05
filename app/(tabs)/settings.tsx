import { DynamicIconDemo } from "@/components/DynamicIconDemo";
import { TimePicker } from "@/components/TimePicker";
import WidgetPreview from "@/components/WidgetPreview";
import WidgetPreviewDemo from "@/components/WidgetPreviewDemo";
import { useDailyImage } from "@/hooks/useDailyImage";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import { useWidgetManager } from "@/hooks/useWidgetManager";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Alert,
    ImageBackground,
    Platform,
    ScrollView,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SettingsScreen() {
    const [showIconDemo, setShowIconDemo] = useState(false);
    const [showWidgetDemo, setShowWidgetDemo] = useState(false);
    const { settings, loading, updateSettings, testNotification } =
        useNotificationSettings();
    const { widgets, addWidget, showWidgetGuide } = useWidgetManager();
    const dailyImage = useDailyImage();

    const handleNotificationToggle = async (enabled: boolean) => {
        const success = await updateSettings({
            ...settings,
            enabled,
        });

        if (success && enabled) {
            Alert.alert(
                "Thông báo đã được bật! 🔔",
                "Bạn sẽ nhận thông báo hàng ngày vào lúc " +
                    settings.hour.toString().padStart(2, "0") +
                    ":" +
                    settings.minute.toString().padStart(2, "0") +
                    ".\n\n" +
                    "Hãy thử nghiệm thông báo để đảm bảo mọi thứ hoạt động tốt!",
                [
                    {
                        text: "Thử nghiệm ngay",
                        onPress: () => handleTestNotification(),
                    },
                    {
                        text: "Đóng",
                        style: "cancel",
                    },
                ]
            );
        } else if (!success) {
            Alert.alert(
                "Lỗi",
                "Không thể cập nhật cài đặt thông báo. Vui lòng thử lại."
            );
        }
    };

    const handleTimeChange = async (hour: number, minute: number) => {
        const success = await updateSettings({
            ...settings,
            hour,
            minute,
        });

        if (success) {
            Alert.alert(
                "Thời gian đã được cập nhật! ⏰",
                "Thông báo sẽ được gửi hàng ngày vào lúc " +
                    hour.toString().padStart(2, "0") +
                    ":" +
                    minute.toString().padStart(2, "0") +
                    "."
            );
        } else {
            Alert.alert(
                "Lỗi",
                "Không thể cập nhật thời gian thông báo. Vui lòng thử lại."
            );
        }
    };

    const handleTestNotification = async () => {
        try {
            const success = await testNotification();
            if (success) {
                Alert.alert(
                    "Thành công! 🎉",
                    "Thông báo thử nghiệm đã được gửi thành công!\n\n" +
                        "Bạn sẽ nhận thông báo hàng ngày vào lúc " +
                        settings.hour.toString().padStart(2, "0") +
                        ":" +
                        settings.minute.toString().padStart(2, "0") +
                        " với thông tin chi tiết về ngày hôm đó và các sự kiện sắp đến.\n\n" +
                        "Hãy kiểm tra thanh thông báo của bạn để xem thông báo mẫu!"
                );
            } else {
                Alert.alert(
                    "Lỗi",
                    "Không thể gửi thông báo thử nghiệm. Vui lòng thử lại."
                );
            }
        } catch (error: any) {
            if (error.message === "PERMISSION_DENIED") {
                Alert.alert(
                    "Quyền thông báo bị từ chối",
                    "Để nhận thông báo hàng ngày, vui lòng:\n\n" +
                        "1. Vào Cài đặt > Ứng dụng > Văn Sử Lịch\n" +
                        "2. Chọn Quyền > Thông báo\n" +
                        "3. Bật quyền thông báo\n\n" +
                        "Hoặc bạn có thể thử lại bằng cách nhấn nút 'Thử nghiệm thông báo'.",
                    [
                        {
                            text: "Thử lại",
                            onPress: () => handleTestNotification(),
                        },
                        {
                            text: "Đóng",
                            style: "cancel",
                        },
                    ]
                );
            } else {
                Alert.alert(
                    "Lỗi",
                    "Không thể gửi thông báo thử nghiệm. Vui lòng thử lại."
                );
            }
        }
    };

    return (
        <ScrollView className="flex-1 bg-gray-50">
            <View className="mt-10 p-2">
                {/* Header với background image */}
                <ImageBackground
                    source={{
                        uri:
                            dailyImage ||
                            "https://images.unsplash.com/photo-1545172538-171a802bd867?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    }}
                    className="overflow-hidden mb-6 shadow-2xl rounded-b-2xl relative"
                    imageStyle={{ opacity: 0.9 }}
                >
                    <View className="bg-black/30 pt-16 pb-8">
                        <View className="self-center bg-white/30 backdrop-blur-xl rounded-full px-6 py-2 mb-4 shadow-lg border border-white/30">
                            <Text className="text-xl font-semibold text-center text-white">
                                Cài đặt
                            </Text>
                        </View>
                        <Text className="text-3xl font-medium text-center text-white mb-4 drop-shadow-lg">
                            Tùy chỉnh ứng dụng
                        </Text>
                        <Text className="text-lg text-center text-blue-200 mb-6 drop-shadow-lg">
                            Quản lý thông báo và tính năng
                        </Text>
                    </View>
                </ImageBackground>

                {/* Thông báo hàng ngày */}
                <View className="mb-6">
                    <View className="flex-row items-center mb-4">
                        <View className="bg-blue-500 rounded-full p-2 mr-3">
                            <Feather name="bell" size={20} color="white" />
                        </View>
                        <Text className="text-xl font-semibold text-gray-800">
                            Thông báo hàng ngày
                        </Text>
                    </View>

                    {Platform.OS === "android" && (
                        <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
                            <View className="flex-row items-center justify-between mb-4">
                                <View className="flex-row items-center">
                                    <Ionicons
                                        name="notifications"
                                        size={20}
                                        color="#667eea"
                                    />
                                    <Text className="text-gray-800 font-semibold text-lg ml-2">
                                        Bật thông báo
                                    </Text>
                                </View>
                                <Switch
                                    value={settings.enabled}
                                    onValueChange={handleNotificationToggle}
                                    trackColor={{
                                        false: "#767577",
                                        true: "#667eea",
                                    }}
                                    thumbColor={
                                        settings.enabled ? "#ffffff" : "#f4f3f4"
                                    }
                                />
                            </View>

                            {settings.enabled && (
                                <>
                                    <View className="border-t border-gray-100 pt-4">
                                        <View className="flex-row items-center mb-3">
                                            <Ionicons
                                                name="time"
                                                size={18}
                                                color="#667eea"
                                            />
                                            <Text className="text-gray-700 font-medium ml-2">
                                                Thời gian thông báo
                                            </Text>
                                        </View>
                                        <TimePicker
                                            hour={settings.hour}
                                            minute={settings.minute}
                                            onTimeChange={handleTimeChange}
                                        />

                                        <TouchableOpacity
                                            className="bg-green-500 rounded-xl p-4 mt-4 items-center"
                                            onPress={handleTestNotification}
                                        >
                                            <View className="flex-row items-center">
                                                <Ionicons
                                                    name="checkmark-circle"
                                                    size={20}
                                                    color="white"
                                                />
                                                <Text className="text-white font-semibold text-lg ml-2">
                                                    Thử nghiệm thông báo
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </View>
                    )}

                    {Platform.OS !== "android" && (
                        <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
                            <View className="flex-row items-center">
                                <Ionicons
                                    name="information-circle"
                                    size={20}
                                    color="#f59e0b"
                                />
                                <Text className="text-gray-600 ml-2">
                                    Tính năng thông báo chỉ khả dụng trên
                                    Android
                                </Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Tính năng */}
                <View className="mb-6">
                    <View className="flex-row items-center mb-4">
                        <View className="bg-purple-500 rounded-full p-2 mr-3">
                            <Feather name="zap" size={20} color="white" />
                        </View>
                        <Text className="text-xl font-semibold text-gray-800">
                            Tính năng
                        </Text>
                    </View>

                    <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
                        <TouchableOpacity
                            className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-4 items-center"
                            onPress={() => setShowIconDemo(!showIconDemo)}
                        >
                            <View className="flex-row items-center">
                                <Ionicons name="moon" size={24} color="white" />
                                <Text className="text-white font-semibold text-lg ml-2">
                                    {showIconDemo ? "Ẩn" : "Hiển thị"} Icon động
                                    theo ngày âm lịch
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {showIconDemo && (
                        <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
                            <DynamicIconDemo />
                        </View>
                    )}
                </View>

                {/* Widget */}
                <View className="mb-6">
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center">
                            <View className="bg-orange-500 rounded-full p-2 mr-3">
                                <Feather name="grid" size={20} color="white" />
                            </View>
                            <Text className="text-xl font-semibold text-gray-800">
                                Widget màn hình chính
                            </Text>
                        </View>
                        <View className="flex-row space-x-2">
                            <TouchableOpacity
                                className="bg-blue-100 rounded-full px-3 py-1"
                                onPress={showWidgetGuide}
                            >
                                <Text className="text-blue-600 text-sm font-medium">
                                    Hướng dẫn
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="bg-green-100 rounded-full px-3 py-1"
                                onPress={() =>
                                    setShowWidgetDemo(!showWidgetDemo)
                                }
                            >
                                <Text className="text-green-600 text-sm font-medium">
                                    {showWidgetDemo ? "Ẩn" : "Xem"} Demo
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {Platform.OS === "android" ? (
                        <View>
                            {showWidgetDemo && (
                                <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
                                    <WidgetPreviewDemo />
                                </View>
                            )}
                            {widgets.map((widget) => (
                                <WidgetPreview
                                    key={widget.id}
                                    type={widget.type}
                                    title={widget.title}
                                    description={widget.description}
                                    onAddWidget={() => addWidget(widget.id)}
                                />
                            ))}
                        </View>
                    ) : (
                        <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
                            <View className="flex-row items-center">
                                <Ionicons
                                    name="information-circle"
                                    size={20}
                                    color="#f59e0b"
                                />
                                <Text className="text-gray-600 ml-2">
                                    Tính năng widget chỉ khả dụng trên Android
                                </Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Thông tin */}
                <View className="mb-6">
                    <View className="flex-row items-center mb-4">
                        <View className="bg-green-500 rounded-full p-2 mr-3">
                            <Feather name="info" size={20} color="white" />
                        </View>
                        <Text className="text-xl font-semibold text-gray-800">
                            Thông tin
                        </Text>
                    </View>

                    <View className="bg-white rounded-xl p-4 shadow-sm">
                        <View className="space-y-2">
                            <View className="flex-row items-center">
                                <Ionicons
                                    name="phone-portrait"
                                    size={16}
                                    color="#667eea"
                                />
                                <Text className="text-gray-700 ml-2">
                                    • App: Vạn Sử Lịch
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Ionicons
                                    name="code"
                                    size={16}
                                    color="#667eea"
                                />
                                <Text className="text-gray-700 ml-2">
                                    • Phiên bản: 1.0.0
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Ionicons
                                    name="calendar"
                                    size={16}
                                    color="#667eea"
                                />
                                <Text className="text-gray-700 ml-2">
                                    • Tính năng: Lịch âm dương Việt Nam
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Ionicons
                                    name="moon"
                                    size={16}
                                    color="#667eea"
                                />
                                <Text className="text-gray-700 ml-2">
                                    • Icon động theo ngày âm lịch
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Ionicons
                                    name="grid"
                                    size={16}
                                    color="#667eea"
                                />
                                <Text className="text-gray-700 ml-2">
                                    • Widget màn hình chính
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
