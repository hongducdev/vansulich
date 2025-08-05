import { useEffect, useState } from "react";
import { NativeModules, PermissionsAndroid, Platform } from "react-native";

const { NotificationModule } = NativeModules;

// Debug: Log all available native modules
console.log("Available NativeModules:", Object.keys(NativeModules));
console.log("NotificationModule:", NotificationModule);

interface NotificationSettings {
    enabled: boolean;
    hour: number;
    minute: number;
}

export const useNotificationSettings = () => {
    const [settings, setSettings] = useState<NotificationSettings>({
        enabled: false,
        hour: 8,
        minute: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            if (Platform.OS === "android" && NotificationModule) {
                const savedSettings =
                    await NotificationModule.getNotificationSettings();
                setSettings(savedSettings);
            } else {
                console.log("NotificationModule not available");
            }
        } catch (error) {
            console.error("Error loading notification settings:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateSettings = async (newSettings: NotificationSettings) => {
        try {
            if (Platform.OS === "android" && NotificationModule) {
                await NotificationModule.scheduleNotification(newSettings);
                setSettings(newSettings);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error updating notification settings:", error);
            return false;
        }
    };

    const checkNotificationPermission = async () => {
        try {
            if (Platform.OS === "android" && NotificationModule) {
                // Kiểm tra xem method có tồn tại không
                if (NotificationModule.checkNotificationPermission) {
                    const hasPermission =
                        await NotificationModule.checkNotificationPermission();
                    return hasPermission;
                } else {
                    // Fallback: kiểm tra quyền trực tiếp
                    return await requestNotificationPermission();
                }
            }
            return true;
        } catch (error) {
            console.error("Error checking notification permission:", error);
            return false;
        }
    };

    const requestNotificationPermission = async () => {
        try {
            if (Platform.OS === "android") {
                if (Platform.Version >= 33) {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                        {
                            title: "Quyền thông báo",
                            message:
                                "Ứng dụng cần quyền thông báo để gửi thông báo hàng ngày",
                            buttonNeutral: "Hỏi lại sau",
                            buttonNegative: "Từ chối",
                            buttonPositive: "Đồng ý",
                        }
                    );
                    return granted === PermissionsAndroid.RESULTS.GRANTED;
                }
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error requesting notification permission:", error);
            return false;
        }
    };

    const testNotification = async () => {
        try {
            if (Platform.OS === "android" && NotificationModule) {
                // Kiểm tra quyền trước
                const hasPermission = await checkNotificationPermission();
                if (!hasPermission) {
                    // Xin quyền nếu chưa có
                    const granted = await requestNotificationPermission();
                    if (!granted) {
                        throw new Error("PERMISSION_DENIED");
                    }
                }

                await NotificationModule.testNotification();
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error testing notification:", error);
            if (error === "PERMISSION_DENIED") {
                throw new Error("PERMISSION_DENIED");
            }
            return false;
        }
    };

    return {
        settings,
        loading,
        updateSettings,
        testNotification,
        checkNotificationPermission,
        requestNotificationPermission,
    };
};
