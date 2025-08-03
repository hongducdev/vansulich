package com.anonymous.vansulich;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.app.Service;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.IBinder;
import android.os.SystemClock;
import android.util.Log;

public class WidgetUpdateService extends Service {
    private static final int UPDATE_INTERVAL = 30 * 60 * 1000; // 30 minutes
    private static final String TAG = "WidgetUpdateService";

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        try {
            updateAllWidgets();
            scheduleNextUpdate();
        } catch (Exception e) {
            Log.e(TAG, "Error in onStartCommand: " + e.getMessage());
        }
        return START_STICKY;
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    private void updateAllWidgets() {
        try {
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(this);
            
            // Update Small Events Widget
            ComponentName smallEventsWidget = new ComponentName(this, SmallEventsWidgetProvider.class);
            int[] smallEventsIds = appWidgetManager.getAppWidgetIds(smallEventsWidget);
            if (smallEventsIds.length > 0) {
                Intent updateIntent = new Intent(this, SmallEventsWidgetProvider.class);
                updateIntent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
                updateIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, smallEventsIds);
                sendBroadcast(updateIntent);
            }

            // Update Small Date Widget
            ComponentName smallDateWidget = new ComponentName(this, SmallDateWidgetProvider.class);
            int[] smallDateIds = appWidgetManager.getAppWidgetIds(smallDateWidget);
            if (smallDateIds.length > 0) {
                Intent updateIntent = new Intent(this, SmallDateWidgetProvider.class);
                updateIntent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
                updateIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, smallDateIds);
                sendBroadcast(updateIntent);
            }

            // Update Large Calendar Widget
            ComponentName largeCalendarWidget = new ComponentName(this, LargeCalendarWidgetProvider.class);
            int[] largeCalendarIds = appWidgetManager.getAppWidgetIds(largeCalendarWidget);
            if (largeCalendarIds.length > 0) {
                Intent updateIntent = new Intent(this, LargeCalendarWidgetProvider.class);
                updateIntent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
                updateIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, largeCalendarIds);
                sendBroadcast(updateIntent);
            }

            // Update Large Events Widget
            ComponentName largeEventsWidget = new ComponentName(this, LargeEventsWidgetProvider.class);
            int[] largeEventsIds = appWidgetManager.getAppWidgetIds(largeEventsWidget);
            if (largeEventsIds.length > 0) {
                Intent updateIntent = new Intent(this, LargeEventsWidgetProvider.class);
                updateIntent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
                updateIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, largeEventsIds);
                sendBroadcast(updateIntent);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error updating widgets: " + e.getMessage());
        }
    }

    private void scheduleNextUpdate() {
        try {
            AlarmManager alarmManager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
            Intent intent = new Intent(this, WidgetUpdateService.class);
            PendingIntent pendingIntent = PendingIntent.getService(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
            
            alarmManager.setExactAndAllowWhileIdle(
                AlarmManager.ELAPSED_REALTIME_WAKEUP,
                SystemClock.elapsedRealtime() + UPDATE_INTERVAL,
                pendingIntent
            );
        } catch (Exception e) {
            Log.e(TAG, "Error scheduling next update: " + e.getMessage());
        }
    }

    public static void startService(Context context) {
        try {
            Intent intent = new Intent(context, WidgetUpdateService.class);
            context.startService(intent);
        } catch (Exception e) {
            Log.e(TAG, "Error starting service: " + e.getMessage());
        }
    }
} 