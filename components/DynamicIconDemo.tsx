import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useDynamicIcon } from "../hooks/useDynamicIcon";
import { dynamicIconService } from "../services/DynamicIconService";

export const DynamicIconDemo: React.FC = () => {
    const {
        activeIcon,
        availableIcons,
        isLoading,
        error,
        setCalendarIcon,
        resetToDefaultIcon,
        refresh,
    } = useDynamicIcon();
    const [selectedDay, setSelectedDay] = useState<number>(1);
    const [isInitializing, setIsInitializing] = useState(false);

    const handleInitialize = async () => {
        try {
            setIsInitializing(true);
            await dynamicIconService.initialize();
            await refresh();
            Alert.alert(
                "Success",
                "Dynamic icon service initialized successfully!"
            );
        } catch (error) {
            Alert.alert("Error", `Failed to initialize: ${error}`);
        } finally {
            setIsInitializing(false);
        }
    };

    const handleSetCalendarIcon = async (day: number) => {
        try {
            await setCalendarIcon(day);
            Alert.alert("Success", `Icon changed to day ${day}`);
        } catch (error) {
            Alert.alert("Error", `Failed to change icon: ${error}`);
        }
    };

    const handleResetIcon = async () => {
        try {
            await resetToDefaultIcon();
            Alert.alert("Success", "Icon reset to default");
        } catch (error) {
            Alert.alert("Error", `Failed to reset icon: ${error}`);
        }
    };

    const renderDayButton = (day: number) => (
        <TouchableOpacity
            key={day}
            style={[
                styles.dayButton,
                selectedDay === day && styles.selectedDayButton,
            ]}
            onPress={() => setSelectedDay(day)}
        >
            <Text
                style={[
                    styles.dayButtonText,
                    selectedDay === day && styles.selectedDayButtonText,
                ]}
            >
                {day}
            </Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Dynamic Calendar Icon Demo</Text>

            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Error: {error}</Text>
                </View>
            )}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Current Status</Text>
                <Text style={styles.statusText}>
                    Active Icon: {activeIcon || "Default"}
                </Text>
                <Text style={styles.statusText}>
                    Available Icons: {availableIcons.length}
                </Text>
                <Text style={styles.statusText}>
                    Loading: {isLoading ? "Yes" : "No"}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Initialize Service</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleInitialize}
                    disabled={isInitializing}
                >
                    <Text style={styles.buttonText}>
                        {isInitializing
                            ? "Initializing..."
                            : "Initialize Dynamic Icon Service"}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Select Day</Text>
                <View style={styles.daysGrid}>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(
                        renderDayButton
                    )}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Actions</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSetCalendarIcon(selectedDay)}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>
                        Set Icon to Day {selectedDay}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleResetIcon}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>Reset to Default Icon</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={refresh}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>Refresh Icon State</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Available Icons</Text>
                <Text style={styles.availableIconsText}>
                    {availableIcons.length > 0
                        ? availableIcons.join(", ")
                        : "None available"}
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
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
    statusText: {
        fontSize: 14,
        marginBottom: 4,
        color: "#666",
    },
    errorContainer: {
        backgroundColor: "#ffebee",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: "#f44336",
    },
    errorText: {
        color: "#d32f2f",
        fontSize: 14,
    },
    button: {
        backgroundColor: "#2196f3",
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
    daysGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    dayButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#e0e0e0",
        justifyContent: "center",
        alignItems: "center",
        margin: 2,
    },
    selectedDayButton: {
        backgroundColor: "#2196f3",
    },
    dayButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    selectedDayButtonText: {
        color: "white",
    },
    availableIconsText: {
        fontSize: 12,
        color: "#666",
        fontFamily: "monospace",
    },
});
