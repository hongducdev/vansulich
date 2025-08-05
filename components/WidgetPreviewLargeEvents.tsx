import React from "react";
import { StyleSheet, Text, View } from "react-native";

const WidgetPreviewLargeEvents: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.calendarIcon} />
                <Text style={styles.title}>Sự kiện sắp tới</Text>
            </View>

            {/* Event 1 */}
            <View style={styles.eventContainer}>
                <View style={styles.eventInfo}>
                    <Text style={styles.eventTitle}>Ngày 1 hàng tháng</Text>
                    <Text style={styles.eventDate}>ngày 25 thg 6, 2025</Text>
                </View>
                <Text style={styles.eventDays}>4 ngày</Text>
            </View>

            {/* Event 2 */}
            <View style={styles.eventContainer}>
                <View style={styles.eventInfo}>
                    <Text style={styles.eventTitle}>Ngày rằm hàng tháng</Text>
                    <Text style={styles.eventDate}>ngày 9 thg 7, 2025</Text>
                </View>
                <Text style={styles.eventDays}>18 ngày</Text>
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
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    calendarIcon: {
        width: 16,
        height: 16,
        backgroundColor: "#333333",
        borderRadius: 8,
        marginRight: 6,
    },
    title: {
        fontSize: 14,
        color: "#333333",
        fontWeight: "bold",
    },
    eventContainer: {
        flexDirection: "row",
        marginBottom: 12,
    },
    eventInfo: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 12,
        color: "#333333",
        marginBottom: 2,
    },
    eventDate: {
        fontSize: 10,
        color: "#666666",
    },
    eventDays: {
        fontSize: 10,
        color: "#F44336",
        fontWeight: "bold",
        textAlign: "right",
    },
});

export default WidgetPreviewLargeEvents;
