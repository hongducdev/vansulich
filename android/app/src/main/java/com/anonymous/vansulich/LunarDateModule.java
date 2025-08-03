package com.anonymous.vansulich;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class LunarDateModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public LunarDateModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "LunarDateModule";
    }

    @ReactMethod
    public void saveLunarDate(int day, int month, int year, String dayCan, String dayChi, Promise promise) {
        try {
            LunarDateBridge.saveLunarDate(reactContext, day, month, year, dayCan, dayChi);
            promise.resolve("Lunar date saved successfully");
        } catch (Exception e) {
            promise.reject("ERROR", "Failed to save lunar date: " + e.getMessage());
        }
    }

    @ReactMethod
    public void getLunarDate(Promise promise) {
        try {
            int[] lunarDate = LunarDateBridge.getLunarDate(reactContext);
            promise.resolve(lunarDate);
        } catch (Exception e) {
            promise.reject("ERROR", "Failed to get lunar date: " + e.getMessage());
        }
    }
} 