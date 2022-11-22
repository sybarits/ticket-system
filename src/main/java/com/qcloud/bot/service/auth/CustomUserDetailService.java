package com.qcloud.bot.service.auth;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.qcloud.bot.model.auth.AuthPage;
import com.qcloud.bot.model.auth.UserAuth;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Resource
    private ReactiveMongoTemplate mongoTemplate;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Mono<UserAuth> result = mongoTemplate.findOne(
                Query.query(new Criteria().orOperator(
                    Criteria.where("name").is(name)
                )),
                UserAuth.class);
        return result.block();
    }
    
    public UserAuth signInUser(UserAuth user) {
        System.out.println("signInUser");
        System.out.println(getUserByUserId(user.getUserId()));
        if (getUserByUserId(user.getUserId()).size() == 0) {
            return mongoTemplate.insert(user).block();
        } else {
            return null;
        }
    }

    public UserAuth deleteUser(String userId) {
        Query query = new Query(Criteria.where("userId").in(userId));
        return mongoTemplate.findAndRemove(query, UserAuth.class).block();
    }

    public List<UserAuth> getUserByUserId(String userId) {
        Flux<UserAuth> result = mongoTemplate.find(
                Query.query(new Criteria().orOperator(
                    Criteria.where("userId").is(userId)
                )),
                UserAuth.class);
        return result.collectList().block();
    }

    public AuthPage getAuthPage() {
        Mono<AuthPage> result = mongoTemplate.findOne(
                new Query(),
                AuthPage.class);
        return result.block();
    }

    public AuthPage insertAuthPage(AuthPage authPage) {
        return mongoTemplate.insert(authPage).block();
    }
    
}