package com.qcloud.bot.service.newresearcher;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.qcloud.bot.model.ApplicationFile;
import com.qcloud.bot.model.RequestDto;
import com.qcloud.bot.model.newresearcher.NewResearcher;
import com.qcloud.bot.model.newresearcher.NewResearcherStatus;
import com.qcloud.bot.util.HistoryMaker;

import reactor.core.publisher.Flux;

@Service("NewResearcher")
public class NewResearcherService {

    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
    
    @Resource
    private ReactiveMongoTemplate mongoTemplate;
    
    public List<NewResearcher> getAllNewResearchers() {
        Flux<NewResearcher> result = mongoTemplate.findAll(NewResearcher.class);
        return result.collectList().block();
    }

    public List<NewResearcher> getNewResearchers(RequestDto request) {
        Flux<NewResearcher> result = mongoTemplate.find(
                Query.query(new Criteria().orOperator(
                    Criteria.where("_id").is(request.getQuery_string()),
                    Criteria.where("status").is(request.getQuery_string()),
                    Criteria.where("name_ko").is(request.getQuery_string()),
                    Criteria.where("name_us").is(request.getQuery_string()),
                    Criteria.where("email").is(request.getQuery_string())
                )),
                NewResearcher.class);
        return result.collectList().block();
    }

    public List<NewResearcher> putNewResearchers(RequestDto request) {
        List<NewResearcher> NewResearcherList = request.getNewResearcherList();
        for (NewResearcher newResearcher : NewResearcherList) {
            newResearcher.setCreate_date(sdf.format(new Date()));
            if (newResearcher.getStatus() == null || newResearcher.getStatus().equals("")) {
                newResearcher.setStatus(NewResearcherStatus.APPLICATION);
            }
        }
        Flux<NewResearcher> result = mongoTemplate.insertAll(NewResearcherList);
        return result.collectList().block();
    }

    public List<NewResearcher> updateNewResearchers(RequestDto request) {
        for (NewResearcher next : request.getNewResearcherList()) {
            List<NewResearcher> prev = getNewResearcher(next.get_id());
            String history = HistoryMaker.get(prev.get(0), next);
            next.setHistory(history);
        }

        Flux<NewResearcher> result = Flux.fromIterable(request.getNewResearcherList()).flatMap(mongoTemplate::save);
        return result.collectList().block();
    }

    public List<NewResearcher> deleteNewResearcher(List<String> deleteIdList) {
        List<String> ids = new ArrayList<>();
        for (String id : deleteIdList) {
            ids.add(id);
            NewResearcher user = mongoTemplate.findOne(Query.query(Criteria.where("_id").is(id)), NewResearcher.class).block();
            if (user.getFile_id() != null && !user.getFile_id().equals("")) {
                mongoTemplate.findAndRemove(Query.query(Criteria.where("_id").is(user.getFile_id())), ApplicationFile.class).block();
            }
        }

        Query query = new Query(Criteria.where("_id").in(ids));
        Flux<NewResearcher> result = mongoTemplate.findAllAndRemove(query, NewResearcher.class);
        return result.collectList().block();
    }

    public List<NewResearcher> getNewResearcher(String id) {
        Flux<NewResearcher> result = mongoTemplate.find(
                Query.query(new Criteria().orOperator(
                    Criteria.where("_id").is(id)
                )),
                NewResearcher.class);
        return result.collectList().block();
    }


}