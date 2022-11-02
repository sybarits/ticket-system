package com.qcloud.bot.service.googleSheets;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.stereotype.Service;

import com.google.api.services.sheets.v4.model.ValueRange;
import com.qcloud.bot.credential.GoogleSheetAPI;
import com.qcloud.bot.model.SheetDto;
import com.qcloud.bot.model.user.UserDto;

@Service("ionqGSheet")
public class IonQGSheetsServiceImpl implements GSheetsService {

    // private static final String IONQ_GOOGLE_SHEET_STRING
    //     = "https://docs.google.com/spreadsheets/d/1UzO53WGp8WYS5TAwU32sL3cWFsmVB8VtadY389F4ANE/edit?usp=sharing"; 
    private static final String IONQ_GOOGLE_SHEET_ID
        = "1UzO53WGp8WYS5TAwU32sL3cWFsmVB8VtadY389F4ANE"; 
    
    @Resource
    private ReactiveMongoTemplate mongoTemplate;

    @Override
    public ValueRange getDataAll(SheetDto sheet) {
        GoogleSheetAPI asAPI = new GoogleSheetAPI();
        ValueRange valueRange = null;
        try {
            sheet.setSheetID(IONQ_GOOGLE_SHEET_ID);
            sheet.setRange("A1:O114");
            valueRange = asAPI.getSheetsRange(sheet);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        List<List<Object>> values = valueRange.getValues();
        
        if (values == null || values.size() == 0) {
            System.out.println("No data found.");
        } else {
            for (List row : values) {
                if (row.size() > 0) {
                    System.out.println("row size is " + row.size());
                    System.out.println(row.toString());
                    // System.out.println(row.get(1).toString());
                    UserDto user = new UserDto();
                    user.setApplication_date(row.get(0).toString());
                    user.setPrivate_info(row.get(1).toString());
                    user.setInstitution(row.get(2).toString());
                    user.setMajor(row.get(3).toString());
                    user.setPosition(row.get(4).toString());
                    user.setAdviser(row.get(5).toString());
                    user.setName_ko(row.get(6).toString());
                    user.setName_us(row.get(7).toString());
                    user.setEmail(row.get(8).toString());
                    user.setPhone(row.get(9).toString());
                    user.setPerpose(row.get(10).toString());
                    // user.setApplication_route(row.get(14).toString());
                    // mongoTemplate.insert(user);
                    System.out.println(user.toString());
                }
            }
        }
        return null;
    }

    @Override
    public ValueRange getData(SheetDto sheet) {
        // TODO Auto-generated method stub
        return null;
    }

    public static void main(String[] args) {
        IonQGSheetsServiceImpl ionqSheetService = new IonQGSheetsServiceImpl();
        SheetDto sh = new SheetDto();
        ionqSheetService.getDataAll(sh);
    }
    
}
