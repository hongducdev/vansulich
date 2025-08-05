import React from "react";
import { StyleSheet, Text, View } from "react-native";

const WidgetPreviewSmallEvents: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.calendarIcon} />
                <Text style={styles.title}>Sự kiện</Text>
            </View>

            <Text style={styles.eventTitle}>Ngày 1 hàng tháng</Text>
            <Text style={styles.eventDate}>ngày 25 thg 6, 2025</Text>

            <Text style={styles.eventTitle}>Ngày rằm hàng tháng</Text>
            <Text style={styles.eventDate}>ngày 9 thg 7, 2025</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        width: 200,
        height: 120,
        padding: 12,
        borderRadius: 8,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
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
    eventTitle: {
        fontSize: 12,
        color: "#333333",
        marginBottom: 4,
    },
    eventDate: {
        fontSize: 10,
        color: "#666666",
        marginBottom: 8,
    },
});

export default WidgetPreviewSmallEvents;
