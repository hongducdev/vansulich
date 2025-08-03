import { NativeModules } from "react-native";
import { getCurrentLunarDate } from "../constants/VILunar";

const { LunarDateModule } = NativeModules;

export const useLunarDateBridge = () => {
    const saveCurrentLunarDate = async () => {
        try {
            const lunarInfo = getCurrentLunarDate();
            const { lunarDate } = lunarInfo;

            await LunarDateModule.saveLunarDate(
                lunarDate.day,
                lunarDate.month,
                lunarDate.year,
                lunarDate.dayCan,
                lunarDate.dayChi
            );

            console.log(
                "Lunar date saved to widget:",
                lunarDate.day,
                lunarDate.month,
                lunarDate.year,
                lunarDate.dayCan,
                lunarDate.dayChi
            );
        } catch (error) {
            console.error("Failed to save lunar date:", error);
        }
    };

    const getLunarDate = async () => {
        try {
            const lunarDate = await LunarDateModule.getLunarDate();
            return lunarDate;
        } catch (error) {
            console.error("Failed to get lunar date:", error);
            return null;
        }
    };

    return {
        saveCurrentLunarDate,
        getLunarDate,
    };
};
