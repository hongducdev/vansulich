import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useHolidayDataBridge } from "@/hooks/useHolidayDataBridge";
import { useLunarDateBridge } from "@/hooks/useLunarDateBridge";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });
    const { saveCurrentLunarDate } = useLunarDateBridge();
    const { saveHolidayData } = useHolidayDataBridge();

    // Save lunar date and holiday data for widget when app starts
    useEffect(() => {
        try {
            saveCurrentLunarDate();
            saveHolidayData();

            // Start widget update service
            const { NativeModules } = require("react-native");
            if (NativeModules.WidgetUpdateModule) {
                NativeModules.WidgetUpdateModule.startWidgetUpdateService();
            }
        } catch (error) {
            console.log("Widget service not available:", error);
        }
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
