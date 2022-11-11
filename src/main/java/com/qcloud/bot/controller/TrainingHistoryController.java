package com.qcloud.bot.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.qcloud.bot.model.RequestDto;
import com.qcloud.bot.model.newresearcher.TrainingHistory;
import com.qcloud.bot.service.newresearcher.TrainingHistoryService;

@RestController
@RequestMapping(value = "/traininghistory")
public class TrainingHistoryController {

    @Resource(name = "TrainingHistory")
    TrainingHistoryService trainingHistoryService;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<TrainingHistory> trainingHistoriesAllGet() {
        return trainingHistoryService.getAllTrainingHistorys();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public List<TrainingHistory> trainingHistoryGet(@PathVariable("id") String id) {
        return trainingHistoryService.getTrainingHistory(id);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<TrainingHistory> trainingHistoriesGetByResearcherId(@RequestParam(value = "researcherId") String researcherId) {
        return trainingHistoryService.getTrainingHistoryByResearcherId(researcherId);
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<TrainingHistory> trainingHistoriesGet(@RequestBody RequestDto request) {
        return trainingHistoryService.getTrainingHistories(request);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    public List<TrainingHistory> trainingHistoriesPut(@RequestBody RequestDto request) {
        return trainingHistoryService.putTrainingHistories(request);
    }

    @RequestMapping(value = "", method = RequestMethod.PATCH)
    public List<TrainingHistory> trainingHistoriesUpdate(@RequestBody RequestDto request) {
        return trainingHistoryService.updateTrainingHistories(request);
    }

    @RequestMapping(value = "", method = RequestMethod.DELETE)
    public List<TrainingHistory> trainingHistoriesDelete(@RequestParam(value = "deleteIdList") List<String> deleteIdList) {
        return trainingHistoryService.deleteTrainingHistory(deleteIdList);
    }


    
}
