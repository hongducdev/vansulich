package com.anonymous.vansulich;

import android.Manifest;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;
import android.util.Log;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = "NotificationModule")
public class NotificationModule extends ReactContextBaseJavaModule {
    private static final String TAG = "NotificationModule";
    private ReactApplicationContext reactContext;

    public NotificationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "NotificationModule";
    }

    @ReactMethod
    public void scheduleNotification(ReadableMap settings, Promise promise) {
        try {
            boolean enabled = settings.getBoolean("enabled");
            int hour = settings.getInt("hour");
            int minute = settings.getInt("minute");

            SharedPreferences preferences = reactContext.getSharedPreferences("notification_settings", reactContext.MODE_PRIVATE);
            SharedPreferences.Editor editor = preferences.edit();
            editor.putBoolean("notification_enabled", enabled);
            editor.putInt("notification_hour", hour);
            editor.putInt("notification_minute", minute);
            editor.apply();

            Intent serviceIntent = new Intent(reactContext, NotificationService.class);
            if (enabled) {
                serviceIntent.setAction("SCHEDULE_NOTIFICATION");
                reactContext.startService(serviceIntent);
                Log.d(TAG, "Scheduled notification for " + hour + ":" + minute);
            } else {
                serviceIntent.setAction("CANCEL_NOTIFICATION");
                reactContext.startService(serviceIntent);
                Log.d(TAG, "Cancelled notification");
            }

            promise.resolve(true);
        } catch (Exception e) {
            Log.e(TAG, "Error scheduling notification", e);
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void getNotificationSettings(Promise promise) {
        try {
            SharedPreferences preferences = reactContext.getSharedPreferences("notification_settings", reactContext.MODE_PRIVATE);
            boolean enabled = preferences.getBoolean("notification_enabled", false);
            int hour = preferences.getInt("notification_hour", 8);
            int minute = preferences.getInt("notification_minute", 0);

            com.facebook.react.bridge.WritableMap settings = new com.facebook.react.bridge.Arguments().createMap();
            settings.putBoolean("enabled", enabled);
            settings.putInt("hour", hour);
            settings.putInt("minute", minute);

            promise.resolve(settings);
        } catch (Exception e) {
            Log.e(TAG, "Error getting notification settings", e);
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void checkNotificationPermission(Promise promise) {
        try {
            boolean hasPermission = true;
            
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                hasPermission = ContextCompat.checkSelfPermission(reactContext, Manifest.permission.POST_NOTIFICATIONS) 
                    == PackageManager.PERMISSION_GRANTED;
            }
            
            promise.resolve(hasPermission);
        } catch (Exception e) {
            Log.e(TAG, "Error checking notification permission", e);
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void requestNotificationPermission(Promise promise) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                // Gửi event để React Native xử lý việc xin quyền
                promise.resolve(true);
            } else {
                promise.resolve(true);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error requesting notification permission", e);
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void testNotification(Promise promise) {
        try {
            // Kiểm tra quyền trước khi gửi thông báo
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                if (ContextCompat.checkSelfPermission(reactContext, Manifest.permission.POST_NOTIFICATIONS) 
                    != PackageManager.PERMISSION_GRANTED) {
                    promise.reject("PERMISSION_DENIED", "Notification permission not granted");
                    return;
                }
            }
            
            Intent serviceIntent = new Intent(reactContext, NotificationService.class);
            serviceIntent.setAction("SHOW_NOTIFICATION");
            reactContext.startService(serviceIntent);
            promise.resolve(true);
        } catch (Exception e) {
            Log.e(TAG, "Error testing notification", e);
            promise.reject("ERROR", e.getMessage());
        }
    }
} 