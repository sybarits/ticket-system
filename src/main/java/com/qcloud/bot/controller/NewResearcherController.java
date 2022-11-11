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
import com.qcloud.bot.model.newresearcher.NewResearcher;
import com.qcloud.bot.service.newresearcher.NewResearcherService;

@RestController
@RequestMapping(value = "/newresearcher")
public class NewResearcherController {

    @Resource(name = "NewResearcher")
    NewResearcherService newResearcherService;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<NewResearcher> newReasearcherAllGet() {
        return newResearcherService.getAllNewResearchers();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public List<NewResearcher> newReasearcherGet(@PathVariable("id") String id) {
        return newResearcherService.getNewResearcher(id);
    }


    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<NewResearcher> newReasearcherGet(@RequestBody RequestDto request) {
        return newResearcherService.getNewResearchers(request);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    public List<NewResearcher> newReasearcherPut(@RequestBody RequestDto request) {
        return newResearcherService.putNewResearchers(request);
    }

    @RequestMapping(value = "", method = RequestMethod.PATCH)
    public List<NewResearcher> newReasearcherUpdate(@RequestBody RequestDto request) {
        return newResearcherService.updateNewResearchers(request);
    }

    @RequestMapping(value = "", method = RequestMethod.DELETE)
    public List<NewResearcher> newReasearcherDelete(@RequestParam(value = "deleteIdList") List<String> deleteIdList) {
        return newResearcherService.deleteNewResearcher(deleteIdList);
    }


    
}
