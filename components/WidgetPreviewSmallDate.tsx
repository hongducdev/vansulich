import React from "react";
import { StyleSheet, Text, View } from "react-native";

const WidgetPreviewSmallDate: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.weekday}>THỨ HAI</Text>
            <Text style={styles.dayNumber}>21</Text>
            <Text style={styles.month}>Tháng 7</Text>

            <View style={styles.lunarContainer}>
                <View style={styles.moonIcon} />
                <Text style={styles.lunarDate}>27/6</Text>
            </View>

            <Text style={styles.lunarDayName}>Tân Mão</Text>

            <View style={styles.calendarIcon}>
                <Text style={styles.calendarIconText}>17</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        width: 120,
        height: 120,
        padding: 10,
        borderRadius: 8,
        position: "relative",
    },
    weekday: {
        fontSize: 10,
        color: "#333333",
        position: "absolute",
        top: 10,
        left: 10,
    },
    dayNumber: {
        fontSize: 32,
        color: "#333333",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 26,
    },
    month: {
        fontSize: 12,
        color: "#333333",
        textAlign: "center",
        marginTop: 4,
    },
    lunarContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 6,
    },
    moonIcon: {
        width: 12,
        height: 12,
        backgroundColor: "#333333",
        borderRadius: 6,
        marginRight: 4,
    },
    lunarDate: {
        fontSize: 12,
        color: "#333333",
    },
    lunarDayName: {
        fontSize: 10,
        color: "#333333",
        textAlign: "center",
        marginTop: 20,
    },
    calendarIcon: {
        position: "absolute",
        top: 10,
        right: 10,
        width: 20,
        height: 20,
        backgroundColor: "#667eea",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    calendarIconText: {
        fontSize: 8,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});

export default WidgetPreviewSmallDate;
