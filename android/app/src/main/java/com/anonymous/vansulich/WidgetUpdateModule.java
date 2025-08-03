package com.anonymous.vansulich;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class WidgetUpdateModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public WidgetUpdateModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "WidgetUpdateModule";
    }

    @ReactMethod
    public void startWidgetUpdateService() {
        WidgetUpdateService.startService(reactContext);
    }
} 