package com.anonymous.vansulich;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.widget.RemoteViews;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class MyWidgetProvider extends AppWidgetProvider {
    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] appWidgetIds) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy", Locale.getDefault());
        String dateText = "Hôm nay: " + sdf.format(new Date());
        
        // Get lunar date from bridge (saved by React Native)
        String lunarDateText = LunarDateBridge.getLunarDateString(context);
        
        for (int id : appWidgetIds) {
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_layout);
            views.setTextViewText(R.id.widget_date, dateText);
            views.setTextViewText(R.id.widget_lunar_date, lunarDateText);
            manager.updateAppWidget(id, views);
        }
    }
} 