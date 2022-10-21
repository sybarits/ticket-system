package com.qcloud.bot.service.user;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.qcloud.bot.model.RequestDto;
import com.qcloud.bot.model.user.UserDto;
import com.qcloud.bot.model.user.UserStatus;

import reactor.core.publisher.Flux;

@Service("QCloudUser")
public class QCloudUserService implements UserService {

    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
    
    @Resource
    private ReactiveMongoTemplate mongoTemplate;
    
    @Override
    public List<UserDto> getAllUsers() {
        Flux<UserDto> result = mongoTemplate.findAll(UserDto.class);
        return result.collectList().block();
    }

    @Override
    public List<UserDto> getUsers(RequestDto request) {
        Flux<UserDto> result = mongoTemplate.find(
                Query.query(new Criteria().orOperator(
                    Criteria.where("_id").is(request.getQuery_string()),
                    Criteria.where("status").is(request.getQuery_string()),
                    Criteria.where("name_ko").is(request.getQuery_string()),
                    Criteria.where("name_us").is(request.getQuery_string()),
                    Criteria.where("email").is(request.getQuery_string()),
                    Criteria.where("cloud_service").is(request.getQuery_string())
                )),
                UserDto.class);
        return result.collectList().block();
    }

    @Override
    public List<UserDto> putUsers(RequestDto request) {
        List<UserDto> userList = request.getUserList();
        for (UserDto user : userList) {
            user.setCreate_date(sdf.format(new Date()));
            if (user.getApplication_date() == null || user.getApplication_date().equals("")) {
                user.setApplication_date(sdf.format(new Date()));
            }
            user.setStatus(UserStatus.APPLICATION);
        }
        Flux<UserDto> result = mongoTemplate.insertAll(userList);
        return result.collectList().block();
    }

    @Override
    public List<UserDto> updateUsers(RequestDto request) {
        Flux<UserDto> result = Flux.fromIterable(request.getUserList()).flatMap(mongoTemplate::save);
        return result.collectList().block();
    }

    @Override
    public List<UserDto> deleteUsers(List<String> deleteIdList) {
        List<String> ids = new ArrayList<>();
        for (String id : deleteIdList) {
            ids.add(id);
        }

        Query query = new Query(Criteria.where("_id").in(ids));
        Flux<UserDto> result = mongoTemplate.findAllAndRemove(query, UserDto.class);
        return result.collectList().block();
    }

    @Override
    public List<UserDto> getUser(String id) {
        Flux<UserDto> result = mongoTemplate.find(
                Query.query(new Criteria().orOperator(
                    Criteria.where("_id").is(id)
                )),
                UserDto.class);
        return result.collectList().block();
    }


}