package com.qcloud.bot.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.qcloud.bot.model.newresearcher.NewResearcher;
import com.qcloud.bot.model.user.UserDto;
import com.qcloud.bot.service.statistics.OpenStatisticsService;

@RestController
@RequestMapping(value = "/openstatistics")
public class OpenStatisticsController {

    @Resource(name = "OpenStatistics")
    OpenStatisticsService openStatisticsService;

    @RequestMapping(value = "/newresearchers", method = RequestMethod.GET)
    public List<NewResearcher> getOpenAllNewResearchers() {
        return openStatisticsService.getOpenAllNewResearchers();
    }
    
    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<UserDto> ticketAllGet() {
        return openStatisticsService.getOpenAllUsers();
    }

    
}
