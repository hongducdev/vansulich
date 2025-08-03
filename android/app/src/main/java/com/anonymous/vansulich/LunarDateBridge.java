package com.anonymous.vansulich;

import android.content.Context;
import android.content.SharedPreferences;

public class LunarDateBridge {
    private static final String PREF_NAME = "LunarDatePrefs";
    private static final String KEY_LUNAR_DAY = "lunar_day";
    private static final String KEY_LUNAR_MONTH = "lunar_month";
    private static final String KEY_LUNAR_YEAR = "lunar_year";
    private static final String KEY_LUNAR_DAY_CAN = "lunar_day_can";
    private static final String KEY_LUNAR_DAY_CHI = "lunar_day_chi";
    
    public static void saveLunarDate(Context context, int day, int month, int year, String dayCan, String dayChi) {
        SharedPreferences prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putInt(KEY_LUNAR_DAY, day);
        editor.putInt(KEY_LUNAR_MONTH, month);
        editor.putInt(KEY_LUNAR_YEAR, year);
        editor.putString(KEY_LUNAR_DAY_CAN, dayCan);
        editor.putString(KEY_LUNAR_DAY_CHI, dayChi);
        editor.apply();
    }
    
    public static int[] getLunarDate(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        int day = prefs.getInt(KEY_LUNAR_DAY, 1);
        int month = prefs.getInt(KEY_LUNAR_MONTH, 1);
        int year = prefs.getInt(KEY_LUNAR_YEAR, 2024);
        return new int[]{day, month, year};
    }
    
    public static String getLunarDateString(Context context) {
        int[] lunarDate = getLunarDate(context);
        return String.format("Âm lịch: %d/%d", lunarDate[0], lunarDate[1]);
    }
    
    public static String getLunarDayCanChi(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        String dayCan = prefs.getString(KEY_LUNAR_DAY_CAN, "Giáp");
        String dayChi = prefs.getString(KEY_LUNAR_DAY_CHI, "Tý");
        return dayCan + " " + dayChi;
    }
} 