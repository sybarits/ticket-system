package com.qcloud.bot.service.ticket;

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
import com.qcloud.bot.model.ticket.TicketDto;
import com.qcloud.bot.model.ticket.TicketType;
import com.qcloud.bot.model.user.UserDto;
import com.qcloud.bot.model.user.UserStatus;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service("QCloudTicket")
public class QCloudTicketService implements TicketService {

    private SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
    
    @Resource
    private ReactiveMongoTemplate mongoTemplate;

    @Override
    public List<TicketDto> getAllTickets() {
        Flux<TicketDto> result = mongoTemplate.findAll(TicketDto.class);
        return result.collectList().block();
    }

    @Override
    public List<TicketDto> getTickets(RequestDto request) {
        Flux<TicketDto> result = mongoTemplate.find(
                Query.query(new Criteria().orOperator(
                    Criteria.where("_id").is(request.getQuery_string()),
                    Criteria.where("status").is(request.getQuery_string()),
                    Criteria.where("user.name_ko").is(request.getQuery_string()),
                    Criteria.where("user.name_us").is(request.getQuery_string()),
                    Criteria.where("user.email").is(request.getQuery_string()),
                    Criteria.where("user.cloud_service").is(request.getQuery_string()),
                    Criteria.where("user._id").is(request.getQuery_string())
                )),
                TicketDto.class);
        return result.collectList().block();
    }

    @Override
    public List<TicketDto> putTickets(RequestDto request) {
        List<TicketDto> ticketList = request.getTicketList();
        Flux<TicketDto> result = mongoTemplate.insertAll(ticketList);
        return result.collectList().block();
    }

    @Override
    public List<TicketDto> updateTickets(RequestDto request) {
        Flux<TicketDto> result = Flux.fromIterable(request.getTicketList()).flatMap(mongoTemplate::save);
        return result.collectList().block();
    }

    @Override
    public List<TicketDto> deleteTickets(List<String> deletList) {
        List<String> ids = new ArrayList<>();
        for (String id : deletList) {
            ids.add(id);
        }

        Query query = new Query(Criteria.where("_id").in(ids));
        Flux<TicketDto> result = mongoTemplate.findAllAndRemove(query, TicketDto.class);
        return result.collectList().block();
    }

    @Override
    public List<TicketDto> getTicket(String id) {
        Flux<TicketDto> result = mongoTemplate.find(
                Query.query(new Criteria().orOperator(
                    Criteria.where("_id").is(id)
                )),
                TicketDto.class);
        return result.collectList().block();
    }

    @Override
    public List<TicketDto> getTicketByStatus(String ticketType) {
        Flux<TicketDto> result = mongoTemplate.find(
                Query.query(new Criteria().orOperator(
                    Criteria.where("status").is(ticketType)
                )),
                TicketDto.class);
        return result.collectList().block();
    }

}
