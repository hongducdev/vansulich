import React from "react";
import { StyleSheet, Text, View } from "react-native";

const WidgetPreviewLargeCalendar: React.FC = () => {
    const days = [
        { solar: "21", lunar: "27", name: "HAI", selected: true },
        { solar: "22", lunar: "28", name: "BA", selected: false },
        { solar: "23", lunar: "29", name: "TƯ", selected: false },
        { solar: "24", lunar: "30", name: "NĂM", selected: false },
        { solar: "25", lunar: "1", name: "SÁU", selected: false },
        { solar: "26", lunar: "2", name: "BẢY", selected: false },
        { solar: "27", lunar: "3", name: "CN", selected: false },
    ];

    return (
        <View style={styles.container}>
            {/* Top section */}
            <View style={styles.topSection}>
                <View style={styles.leftSection}>
                    <Text style={styles.weekday}>THỨ HAI</Text>
                    <Text style={styles.fullDate}>21 tháng 7, 2025</Text>
                    <Text style={styles.lunarFullDate}>27 tháng 6 ÂL</Text>
                </View>

                <View style={styles.rightSection}>
                    <Text style={styles.lunarDayName}>Ngày Tân Mão</Text>
                    <Text style={styles.lunarMonthName}>Tháng Quý Mùi</Text>
                    <Text style={styles.lunarYearName}>Năm Ất Tị</Text>
                </View>
            </View>

            {/* Calendar strip */}
            <View style={styles.calendarStrip}>
                {days.map((day, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dayContainer,
                            day.selected && styles.selectedDay,
                        ]}
                    >
                        <Text
                            style={[
                                styles.dayName,
                                day.selected && styles.selectedText,
                            ]}
                        >
                            {day.name}
                        </Text>
                        <Text
                            style={[
                                styles.solarDay,
                                day.selected && styles.selectedText,
                            ]}
                        >
                            {day.solar}
                        </Text>
                        <Text
                            style={[
                                styles.lunarDay,
                                day.selected && styles.selectedText,
                            ]}
                        >
                            {day.lunar}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        width: 350,
        height: 150,
        padding: 16,
        borderRadius: 8,
    },
    topSection: {
        flexDirection: "row",
        marginBottom: 12,
    },
    leftSection: {
        flex: 1,
    },
    rightSection: {
        flex: 1,
        alignItems: "flex-end",
    },
    weekday: {
        fontSize: 14,
        color: "#333333",
        fontWeight: "bold",
    },
    fullDate: {
        fontSize: 12,
        color: "#333333",
        marginTop: 2,
    },
    lunarFullDate: {
        fontSize: 12,
        color: "#333333",
        marginTop: 2,
    },
    lunarDayName: {
        fontSize: 12,
        color: "#333333",
        fontWeight: "bold",
    },
    lunarMonthName: {
        fontSize: 12,
        color: "#333333",
        marginTop: 2,
    },
    lunarYearName: {
        fontSize: 12,
        color: "#333333",
        marginTop: 2,
    },
    calendarStrip: {
        flexDirection: "row",
        marginTop: 8,
    },
    dayContainer: {
        flex: 1,
        alignItems: "center",
        padding: 4,
    },
    selectedDay: {
        backgroundColor: "#667eea",
        borderRadius: 4,
    },
    dayName: {
        fontSize: 10,
        color: "#333333",
        fontWeight: "bold",
    },
    solarDay: {
        fontSize: 12,
        color: "#333333",
        fontWeight: "bold",
    },
    lunarDay: {
        fontSize: 10,
        color: "#333333",
    },
    selectedText: {
        color: "#FFFFFF",
    },
});

export default WidgetPreviewLargeCalendar;
