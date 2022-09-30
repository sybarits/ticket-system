package com.qcloud.bot.model.form;

import lombok.Data;

@Data
public class GoogleForm {
    
    private String title;
    private String date;
    private String description;
    private String detail;
    private String participation_rate;// 80/100
    private String link;
}
