import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import WidgetPreviewLargeCalendar from "./WidgetPreviewLargeCalendar";
import WidgetPreviewLargeEvents from "./WidgetPreviewLargeEvents";
import WidgetPreviewSmallDate from "./WidgetPreviewSmallDate";
import WidgetPreviewSmallEvents from "./WidgetPreviewSmallEvents";

const WidgetPreviewDemo: React.FC = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Widget Preview Demo</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Small Widgets</Text>
                <View style={styles.widgetRow}>
                    <View style={styles.widgetContainer}>
                        <Text style={styles.widgetLabel}>
                            Small Date Widget
                        </Text>
                        <WidgetPreviewSmallDate />
                    </View>
                    <View style={styles.widgetContainer}>
                        <Text style={styles.widgetLabel}>
                            Small Events Widget
                        </Text>
                        <WidgetPreviewSmallEvents />
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Large Widgets</Text>
                <View style={styles.widgetColumn}>
                    <View style={styles.widgetContainer}>
                        <Text style={styles.widgetLabel}>
                            Large Calendar Widget
                        </Text>
                        <WidgetPreviewLargeCalendar />
                    </View>
                    <View style={styles.widgetContainer}>
                        <Text style={styles.widgetLabel}>
                            Large Events Widget
                        </Text>
                        <WidgetPreviewLargeEvents />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#333",
    },
    widgetRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },
    widgetColumn: {
        alignItems: "center",
    },
    widgetContainer: {
        alignItems: "center",
        marginBottom: 16,
    },
    widgetLabel: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8,
        color: "#666",
        textAlign: "center",
    },
});

export default WidgetPreviewDemo;
