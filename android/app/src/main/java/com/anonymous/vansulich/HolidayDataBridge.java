package com.anonymous.vansulich;

import android.content.Context;
import android.content.SharedPreferences;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;
import java.util.ArrayList;
import java.util.List;

public class HolidayDataBridge {
    private static final String PREF_NAME = "HolidayDataPrefs";
    private static final String KEY_HOLIDAY_DATA = "holiday_data";
    
    public static void saveHolidayData(Context context, String holidayDataJson) {
        try {
            SharedPreferences prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
            SharedPreferences.Editor editor = prefs.edit();
            editor.putString(KEY_HOLIDAY_DATA, holidayDataJson);
            editor.apply();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public static List<HolidayInfo> getUpcomingHolidays(Context context, int daysAhead) {
        List<HolidayInfo> holidays = new ArrayList<>();
        try {
            SharedPreferences prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
            String holidayDataJson = prefs.getString(KEY_HOLIDAY_DATA, "[]");
            
            JSONArray holidayArray = new JSONArray(holidayDataJson);
            for (int i = 0; i < holidayArray.length(); i++) {
                JSONObject holidayObj = holidayArray.getJSONObject(i);
                String name = holidayObj.getString("name");
                String date = holidayObj.getString("date");
                long daysUntil = holidayObj.getLong("daysUntil");
                
                if (daysUntil >= 0 && daysUntil <= daysAhead) {
                    holidays.add(new HolidayInfo(date, name, daysUntil));
                }
            }
            
            // Sort by days until
            holidays.sort((a, b) -> Long.compare(a.daysUntil, b.daysUntil));
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return holidays;
    }
    
    public static class HolidayInfo {
        public String date;
        public String name;
        public long daysUntil;
        
        public HolidayInfo(String date, String name, long daysUntil) {
            this.date = date;
            this.name = name;
            this.daysUntil = daysUntil;
        }
    }
} 