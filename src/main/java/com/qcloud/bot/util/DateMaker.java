package com.qcloud.bot.util;


public class DateMaker {
    private static String OJ = " 오전 ";
    private static String OH = " 오후 ";
    private static String O = "오";
    private static String COLON = ":";
    private static String COMMA = ".";
    private static String CAPITAL_T = "T";
    private static String DASH = "-";
    
    public String getISODate(String str) {// input format will be like this -> 2021. 9. 27 오후 1:38:31
        StringBuilder sb = new StringBuilder(str);
        int start = sb.indexOf(O) + 3;
        int end = sb.indexOf(COLON);
        String hh_str = sb.substring(start, end);
        int hh = Integer.parseInt(hh_str);
        if (sb.indexOf(OH) != -1) {
            if (hh != 12) {
                hh += 12;
            }
        }
        sb.delete(start, end);
        sb.insert(start, hh);
        sb = sb.replace(sb.indexOf(COMMA), sb.indexOf(COMMA) + 2, DASH);
        sb = sb.replace(sb.indexOf(COMMA), sb.indexOf(COMMA) + 2, DASH);
        if (sb.indexOf(OJ) != -1) {
            sb = sb.replace(sb.indexOf(OJ), sb.indexOf(OJ) + 4, CAPITAL_T);
        }
        if (sb.indexOf(OH) != -1) {
            sb = sb.replace(sb.indexOf(OH), sb.indexOf(OH) + 4, "T");
        }
        return sb.toString();// output format 2021-9-27T13:38:31
    }


    public static void main(String[] args) {
        DateMaker d = new DateMaker();
        System.out.println(d.getISODate("2021. 9. 27 오후 1:38:31"));
        System.out.println(d.getISODate("2021. 9. 27 오전 1:38:31"));
        System.out.println(d.getISODate("2021. 9. 27 오전 4:38:31"));
        System.out.println(d.getISODate("2021. 9. 27 오후 12:38:31"));
        System.out.println(d.getISODate("2021. 9. 27 오후 7:38:31"));
    }
}
