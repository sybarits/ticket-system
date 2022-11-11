package com.qcloud.bot.service.newresearcher;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.qcloud.bot.model.RequestDto;
import com.qcloud.bot.model.newresearcher.TrainingHistory;

import reactor.core.publisher.Flux;

@Service("TrainingHistory")
public class TrainingHistoryService {

    @Resource
    private ReactiveMongoTemplate mongoTemplate;
    
    public List<TrainingHistory> getAllTrainingHistorys() {
        Flux<TrainingHistory> result = mongoTemplate.findAll(TrainingHistory.class);
        return result.collectList().block();
    }

    public List<TrainingHistory> getTrainingHistories(RequestDto request) {
        Flux<TrainingHistory> result = mongoTemplate.find(
                Query.query(new Criteria().orOperator(
                    Criteria.where("_id").is(request.getQuery_string()),
                    Criteria.where("application_number").is(request.getQuery_string()),
                    Criteria.where("training_end_date").is(request.getQuery_string()),
                    Criteria.where("training_start_date").is(request.getQuery_string())
                )),
                TrainingHistory.class);
        return result.collectList().block();
    }

    public List<TrainingHistory> putTrainingHistories(RequestDto request) {
        List<TrainingHistory> trainingHistoryList = request.getTrainingHistoryList();
        Flux<TrainingHistory> result = mongoTemplate.insertAll(trainingHistoryList);
        return result.collectList().block();
    }

    public List<TrainingHistory> updateTrainingHistories(RequestDto request) {
        Flux<TrainingHistory> result = Flux.fromIterable(request.getTrainingHistoryList()).flatMap(mongoTemplate::save);
        return result.collectList().block();
    }

    public List<TrainingHistory> deleteTrainingHistory(List<String> deleteIdList) {
        List<String> ids = new ArrayList<>();
        for (String id : deleteIdList) {
            ids.add(id);
        }

        Query query = new Query(Criteria.where("_id").in(ids));
        Flux<TrainingHistory> result = mongoTemplate.findAllAndRemove(query, TrainingHistory.class);
        return result.collectList().block();
    }

    public List<TrainingHistory> getTrainingHistory(String id) {
        Flux<TrainingHistory> result = mongoTemplate.find(
                Query.query(new Criteria().orOperator(
                    Criteria.where("_id").is(id)
                )),
                TrainingHistory.class);
        return result.collectList().block();
    }

    public List<TrainingHistory> getTrainingHistoryByResearcherId(String researcherId) {
        Flux<TrainingHistory> result = mongoTemplate.find(
                Query.query(new Criteria().orOperator(
                    Criteria.where("researcher_id").is(researcherId)
                )),
                TrainingHistory.class);
        return result.collectList().block();
    }


}