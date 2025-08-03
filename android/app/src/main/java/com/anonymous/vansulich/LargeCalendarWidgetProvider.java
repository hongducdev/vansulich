package com.anonymous.vansulich;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class LargeCalendarWidgetProvider extends AppWidgetProvider {
    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] appWidgetIds) {
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy", Locale.getDefault());
        String fullDate = sdf.format(calendar.getTime());
        
        String[] weekdays = {"CHỦ NHẬT", "THỨ HAI", "THỨ BA", "THỨ TƯ", "THỨ NĂM", "THỨ SÁU", "THỨ BẢY"};
        String weekday = weekdays[calendar.get(Calendar.DAY_OF_WEEK) - 1];
        
        // Get lunar date from bridge
        String lunarDateText = LunarDateBridge.getLunarDateString(context);
        String lunarDayName = "Ngày Tân Mão";
        String lunarMonthName = "Tháng Quý Mùi";
        String lunarYearName = "Năm Ất Tị";
        
        // Calculate current week dates
        Calendar weekStart = Calendar.getInstance();
        weekStart.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        
        for (int id : appWidgetIds) {
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_large_calendar);
            
            views.setTextViewText(R.id.widget_weekday_large, weekday);
            views.setTextViewText(R.id.widget_full_date, fullDate);
            views.setTextViewText(R.id.widget_lunar_full_date, lunarDateText.replace("Âm lịch: ", "") + " ÂL");
            views.setTextViewText(R.id.widget_lunar_day_name_large, lunarDayName);
            views.setTextViewText(R.id.widget_lunar_month_name, lunarMonthName);
            views.setTextViewText(R.id.widget_lunar_year_name, lunarYearName);
            
            manager.updateAppWidget(id, views);
        }
    }

    @Override
    public void onEnabled(Context context) {
        super.onEnabled(context);
        // Start the update service when first widget is added
        WidgetUpdateService.startService(context);
    }
} 