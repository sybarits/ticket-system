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

import reactor.core.publisher.Flux;

@Service("QCloudUser")
public class QCloudUserService implements UserService {

    private SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
    
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
    public List<UserDto> deleteUsers(RequestDto request) {
        List<Integer> ids = new ArrayList<>();
        for (UserDto user : request.getUserList()) {
            ids.add(Integer.parseInt(user.get_id()));
        }

        Query query = new Query(Criteria.where("_id").in(ids));
        Flux<UserDto> result = mongoTemplate.findAllAndRemove(query, UserDto.class);
        return result.collectList().block();
    }
    
}
