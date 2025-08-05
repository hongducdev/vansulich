import { useState } from "react";
import { Alert, Platform } from "react-native";

interface WidgetInfo {
    id: string;
    type:
        | "calendar"
        | "events"
        | "lunar"
        | "small-date"
        | "small-events"
        | "large-calendar"
        | "large-events";
    title: string;
    description: string;
    isAdded: boolean;
}

export const useWidgetManager = () => {
    const [widgets, setWidgets] = useState<WidgetInfo[]>([
        {
            id: "small-date",
            type: "small-date",
            title: "Widget Ngày Nhỏ",
            description: "Hiển thị ngày dương lịch và âm lịch",
            isAdded: false,
        },
        {
            id: "small-events",
            type: "small-events",
            title: "Widget Sự kiện Nhỏ",
            description: "Hiển thị các sự kiện sắp đến",
            isAdded: false,
        },
        {
            id: "large-calendar",
            type: "large-calendar",
            title: "Widget Lịch Lớn",
            description: "Hiển thị lịch tuần với thông tin âm lịch",
            isAdded: false,
        },
        {
            id: "large-events",
            type: "large-events",
            title: "Widget Sự kiện Lớn",
            description: "Hiển thị sự kiện sắp đến với số ngày còn lại",
            isAdded: false,
        },
    ]);

    const addWidget = (widgetId: string) => {
        if (Platform.OS !== "android") {
            Alert.alert(
                "Không hỗ trợ",
                "Tính năng widget chỉ khả dụng trên Android"
            );
            return;
        }

        setWidgets((prevWidgets) =>
            prevWidgets.map((widget) =>
                widget.id === widgetId ? { ...widget, isAdded: true } : widget
            )
        );

        Alert.alert(
            "Thêm widget thành công! 🎉",
            "Widget đã được thêm vào màn hình chính. Bạn có thể tùy chỉnh vị trí và kích thước widget.",
            [
                {
                    text: "Hướng dẫn",
                    onPress: () => showWidgetGuide(),
                },
                {
                    text: "Đóng",
                    style: "cancel",
                },
            ]
        );
    };

    const removeWidget = (widgetId: string) => {
        setWidgets((prevWidgets) =>
            prevWidgets.map((widget) =>
                widget.id === widgetId ? { ...widget, isAdded: false } : widget
            )
        );

        Alert.alert("Xóa widget", "Widget đã được xóa khỏi màn hình chính.");
    };

    const showWidgetGuide = () => {
        Alert.alert(
            "Hướng dẫn sử dụng Widget",
            "1. Nhấn giữ vào màn hình chính\n" +
                "2. Chọn 'Widget' hoặc 'Tiện ích'\n" +
                "3. Tìm 'Văn Sử Lịch' trong danh sách\n" +
                "4. Kéo widget vào màn hình\n" +
                "5. Tùy chỉnh vị trí và kích thước\n\n" +
                "Widget sẽ tự động cập nhật thông tin hàng ngày!",
            [{ text: "Đã hiểu", style: "default" }]
        );
    };

    const getWidgetStatus = (widgetId: string) => {
        const widget = widgets.find((w) => w.id === widgetId);
        return widget?.isAdded || false;
    };

    return {
        widgets,
        addWidget,
        removeWidget,
        getWidgetStatus,
        showWidgetGuide,
    };
};
