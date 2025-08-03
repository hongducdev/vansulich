import {
    getActiveIcon,
    getAllAlternativeIcons,
    resetIcon,
    setIcon,
} from "react-native-app-icon-changer";
import { getCurrentLunarDate } from "../constants/VILunar";

export class DynamicIconService {
    private static instance: DynamicIconService;
    private isInitialized = false;

    private constructor() {}

    public static getInstance(): DynamicIconService {
        if (!DynamicIconService.instance) {
            DynamicIconService.instance = new DynamicIconService();
        }
        return DynamicIconService.instance;
    }

    /**
     * Initialize the dynamic icon service
     * This should be called when the app starts
     */
    public async initialize(): Promise<void> {
        if (this.isInitialized) {
            return;
        }

        try {
            // Try multiple times with delay
            await this.retryUpdateIcon(3);
            this.isInitialized = true;
        } catch (error) {
            console.error("Failed to initialize dynamic icon service:", error);
        }
    }

    /**
     * Retry updating icon with multiple attempts
     */
    private async retryUpdateIcon(maxAttempts: number): Promise<void> {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                await this.updateIconToCurrentLunarDay();
                return; // Success, exit retry loop
            } catch (error) {
                console.log(`Attempt ${attempt} failed:`, error);
                if (attempt < maxAttempts) {
                    // Wait before retry
                    await new Promise((resolve) =>
                        setTimeout(resolve, 1000 * attempt)
                    );
                } else {
                    throw error; // Last attempt failed
                }
            }
        }
    }

    /**
     * Update the app icon to match the current lunar day
     */
    public async updateIconToCurrentLunarDay(): Promise<void> {
        try {
            const lunarInfo = getCurrentLunarDate();
            const lunarDay = lunarInfo.lunarDate.day;

            // Only update if the day is between 1-31
            if (lunarDay >= 1 && lunarDay <= 31) {
                // Try using just the day number
                const iconName = `${lunarDay}`;
                await setIcon(iconName);
                console.log(`Updated app icon to lunar day ${lunarDay}`);
            } else {
                console.log(
                    `Lunar day ${lunarDay} is out of range (1-31), keeping default icon`
                );
            }
        } catch (error) {
            console.error("Failed to update icon to current lunar day:", error);
            throw error; // Re-throw to allow retry logic to handle
        }
    }

    /**
     * Update the app icon to match a specific lunar day
     */
    public async updateIconToLunarDay(lunarDay: number): Promise<void> {
        try {
            if (lunarDay < 1 || lunarDay > 31) {
                throw new Error("Lunar day must be between 1 and 31");
            }

            // Try using just the day number
            const iconName = `${lunarDay}`;
            await setIcon(iconName);
            console.log(`Updated app icon to lunar day ${lunarDay}`);
        } catch (error) {
            console.error("Failed to update icon to lunar day:", error);
            throw error;
        }
    }

    /**
     * Reset the app icon to default
     */
    public async resetToDefaultIcon(): Promise<void> {
        try {
            await resetIcon();
            console.log("Reset app icon to default");
        } catch (error) {
            console.error("Failed to reset icon to default:", error);
            throw error;
        }
    }

    /**
     * Get the current active icon
     */
    public async getActiveIcon(): Promise<string | null> {
        try {
            return await getActiveIcon();
        } catch (error) {
            console.error("Failed to get active icon:", error);
            return null;
        }
    }

    /**
     * Get all available alternative icons
     */
    public async getAllAlternativeIcons(): Promise<string[]> {
        try {
            return await getAllAlternativeIcons();
        } catch (error) {
            console.error("Failed to get alternative icons:", error);
            return [];
        }
    }

    /**
     * Get the current lunar day
     */
    public getCurrentLunarDay(): number {
        try {
            const lunarInfo = getCurrentLunarDate();
            return lunarInfo.lunarDate.day;
        } catch (error) {
            console.error("Failed to get current lunar day:", error);
            return 1; // Default fallback
        }
    }

    /**
     * Check if the current lunar day is within the valid range for icon display
     */
    public isLunarDayValidForIcon(): boolean {
        const lunarDay = this.getCurrentLunarDay();
        return lunarDay >= 1 && lunarDay <= 31;
    }
}

// Export a singleton instance
export const dynamicIconService = DynamicIconService.getInstance();
