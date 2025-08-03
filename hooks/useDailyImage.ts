import imageUrls from "@/assets/data/image.json";
import { useEffect, useState } from "react";

export const useDailyImage = () => {
    const [dailyImage, setDailyImage] = useState<string>("");

    useEffect(() => {
        const getDailyImage = () => {
            const today = new Date();
            const dayOfYear = Math.floor(
                (today.getTime() -
                    new Date(today.getFullYear(), 0, 0).getTime()) /
                    (1000 * 60 * 60 * 24)
            );
            const imageIndex = dayOfYear % imageUrls.length;
            setDailyImage(imageUrls[imageIndex]);
        };

        getDailyImage();
    }, []);

    return dailyImage;
};
