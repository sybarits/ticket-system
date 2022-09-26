package com.qcloud.bot.service.googleSheets;

import org.springframework.stereotype.Service;

import com.google.api.services.sheets.v4.model.ValueRange;
import com.qcloud.bot.model.SheetDto;

@Service("IBMGSheets")
public class IBMQGSheetsServiceImpl implements GSheetsService {

    @Override
    public ValueRange getDataAll(SheetDto sheet) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ValueRange getData(SheetDto sheet) {
        // TODO Auto-generated method stub
        return null;
    }
    
}
