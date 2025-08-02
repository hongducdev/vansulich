import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
    getTodayAuspiciousHours,
    HourInfo,
    HourType,
} from "../constants/AuspiciousHours";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface AuspiciousHoursCardProps {
    date?: Date;
}

export function AuspiciousHoursCard({
    date = new Date(),
}: AuspiciousHoursCardProps) {
    const result = getTodayAuspiciousHours();

    const renderHourItem = (hour: HourInfo, index: number) => {
        const getTypeColor = (type: HourType) => {
            switch (type) {
                case HourType.HOANG_DAO:
                    return "#4CAF50"; // Xanh lá
                case HourType.HAC_DAO:
                    return "#F44336"; // Đỏ
                case HourType.TRUNG_TINH:
                    return "#FF9800"; // Cam
                default:
                    return "#757575"; // Xám
            }
        };

        const getTypeIcon = (type: HourType) => {
            switch (type) {
                case HourType.HOANG_DAO:
                    return "☀️";
                case HourType.HAC_DAO:
                    return "🌙";
                case HourType.TRUNG_TINH:
                    return "⚖️";
                default:
                    return "•";
            }
        };

        return (
            <View key={index} style={styles.hourItem}>
                <View style={styles.hourHeader}>
                    <Text style={styles.hourName}>{hour.hour}</Text>
                    <Text style={styles.hourTime}>
                        {hour.startTime} - {hour.endTime}
                    </Text>
                </View>
                <View style={styles.hourContent}>
                    <Text style={styles.typeIcon}>
                        {getTypeIcon(hour.type)}
                    </Text>
                    <View style={styles.typeInfo}>
                        <Text
                            style={[
                                styles.typeText,
                                { color: getTypeColor(hour.type) },
                            ]}
                        >
                            {hour.type}
                        </Text>
                        <Text style={styles.description}>
                            {hour.description}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderHourSection = (
        title: string,
        hours: HourInfo[],
        color: string
    ) => {
        if (hours.length === 0) return null;

        return (
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color }]}>{title}</Text>
                {hours.map((hour, index) => renderHourItem(hour, index))}
            </View>
        );
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <ThemedText style={styles.title}>Giờ Hoàng Đạo</ThemedText>
                <ThemedText style={styles.subtitle}>
                    Ngày {date.getDate()}/{date.getMonth() + 1}/
                    {date.getFullYear()}
                </ThemedText>
                <ThemedText style={styles.canChi}>
                    Can: {result.dayCan} - Chi: {result.dayChi}
                </ThemedText>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {renderHourSection(
                    `Giờ Hoàng Đạo (${result.auspiciousHours.length})`,
                    result.auspiciousHours,
                    "#4CAF50"
                )}

                {renderHourSection(
                    `Giờ Hắc Đạo (${result.inauspiciousHours.length})`,
                    result.inauspiciousHours,
                    "#F44336"
                )}

                {renderHourSection(
                    `Giờ Trung Tính (${result.neutralHours.length})`,
                    result.neutralHours,
                    "#FF9800"
                )}
            </ScrollView>

            <View style={styles.footer}>
                <Text style={styles.legend}>
                    ☀️ Hoàng đạo: Giờ tốt | 🌙 Hắc đạo: Giờ xấu | ⚖️ Trung tính:
                    Giờ bình thường
                </Text>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 12,
        padding: 16,
        margin: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        opacity: 0.8,
        marginBottom: 4,
    },
    canChi: {
        fontSize: 14,
        opacity: 0.7,
    },
    content: {
        flex: 1,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    hourItem: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
    },
    hourHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    hourName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333333",
    },
    hourTime: {
        fontSize: 14,
        opacity: 0.8,
        color: "#666666",
    },
    hourContent: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    typeIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    typeInfo: {
        flex: 1,
    },
    typeText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        opacity: 0.8,
        lineHeight: 20,
        color: "#666666",
    },
    footer: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: "rgba(255, 255, 255, 0.1)",
    },
    legend: {
        fontSize: 12,
        opacity: 0.7,
        textAlign: "center",
        color: "#666666",
    },
});
