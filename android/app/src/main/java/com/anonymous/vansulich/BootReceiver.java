package com.anonymous.vansulich;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;

public class BootReceiver extends BroadcastReceiver {
    private static final String TAG = "BootReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        Log.d(TAG, "BootReceiver received action: " + action);

        if (Intent.ACTION_BOOT_COMPLETED.equals(action) ||
            Intent.ACTION_MY_PACKAGE_REPLACED.equals(action) ||
            Intent.ACTION_PACKAGE_REPLACED.equals(action)) {

            // Kiểm tra xem thông báo có được bật không
            SharedPreferences preferences = context.getSharedPreferences("notification_settings", Context.MODE_PRIVATE);
            boolean isEnabled = preferences.getBoolean("notification_enabled", false);

            if (isEnabled) {
                // Khởi động lại thông báo
                Intent serviceIntent = new Intent(context, NotificationService.class);
                serviceIntent.setAction("SCHEDULE_NOTIFICATION");
                context.startService(serviceIntent);
                Log.d(TAG, "Restarted notification service after boot");
            }
        }
    }
} 