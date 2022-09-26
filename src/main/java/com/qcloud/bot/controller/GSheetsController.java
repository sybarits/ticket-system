package com.qcloud.bot.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.qcloud.bot.model.SheetDto;
import com.qcloud.bot.model.user.CloudType;
import com.qcloud.bot.service.googleSheets.GSheetsService;

@RestController
@RequestMapping(value = "/gs")
public class GSheetsController {

    @Resource(name="ionqGSheet")
    GSheetsService ionQGSheets;
    
    @Resource(name="dwaveGSheet")
    GSheetsService dwaveSheets;

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String test() {
        return "Success";
    }
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public SheetDto googleSheetsDataAllGet(@RequestBody SheetDto sheet) {
        if (sheet.getCloud_type() == CloudType.IONQ) {
            ionQGSheets.getDataAll(sheet);
        } else if (sheet.getCloud_type() == CloudType.DWAVE) {
            dwaveSheets.getDataAll(sheet);
        } else if (sheet.getCloud_type() == CloudType.IBMQ) {
            // TODO: wow
        }
        
        return sheet;
    }
}
