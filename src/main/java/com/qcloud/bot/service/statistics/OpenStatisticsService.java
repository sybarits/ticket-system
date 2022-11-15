package com.qcloud.bot.service.statistics;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.stereotype.Service;

import com.qcloud.bot.model.newresearcher.NewResearcher;
import com.qcloud.bot.model.user.UserDto;

import reactor.core.publisher.Flux;

@Service("OpenStatistics")
public class OpenStatisticsService {
    
    @Resource
    private ReactiveMongoTemplate mongoTemplate;

    public List<NewResearcher> getOpenAllNewResearchers() {
        Flux<NewResearcher> result = mongoTemplate.findAll(NewResearcher.class);
        List<NewResearcher> openResult = result.collectList().block();
        for (NewResearcher newResearcher : openResult) {
            newResearcher.setAdviser("");
            newResearcher.setApplication_route("");
            newResearcher.setEmail("");
            newResearcher.setEtc("");
            newResearcher.setFile_id("");
            newResearcher.setFile_name("");
            newResearcher.setHistory("");
            newResearcher.setName_ko("");
            newResearcher.setName_us("");
            newResearcher.setPerpose("");
            newResearcher.setPhone("");
            newResearcher.setPrivate_info("");
            newResearcher.setQuota("");
            newResearcher.setTraining_charge("");
            newResearcher.setTraining_cost("");
            newResearcher.setUsage_unit("");
            newResearcher.setUser_id("");
            newResearcher.setUser_num("");
        }
        return openResult;
    }

    public List<UserDto> getOpenAllUsers() {
        Flux<UserDto> result = mongoTemplate.findAll(UserDto.class);
        List<UserDto> openResult = result.collectList().block();
        for (UserDto user : openResult) {
            user.setAdviser("");
            user.setApplication_route("");
            user.setEmail("");
            user.setEtc("");
            user.setFile1_id("");
            user.setFile1_name("");
            user.setFile2_id("");
            user.setFile2_name("");
            user.setHistory("");
            user.setName_ko("");
            user.setName_us("");
            user.setPerpose("");
            user.setPhone("");
            user.setPrivate_info("");
            user.setQuota("");
            user.setUsage("");
            user.setUsage_unit("");
            user.setUser_id("");
            user.setUser_num("");
        }
        return openResult;
    }
}
