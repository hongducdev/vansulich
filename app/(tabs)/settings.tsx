import { DynamicIconDemo } from "@/components/DynamicIconDemo";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SettingsScreen() {
    const [showIconDemo, setShowIconDemo] = useState(false);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Cài đặt</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tính năng</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setShowIconDemo(!showIconDemo)}
                >
                    <Text style={styles.buttonText}>
                        {showIconDemo ? "Ẩn" : "Hiển thị"} Icon động theo ngày
                        âm lịch
                    </Text>
                </TouchableOpacity>
            </View>

            {showIconDemo && (
                <View style={styles.demoContainer}>
                    <DynamicIconDemo />
                </View>
            )}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Thông tin</Text>
                <Text style={styles.infoText}>• App: Văn Sử Lịch</Text>
                <Text style={styles.infoText}>• Phiên bản: 1.0.0</Text>
                <Text style={styles.infoText}>
                    • Tính năng: Lịch âm dương Việt Nam
                </Text>
                <Text style={styles.infoText}>
                    • Icon động theo ngày âm lịch
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
    },
    section: {
        backgroundColor: "white",
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#333",
    },
    button: {
        backgroundColor: "#667eea",
        padding: 12,
        borderRadius: 6,
        marginBottom: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    demoContainer: {
        marginBottom: 16,
        borderRadius: 8,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoText: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
});
