# Dynamic Icon Implementation for Vạn Sự Lịch

This implementation provides dynamic app icon functionality that changes based on the lunar calendar date. The app icon will automatically display the current lunar day (1-31) in a calendar-style design.

## Features

-   **Automatic Icon Updates**: The app icon automatically changes to reflect the current lunar day
-   **Manual Control**: Users can manually change the icon through the settings screen
-   **Lunar Calendar Integration**: Uses Vietnamese lunar calendar calculations
-   **Fallback Support**: Gracefully handles days outside the 1-31 range

## Implementation Details

### 1. Icon Generation

The calendar icons are generated using the `generate-calendar-icons.js` script:

```bash
node generate-calendar-icons.js
```

This script:

-   Creates SVG calendar icons for days 1-31
-   Converts them to PNG format for different Android densities
-   Places them in the appropriate `mipmap-*` folders

### 2. Android Configuration

#### Activity Aliases

The `AndroidManifest.xml` includes activity aliases for each day (1-31):

```xml
<activity-alias
    android:name="${applicationId}.MainActivityDay1"
    android:targetActivity=".MainActivity"
    android:icon="@mipmap/ic_launcher_day_1"
    android:roundIcon="@mipmap/ic_launcher_day_1"
    android:label="@string/app_name"
    android:enabled="false"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity-alias>
```

#### Permissions

Required permission for dynamic icon changes:

```xml
<uses-permission android:name="android.permission.CHANGE_COMPONENT_ENABLED_STATE" />
```

### 3. Service Layer

#### DynamicIconService

The `DynamicIconService` class provides the core functionality:

```typescript
// Initialize the service
await dynamicIconService.initialize();

// Update icon to current lunar day
await dynamicIconService.updateIconToCurrentLunarDay();

// Update icon to specific lunar day
await dynamicIconService.updateIconToLunarDay(15);

// Reset to default icon
await dynamicIconService.resetToDefaultIcon();
```

### 4. React Hook

#### useDynamicIcon

The `useDynamicIcon` hook provides React integration:

```typescript
const {
    activeIcon,
    availableIcons,
    isLoading,
    error,
    setCalendarIcon,
    resetToDefaultIcon,
    refresh,
} = useDynamicIcon();
```

### 5. UI Components

#### DynamicIconDemo

A demo component in the settings screen allows users to:

-   View current icon status
-   Select specific lunar days (1-31)
-   Change the app icon manually
-   Reset to default icon

## Usage

### Automatic Updates

The app automatically updates the icon when it starts. This is handled in `app/_layout.tsx`:

```typescript
useEffect(() => {
    const initializeDynamicIcon = async () => {
        try {
            await dynamicIconService.initialize();
        } catch (error) {
            console.error("Failed to initialize dynamic icon service:", error);
        }
    };

    initializeDynamicIcon();
}, []);
```

### Manual Control

Users can manually change the icon through the settings screen:

1. Go to Settings tab
2. Tap "Hiển thị Demo Icon Động"
3. Select a day (1-31)
4. Tap "Set Icon to Day X"

## Icon Design

The calendar icons feature:

-   **Red header**: Traditional Vietnamese calendar style
-   **Calendar tabs**: Metal ring design
-   **Large day number**: Prominent display of the lunar day
-   **Shadow effects**: Modern visual appeal
-   **White background**: Clean, readable design

## Technical Requirements

### Dependencies

-   `react-native-app-icon-changer`: Core dynamic icon functionality
-   `sharp`: Image processing for icon generation

### Platform Support

-   **Android**: Full support with activity aliases
-   **iOS**: Not implemented (requires different approach)

## Troubleshooting

### Common Issues

1. **Icon not changing**:

    - Check if the app has the required permission
    - Verify that activity aliases are properly configured
    - Ensure icon files exist in the correct mipmap folders

2. **App crashes on icon change**:

    - Check console logs for error messages
    - Verify that the lunar day is within range (1-31)
    - Ensure the icon name matches the activity alias

3. **Icon files missing**:
    - Run `node generate-calendar-icons.js` to regenerate icons
    - Check that the script completed successfully

### Debug Information

The service provides detailed logging:

-   Icon change attempts
-   Lunar day calculations
-   Error messages with stack traces

## Future Enhancements

1. **iOS Support**: Implement dynamic icons for iOS using Shortcuts
2. **More Icon Designs**: Additional calendar styles and themes
3. **Scheduled Updates**: Automatic icon updates at midnight
4. **User Preferences**: Allow users to disable automatic updates
5. **Holiday Icons**: Special icons for important lunar holidays

## Files Structure

```
├── android/app/src/main/
│   ├── AndroidManifest.xml          # Activity aliases configuration
│   └── res/mipmap-*/               # Icon files for each density
├── components/
│   └── DynamicIconDemo.tsx         # Demo component
├── hooks/
│   └── useDynamicIcon.ts           # React hook
├── services/
│   └── DynamicIconService.ts       # Core service
├── generate-calendar-icons.js       # Icon generation script
└── calendar-icon.svg               # Base icon template
```

## License

This implementation is part of the Vạn Sự Lịch app and follows the same license terms.
