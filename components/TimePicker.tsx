import React, { useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface TimePickerProps {
    hour: number;
    minute: number;
    onTimeChange: (hour: number, minute: number) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({
    hour,
    minute,
    onTimeChange,
}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const formatTime = (h: number, m: number) => {
        return `${h.toString().padStart(2, "0")}:${m
            .toString()
            .padStart(2, "0")}`;
    };

    const TimeItem = ({
        value,
        onPress,
        isSelected,
    }: {
        value: number;
        onPress: () => void;
        isSelected: boolean;
    }) => (
        <TouchableOpacity
            style={[styles.timeItem, isSelected && styles.selectedTimeItem]}
            onPress={onPress}
        >
            <Text
                style={[styles.timeText, isSelected && styles.selectedTimeText]}
            >
                {value.toString().padStart(2, "0")}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.timeDisplay}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.timeDisplayText}>
                    {formatTime(hour, minute)}
                </Text>
                <Text style={styles.timeDisplayLabel}>Chọn thời gian</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            Chọn thời gian thông báo
                        </Text>

                        <View style={styles.timePickerContainer}>
                            <View style={styles.timeColumn}>
                                <Text style={styles.columnTitle}>Giờ</Text>
                                <ScrollView style={styles.timeList}>
                                    {Array.from({ length: 24 }, (_, i) => (
                                        <TimeItem
                                            key={i}
                                            value={i}
                                            onPress={() =>
                                                onTimeChange(i, minute)
                                            }
                                            isSelected={hour === i}
                                        />
                                    ))}
                                </ScrollView>
                            </View>

                            <View style={styles.timeColumn}>
                                <Text style={styles.columnTitle}>Phút</Text>
                                <ScrollView style={styles.timeList}>
                                    {Array.from({ length: 60 }, (_, i) => (
                                        <TimeItem
                                            key={i}
                                            value={i}
                                            onPress={() =>
                                                onTimeChange(hour, i)
                                            }
                                            isSelected={minute === i}
                                        />
                                    ))}
                                </ScrollView>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.confirmButtonText}>
                                Xác nhận
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    timeDisplay: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        alignItems: "center",
    },
    timeDisplayText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    timeDisplayLabel: {
        fontSize: 12,
        color: "#666",
        marginTop: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        width: "80%",
        maxHeight: "70%",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
    },
    timePickerContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
    },
    timeColumn: {
        flex: 1,
        alignItems: "center",
    },
    columnTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
        color: "#333",
    },
    timeList: {
        maxHeight: 200,
    },
    timeItem: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginVertical: 2,
        borderRadius: 6,
        minWidth: 60,
        alignItems: "center",
    },
    selectedTimeItem: {
        backgroundColor: "#667eea",
    },
    timeText: {
        fontSize: 16,
        color: "#333",
    },
    selectedTimeText: {
        color: "white",
        fontWeight: "bold",
    },
    confirmButton: {
        backgroundColor: "#667eea",
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
    },
    confirmButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
