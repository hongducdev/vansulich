const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const convertSvgToPng = async () => {
    try {
        const svgPath = path.join(__dirname, "icon-day5.svg");
        const pngPath = path.join(__dirname, "assets/images/icon.png");
        const adaptiveIconPath = path.join(
            __dirname,
            "assets/images/adaptive-icon.png"
        );

        // Check if SVG exists
        if (!fs.existsSync(svgPath)) {
            console.error("❌ SVG file not found:", svgPath);
            return;
        }

        // Check if output directory exists
        const outputDir = path.dirname(pngPath);
        if (!fs.existsSync(outputDir)) {
            console.error("❌ Output directory not found:", outputDir);
            return;
        }

        console.log("📁 SVG path:", svgPath);
        console.log("📁 PNG path:", pngPath);
        console.log("📁 Adaptive icon path:", adaptiveIconPath);

        // Convert SVG to PNG
        await sharp(svgPath)
            .png()
            .resize(1024, 1024) // App icon size
            .toFile(pngPath);

        console.log("✅ Converted SVG to icon.png");

        // Copy to adaptive-icon.png for Android
        await sharp(svgPath).png().resize(1024, 1024).toFile(adaptiveIconPath);

        console.log("✅ Created adaptive-icon.png");

        // Clean up
        fs.unlinkSync(svgPath);
        fs.unlinkSync(__filename);

        console.log("🎉 Icon creation completed!");
    } catch (error) {
        console.error("❌ Error:", error.message);
        console.error("Stack:", error.stack);
    }
};

convertSvgToPng();
