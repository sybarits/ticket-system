package com.qcloud.bot.service.googleSheets;

import com.google.api.services.sheets.v4.model.ValueRange;
import com.qcloud.bot.model.SheetDto;


public interface GSheetsService {

    public ValueRange getDataAll(SheetDto sheet);
    public ValueRange getData(SheetDto sheet);
    
}
