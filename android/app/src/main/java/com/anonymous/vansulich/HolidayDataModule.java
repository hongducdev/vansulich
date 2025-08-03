package com.anonymous.vansulich;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class HolidayDataModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public HolidayDataModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "HolidayDataModule";
    }

    @ReactMethod
    public void saveHolidayData(String holidayDataJson, Promise promise) {
        try {
            HolidayDataBridge.saveHolidayData(reactContext, holidayDataJson);
            promise.resolve("Holiday data saved successfully");
        } catch (Exception e) {
            promise.reject("ERROR", "Failed to save holiday data: " + e.getMessage());
        }
    }
} 