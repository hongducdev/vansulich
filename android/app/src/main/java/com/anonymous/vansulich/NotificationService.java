package com.anonymous.vansulich;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import java.util.Calendar;

public class NotificationService extends Service {
    private static final String TAG = "NotificationService";
    private static final String CHANNEL_ID = "daily_notification_channel";
    private static final String CHANNEL_NAME = "Thông báo hàng ngày";
    private static final String CHANNEL_DESCRIPTION = "Thông báo thông tin ngày và sự kiện";
    private static final int NOTIFICATION_ID = 1001;
    
    private AlarmManager alarmManager;
    private NotificationManager notificationManager;
    private SharedPreferences preferences;

    @Override
    public void onCreate() {
        super.onCreate();
        alarmManager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        preferences = getSharedPreferences("notification_settings", MODE_PRIVATE);
        createNotificationChannel();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null) {
            String action = intent.getAction();
            if ("SCHEDULE_NOTIFICATION".equals(action)) {
                scheduleDailyNotification();
            } else if ("CANCEL_NOTIFICATION".equals(action)) {
                cancelDailyNotification();
            } else if ("SHOW_NOTIFICATION".equals(action)) {
                showDailyNotification();
            }
        }
        return START_STICKY;
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                CHANNEL_NAME,
                NotificationManager.IMPORTANCE_DEFAULT
            );
            channel.setDescription(CHANNEL_DESCRIPTION);
            notificationManager.createNotificationChannel(channel);
        }
    }

    public void scheduleDailyNotification() {
        boolean isEnabled = preferences.getBoolean("notification_enabled", false);
        if (!isEnabled) {
            return;
        }

        int hour = preferences.getInt("notification_hour", 8);
        int minute = preferences.getInt("notification_minute", 0);

        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, hour);
        calendar.set(Calendar.MINUTE, minute);
        calendar.set(Calendar.SECOND, 0);

        // Nếu thời gian đã qua hôm nay, lên lịch cho ngày mai
        if (calendar.getTimeInMillis() <= System.currentTimeMillis()) {
            calendar.add(Calendar.DAY_OF_YEAR, 1);
        }

        Intent intent = new Intent(this, NotificationService.class);
        intent.setAction("SHOW_NOTIFICATION");
        PendingIntent pendingIntent = PendingIntent.getService(
            this,
            NOTIFICATION_ID,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        // Lên lịch thông báo hàng ngày
        alarmManager.setRepeating(
            AlarmManager.RTC_WAKEUP,
            calendar.getTimeInMillis(),
            AlarmManager.INTERVAL_DAY,
            pendingIntent
        );

        Log.d(TAG, "Scheduled daily notification for " + hour + ":" + minute);
    }

    public void cancelDailyNotification() {
        Intent intent = new Intent(this, NotificationService.class);
        intent.setAction("SHOW_NOTIFICATION");
        PendingIntent pendingIntent = PendingIntent.getService(
            this,
            NOTIFICATION_ID,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        alarmManager.cancel(pendingIntent);
        Log.d(TAG, "Cancelled daily notification");
    }

    private void showDailyNotification() {
        // Sử dụng LunarNotificationHelper để lấy thông tin chi tiết
        String notificationTitle = "Văn Sử Lịch - " + LunarNotificationHelper.getCurrentDateInfo();
        String notificationText = LunarNotificationHelper.getFullNotificationText();

        // Tạo intent để mở app khi click vào thông báo
        Intent intent = new Intent(this, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            this,
            0,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_calendar)
            .setContentTitle(notificationTitle)
            .setContentText("Xem thông tin âm lịch và giờ hoàng đạo hôm nay")
            .setStyle(new NotificationCompat.BigTextStyle()
                .bigText(notificationText))
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)
            .setVibrate(new long[]{0, 500, 200, 500}) // Rung khi có thông báo
            .setDefaults(NotificationCompat.DEFAULT_SOUND | NotificationCompat.DEFAULT_LIGHTS)
            .setCategory(NotificationCompat.CATEGORY_REMINDER);

        notificationManager.notify(NOTIFICATION_ID, builder.build());
        
        // Lên lịch thông báo tiếp theo
        scheduleDailyNotification();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
} 