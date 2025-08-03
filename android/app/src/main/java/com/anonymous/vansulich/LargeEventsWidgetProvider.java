package com.anonymous.vansulich;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.widget.RemoteViews;
import android.util.Log;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class LargeEventsWidgetProvider extends AppWidgetProvider {
    private static final String TAG = "LargeEventsWidget";

    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] appWidgetIds) {
        try {
            // Get upcoming holidays from bridge (saved by React Native)
            List<HolidayDataBridge.HolidayInfo> upcomingHolidays = 
                HolidayDataBridge.getUpcomingHolidays(context, 180); // Next 6 months
            
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy", Locale.getDefault());
            
            String event1Name = "Không có sự kiện";
            String event1Date = "";
            String event1Days = "";
            
            String event2Name = "Không có sự kiện";
            String event2Date = "";
            String event2Days = "";
            
            // Set first event (nearest holiday)
            if (upcomingHolidays.size() > 0) {
                HolidayDataBridge.HolidayInfo firstHoliday = upcomingHolidays.get(0);
                event1Name = firstHoliday.name;
                event1Date = "ngày " + firstHoliday.date;
                event1Days = firstHoliday.daysUntil + " ngày";
            }
            
            // Set second event (next upcoming holiday)
            if (upcomingHolidays.size() > 1) {
                HolidayDataBridge.HolidayInfo secondHoliday = upcomingHolidays.get(1);
                event2Name = secondHoliday.name;
                event2Date = "ngày " + secondHoliday.date;
                event2Days = secondHoliday.daysUntil + " ngày";
            }
            
            for (int id : appWidgetIds) {
                RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_large_events);
                
                views.setTextViewText(R.id.widget_upcoming_event_1, event1Name);
                views.setTextViewText(R.id.widget_upcoming_event_1_date, event1Date);
                views.setTextViewText(R.id.widget_upcoming_event_1_days, event1Days);
                
                views.setTextViewText(R.id.widget_upcoming_event_2, event2Name);
                views.setTextViewText(R.id.widget_upcoming_event_2_date, event2Date);
                views.setTextViewText(R.id.widget_upcoming_event_2_days, event2Days);
                
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
} 