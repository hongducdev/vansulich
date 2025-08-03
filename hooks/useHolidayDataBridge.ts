import { NativeModules } from "react-native";
import { getHolidaysInMonthWithDistance } from "../constants/Holidays";

const { HolidayDataModule } = NativeModules;

export const useHolidayDataBridge = () => {
    const saveHolidayData = async () => {
        try {
            // Check if module exists
            if (!HolidayDataModule) {
                console.log(
                    "HolidayDataModule not available, skipping holiday data save"
                );
                return;
            }

            const today = new Date();
            const currentYear = today.getFullYear();
            const currentMonth = today.getMonth();

            // Get holidays for next 6 months
            const allHolidays = [];

            for (let monthOffset = 0; monthOffset < 6; monthOffset++) {
                const targetMonth = (currentMonth + monthOffset) % 12;
                const targetYear =
                    currentYear + Math.floor((currentMonth + monthOffset) / 12);

                const holidaysInMonth = getHolidaysInMonthWithDistance(
                    today,
                    targetYear,
                    targetMonth
                );

                allHolidays.push(...holidaysInMonth);
            }

            // Convert to JSON for storage
            const holidayDataJson = JSON.stringify(
                allHolidays.map((holiday) => ({
                    name: holiday.holiday.holiday.name_vi,
                    date: holiday.date.toISOString().split("T")[0], // YYYY-MM-DD format
                    daysUntil: holiday.daysUntil,
                }))
            );

            await HolidayDataModule.saveHolidayData(holidayDataJson);
            console.log(
                "Holiday data saved to widget:",
                allHolidays.length,
                "holidays"
            );
        } catch (error) {
            console.error("Failed to save holiday data:", error);
        }
    };

    return {
        saveHolidayData,
    };
};
