import { useEffect, useState } from "react";
import { dynamicIconService } from "../services/DynamicIconService";

export interface DynamicIconInfo {
    activeIcon: string | null;
    availableIcons: string[];
    isLoading: boolean;
    error: string | null;
}

export const useDynamicIcon = () => {
    const [activeIcon, setActiveIcon] = useState<string | null>(null);
    const [availableIcons, setAvailableIcons] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load initial state
    useEffect(() => {
        loadIconState();
    }, []);

    const loadIconState = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Get current active icon
            const currentIcon = await dynamicIconService.getActiveIcon();
            setActiveIcon(currentIcon);

            // Get all available alternative icons
            const icons = await dynamicIconService.getAllAlternativeIcons();
            setAvailableIcons(icons);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to load icon state"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const changeIcon = async (iconName: string | null) => {
        try {
            setIsLoading(true);
            setError(null);

            if (iconName === null) {
                await dynamicIconService.resetToDefaultIcon();
                setActiveIcon(null);
            } else {
                // Extract day number from icon name (e.g., "10" -> 10)
                const dayMatch = iconName.match(/^(\d+)$/);
                if (dayMatch) {
                    const day = parseInt(dayMatch[1]);
                    await dynamicIconService.updateIconToLunarDay(day);
                    setActiveIcon(iconName);
                } else {
                    throw new Error("Invalid icon name format");
                }
            }
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to change icon"
            );
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const setCalendarIcon = async (day: number) => {
        if (day < 1 || day > 31) {
            throw new Error("Day must be between 1 and 31");
        }

        await dynamicIconService.updateIconToLunarDay(day);
        setActiveIcon(`${day}`);
    };

    const resetToDefaultIcon = async () => {
        await dynamicIconService.resetToDefaultIcon();
        setActiveIcon(null);
    };

    return {
        activeIcon,
        availableIcons,
        isLoading,
        error,
        changeIcon,
        setCalendarIcon,
        resetToDefaultIcon,
        refresh: loadIconState,
    };
};
