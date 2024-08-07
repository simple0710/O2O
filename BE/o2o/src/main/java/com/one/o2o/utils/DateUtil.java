package com.one.o2o.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class DateUtil {
    public static LocalDateTime stringToLocalDateTime(String str){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        try {
            return LocalDateTime.parse(str, formatter);
        } catch(DateTimeParseException e){
            return null;
        }
    }

    public static LocalDateTime plusNMinutes(LocalDateTime now, int N){
        return now.plusMinutes(N);
    }
}
