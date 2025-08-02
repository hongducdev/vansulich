import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Dimensions,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { height } = Dimensions.get("window");

interface YearPickerBottomSheetProps {
    visible: boolean;
    onClose: () => void;
    selectedYear: number;
    onYearSelect: (year: number) => void;
}

const YearPickerBottomSheet: React.FC<YearPickerBottomSheetProps> = ({
    visible,
    onClose,
    selectedYear,
    onYearSelect,
}) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - 50 + i);

    const handleYearSelect = (year: number) => {
        onYearSelect(year);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <Pressable
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                onPress={onClose}
            >
                <View className="flex-1 justify-end">
                    <View className="bg-white rounded-t-3xl p-6 max-h-[70%]">
                        {/* Header */}
                        <View className="flex-row items-center justify-between mb-6">
                            <Text className="text-xl font-semibold text-gray-800">
                                Chọn năm
                            </Text>
                            <TouchableOpacity
                                onPress={onClose}
                                className="bg-gray-200 rounded-full p-2"
                            >
                                <Ionicons name="close" size={20} color="gray" />
                            </TouchableOpacity>
                        </View>

                        {/* Current Year Indicator */}
                        <View className="bg-blue-50 rounded-lg p-3 mb-4">
                            <Text className="text-blue-600 font-medium text-center">
                                Năm hiện tại: {currentYear}
                            </Text>
                            <Text className="text-blue-500 text-sm text-center mt-1">
                                Range: {years[0]} - {years[years.length - 1]}
                            </Text>
                        </View>

                        {/* Years Grid */}
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View className="flex-row flex-wrap justify-center">
                                {years.map((year) => (
                                    <TouchableOpacity
                                        key={year}
                                        onPress={() => handleYearSelect(year)}
                                        className={`m-2 px-6 py-3 rounded-xl ${
                                            year === selectedYear
                                                ? "bg-blue-500"
                                                : year === currentYear
                                                  ? "bg-green-100"
                                                  : "bg-gray-100"
                                        }`}
                                    >
                                        <Text
                                            className={`font-semibold text-lg ${
                                                year === selectedYear
                                                    ? "text-white"
                                                    : year === currentYear
                                                      ? "text-green-700"
                                                      : "text-gray-700"
                                            }`}
                                        >
                                            {year}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>

                        {/* Quick Actions */}
                        <View className="flex-row gap-2 mt-6 pt-4 border-t border-gray-200">
                            <TouchableOpacity
                                className="flex-1 bg-blue-500 rounded-xl py-3"
                                onPress={() => handleYearSelect(currentYear)}
                            >
                                <Text className="text-white font-semibold text-center text-sm">
                                    Hiện tại
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex-1 bg-green-500 rounded-xl py-3"
                                onPress={() =>
                                    handleYearSelect(currentYear - 1)
                                }
                            >
                                <Text className="text-white font-semibold text-center text-sm">
                                    Năm trước
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex-1 bg-purple-500 rounded-xl py-3"
                                onPress={() =>
                                    handleYearSelect(currentYear + 1)
                                }
                            >
                                <Text className="text-white font-semibold text-center text-sm">
                                    Năm sau
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex-1 bg-gray-500 rounded-xl py-3"
                                onPress={onClose}
                            >
                                <Text className="text-white font-semibold text-center text-sm">
                                    Hủy
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};

export default YearPickerBottomSheet;
