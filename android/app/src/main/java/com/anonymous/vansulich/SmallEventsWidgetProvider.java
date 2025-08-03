package com.anonymous.vansulich;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;
import android.util.Log;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class SmallEventsWidgetProvider extends AppWidgetProvider {
    private static final String TAG = "SmallEventsWidget";

    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] appWidgetIds) {
        try {
            // Get upcoming holidays from bridge (saved by React Native)
            List<HolidayDataBridge.HolidayInfo> upcomingHolidays = 
                HolidayDataBridge.getUpcomingHolidays(context, 180); // Next 6 months
            
            String event1Name = "Không có sự kiện";
            String event1Date = "";
            
            String event2Name = "Không có sự kiện";
            String event2Date = "";
            
            // Set first event (nearest holiday)
            if (upcomingHolidays.size() > 0) {
                HolidayDataBridge.HolidayInfo firstHoliday = upcomingHolidays.get(0);
                event1Name = firstHoliday.name;
                event1Date = "ngày " + firstHoliday.date;
            }
            
            // Set second event (next upcoming holiday)
            if (upcomingHolidays.size() > 1) {
                HolidayDataBridge.HolidayInfo secondHoliday = upcomingHolidays.get(1);
                event2Name = secondHoliday.name;
                event2Date = "ngày " + secondHoliday.date;
            }
            
            for (int id : appWidgetIds) {
                RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_small_events);
                
                views.setTextViewText(R.id.widget_event_1, event1Name);
                views.setTextViewText(R.id.widget_event_1_date, event1Date);
                
                views.setTextViewText(R.id.widget_event_2, event2Name);
                views.setTextViewText(R.id.widget_event_2_date, event2Date);
                
                manager.updateAppWidget(id, views);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error updating widget: " + e.getMessage());
        }
    }

    @Override
    public void onEnabled(Context context) {
        super.onEnabled(context);
        try {
            // Start the update service when first widget is added
            WidgetUpdateService.startService(context);
        } catch (Exception e) {
            Log.e(TAG, "Error starting service: " + e.getMessage());
        }
    }

    @Override
    public void onDisabled(Context context) {
        super.onDisabled(context);
        try {
            // Stop the service when all widgets are removed
            Intent intent = new Intent(context, WidgetUpdateService.class);
            context.stopService(intent);
        } catch (Exception e) {
            Log.e(TAG, "Error stopping service: " + e.getMessage());
        }
    }
} 