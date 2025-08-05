import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WidgetPreviewLargeCalendar from "./WidgetPreviewLargeCalendar";
import WidgetPreviewLargeEvents from "./WidgetPreviewLargeEvents";
import WidgetPreviewSmallDate from "./WidgetPreviewSmallDate";
import WidgetPreviewSmallEvents from "./WidgetPreviewSmallEvents";

interface WidgetPreviewProps {
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
    onAddWidget: () => void;
}

const WidgetPreview: React.FC<WidgetPreviewProps> = ({
    type,
    title,
    description,
    onAddWidget,
}) => {
    const getWidgetContent = () => {
        switch (type) {
            case "calendar":
                return (
                    <View style={styles.calendarWidget}>
                        <View style={styles.calendarHeader}>
                            <Text style={styles.calendarTitle}>Tháng 1</Text>
                            <Text style={styles.calendarYear}>2024</Text>
                        </View>
                        <View style={styles.calendarGrid}>
                            {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map(
                                (day, index) => (
                                    <Text
                                        key={index}
                                        style={styles.calendarDayHeader}
                                    >
                                        {day}
                                    </Text>
                                )
                            )}
                            {Array.from({ length: 35 }, (_, i) => (
                                <View key={i} style={styles.calendarDay}>
                                    <Text style={styles.calendarDayText}>
                                        {i < 7
                                            ? i + 1
                                            : i < 14
                                            ? i - 6
                                            : i < 21
                                            ? i - 13
                                            : i < 28
                                            ? i - 20
                                            : i < 35
                                            ? i - 27
                                            : ""}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                );
            case "events":
                return (
                    <View style={styles.eventsWidget}>
                        <View style={styles.eventItem}>
                            <View style={styles.eventDot} />
                            <Text style={styles.eventText}>Tết Nguyên Đán</Text>
                            <Text style={styles.eventDate}>10/02</Text>
                        </View>
                        <View style={styles.eventItem}>
                            <View
                                style={[
                                    styles.eventDot,
                                    { backgroundColor: "#4CAF50" },
                                ]}
                            />
                            <Text style={styles.eventText}>
                                Giỗ Tổ Hùng Vương
                            </Text>
                            <Text style={styles.eventDate}>18/04</Text>
                        </View>
                        <View style={styles.eventItem}>
                            <View
                                style={[
                                    styles.eventDot,
                                    { backgroundColor: "#FF9800" },
                                ]}
                            />
                            <Text style={styles.eventText}>Quốc khánh</Text>
                            <Text style={styles.eventDate}>02/09</Text>
                        </View>
                    </View>
                );
            case "lunar":
                return (
                    <View style={styles.lunarWidget}>
                        <View style={styles.lunarHeader}>
                            <Text style={styles.lunarTitle}>Âm lịch</Text>
                            <Text style={styles.lunarDate}>15/01/2024</Text>
                        </View>
                        <View style={styles.lunarContent}>
                            <Text style={styles.lunarInfo}>
                                Ngày 4 tháng Giêng
                            </Text>
                            <Text style={styles.lunarInfo}>Năm Giáp Thìn</Text>
                            <View style={styles.auspiciousHours}>
                                <Text style={styles.hoursTitle}>
                                    Giờ hoàng đạo:
                                </Text>
                                <Text style={styles.hoursText}>
                                    Tý, Dần, Thìn, Ngọ
                                </Text>
                            </View>
                        </View>
                    </View>
                );
            case "small-date":
                return <WidgetPreviewSmallDate />;
            case "small-events":
                return <WidgetPreviewSmallEvents />;
            case "large-calendar":
                return <WidgetPreviewLargeCalendar />;
            case "large-events":
                return <WidgetPreviewLargeEvents />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={onAddWidget}
                >
                    <Ionicons name="add-circle" size={24} color="#667eea" />
                    <Text style={styles.addButtonText}>Thêm</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.widgetContainer}>{getWidgetContent()}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: "#666",
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f8ff",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    addButtonText: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: "600",
        color: "#667eea",
    },
    widgetContainer: {
        backgroundColor: "#f8f9fa",
        borderRadius: 8,
        padding: 12,
        minHeight: 120,
    },
    // Calendar Widget Styles
    calendarWidget: {
        flex: 1,
    },
    calendarHeader: {
        alignItems: "center",
        marginBottom: 8,
    },
    calendarTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    calendarYear: {
        fontSize: 12,
        color: "#666",
    },
    calendarGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    calendarDayHeader: {
        width: "14.28%",
        textAlign: "center",
        fontSize: 10,
        fontWeight: "bold",
        color: "#666",
        marginBottom: 4,
    },
    calendarDay: {
        width: "14.28%",
        alignItems: "center",
        justifyContent: "center",
        height: 20,
    },
    calendarDayText: {
        fontSize: 10,
        color: "#333",
    },
    // Events Widget Styles
    eventsWidget: {
        flex: 1,
    },
    eventItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    eventDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#f44336",
        marginRight: 8,
    },
    eventText: {
        flex: 1,
        fontSize: 12,
        color: "#333",
    },
    eventDate: {
        fontSize: 10,
        color: "#666",
        fontWeight: "500",
    },
    // Lunar Widget Styles
    lunarWidget: {
        flex: 1,
    },
    lunarHeader: {
        alignItems: "center",
        marginBottom: 8,
    },
    lunarTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    lunarDate: {
        fontSize: 12,
        color: "#666",
    },
    lunarContent: {
        alignItems: "center",
    },
    lunarInfo: {
        fontSize: 12,
        color: "#333",
        marginBottom: 4,
    },
    auspiciousHours: {
        marginTop: 8,
        alignItems: "center",
    },
    hoursTitle: {
        fontSize: 10,
        color: "#666",
        marginBottom: 2,
    },
    hoursText: {
        fontSize: 10,
        color: "#4CAF50",
        fontWeight: "600",
    },
});

export default WidgetPreview;
