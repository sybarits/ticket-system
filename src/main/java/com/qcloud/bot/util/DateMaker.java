package com.qcloud.bot.util;

public class DateMaker {
    
    public String getISODate(String str) {// input format will be like this -> 2021. 9. 27 오후 1:38:31
        StringBuilder sb = new StringBuilder(str);
        int start = sb.indexOf("오") + 3;
        int end = sb.indexOf(":");
        String hh_str = sb.substring(start, end);
        int hh = Integer.parseInt(hh_str);
        if (sb.indexOf(" 오후 ") != -1) {
            if (hh != 12) {
                hh += 12;
            }
        }
        sb.delete(start, end);
        sb.insert(start, hh);
        sb = sb.replace(sb.indexOf("."), sb.indexOf(".") + 2, "-");
        sb = sb.replace(sb.indexOf("."), sb.indexOf(".") + 2, "-");
        if (sb.indexOf(" 오전 ") != -1) {
            sb = sb.replace(sb.indexOf(" 오전 "), sb.indexOf(" 오전 ") + 4, "T");
        }
        if (sb.indexOf(" 오후 ") != -1) {
            sb = sb.replace(sb.indexOf(" 오후 "), sb.indexOf(" 오후 ") + 4, "T");
        }
        return sb.toString();// output format 2021-9-27T13:38:31
    }


    public static void main(String[] args) {
        DateMaker d = new DateMaker();
        d.getISODate("2021. 9. 27 오후 1:38:31");
    }
}
