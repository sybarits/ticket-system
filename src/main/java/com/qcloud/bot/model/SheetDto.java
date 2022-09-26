package com.qcloud.bot.model;

import com.qcloud.bot.model.user.CloudType;

import lombok.Data;

@Data
public class SheetDto {
    
    private CloudType cloud_type;

    private String sheetID;
    
    private String range;

    private String data;
}
