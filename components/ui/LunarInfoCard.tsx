import ZodiacIcon from "@/constants/ZodiacIcon";
import { Text, View } from "react-native";

interface LunarInfoCardProps {
    type: "day" | "month" | "year";
    lunarDate: number;
    lunarCan: string;
    lunarChi: string;
    className?: string;
}

const LunarInfoCard = ({
    type,
    lunarDate,
    lunarCan,
    lunarChi,
    className,
}: LunarInfoCardProps) => {
    return (
        <View
            className={`flex-1 p-4 shadow-sm bg-white ${className}`}
            style={{
                borderRadius: 10,
            }}
        >
            <View
                className={`self-center backdrop-blur-xl rounded-full px-4 py-1 border mb-4 ${
                    type === "day"
                        ? "bg-blue-300/30 border-blue-500/30"
                        : type === "month"
                          ? "bg-green-300/30 border-green-500/30"
                          : "bg-red-300/30 border-red-500/30"
                }`}
            >
                <Text
                    className={`text-sm ${type === "day" ? "text-blue-500" : type === "month" ? "text-green-500" : "text-red-500"}`}
                >
                    {type === "day"
                        ? "Ngày"
                        : type === "month"
                          ? "Tháng"
                          : "Năm"}
                </Text>
            </View>
            <Text className="text-center text-2xl font-bold text-gray-800 mb-4">
                {lunarDate}
            </Text>
            <Text className={`text-center text-sm mb-2 ${type === "day" ? "text-blue-500" : type === "month" ? "text-green-500" : "text-red-500"}`}>
                {lunarCan} {lunarChi}
            </Text>
            <Text className="text-center text-3xl">
                {ZodiacIcon[lunarChi as keyof typeof ZodiacIcon]}
            </Text>
        </View>
    );
};

export default LunarInfoCard;
