package com.anonymous.vansulich;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class WidgetProvider extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateWidget(context, appWidgetManager, appWidgetId);
        }
    }

    private void updateWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        // Tạo RemoteViews cho widget
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_layout);

        // Cập nhật thông tin ngày hiện tại
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy", new Locale("vi"));
        String currentDate = dateFormat.format(new Date());

        // Lấy thông tin âm lịch từ LunarNotificationHelper
        String lunarInfo = LunarNotificationHelper.getLunarDateInfo();
        String auspiciousHours = LunarNotificationHelper.getAuspiciousHoursInfo();

        // Cập nhật nội dung widget
        views.setTextViewText(R.id.widget_date, currentDate);
        views.setTextViewText(R.id.widget_lunar_info, lunarInfo);
        views.setTextViewText(R.id.widget_auspicious_hours, auspiciousHours);

        // Tạo intent để mở app khi click vào widget
        Intent intent = new Intent(context, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            context,
            0,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        views.setOnClickPendingIntent(R.id.widget_container, pendingIntent);

        // Cập nhật widget
        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    @Override
    public void onEnabled(Context context) {
        super.onEnabled(context);
        // Widget được thêm vào màn hình chính
    }

    @Override
    public void onDisabled(Context context) {
        super.onDisabled(context);
        // Widget được xóa khỏi màn hình chính
    }
} 