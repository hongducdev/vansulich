import React from "react";
import { Text, View } from "react-native";

interface HeadingProps {
    title: string;
    icon: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ title, icon }) => {
    return (
        <View className="flex-row items-center mb-4 px-2">
            <View
                className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3"
                style={{ borderRadius: 16 }}
            >
                {icon}
            </View>
            <Text className="text-xl font-bold text-gray-800">{title}</Text>
        </View>
    );
};

export default Heading;
