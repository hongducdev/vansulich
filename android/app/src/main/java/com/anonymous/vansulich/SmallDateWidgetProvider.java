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
import java.util.Locale;

public class SmallDateWidgetProvider extends AppWidgetProvider {
    private static final String TAG = "SmallDateWidget";

    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] appWidgetIds) {
        try {
            Calendar calendar = Calendar.getInstance();
            SimpleDateFormat sdf = new SimpleDateFormat("dd", Locale.getDefault());
            String dayNumber = sdf.format(calendar.getTime());
            
            String[] weekdays = {"CHỦ NHẬT", "THỨ HAI", "THỨ BA", "THỨ TƯ", "THỨ NĂM", "THỨ SÁU", "THỨ BẢY"};
            String weekday = weekdays[calendar.get(Calendar.DAY_OF_WEEK) - 1];
            
            String[] months = {"", "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", 
                              "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"};
            String month = months[calendar.get(Calendar.MONTH) + 1];
            
            // Get lunar date from bridge
            String lunarDateText = LunarDateBridge.getLunarDateString(context);
            String lunarDayCanChi = LunarDateBridge.getLunarDayCanChi(context);
            
            // Calculate current week number
            int weekOfYear = calendar.get(Calendar.WEEK_OF_YEAR);
            
            for (int id : appWidgetIds) {
                RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_small_date);
                
                views.setTextViewText(R.id.widget_weekday, weekday);
                views.setTextViewText(R.id.widget_day_number, dayNumber);
                views.setTextViewText(R.id.widget_month, month);
                views.setTextViewText(R.id.widget_lunar_date, lunarDateText.replace("Âm lịch: ", ""));
                views.setTextViewText(R.id.widget_lunar_day_name, lunarDayCanChi);
                views.setTextViewText(R.id.widget_calendar_icon, String.valueOf(weekOfYear));
                
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