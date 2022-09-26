package com.qcloud.bot.model.ticket;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.qcloud.bot.model.user.UserDto;

import lombok.Data;

@Document(collection = "tickets")
@Data
public class TicketDto {

    @Id
    private String _id;
    private String ticket_id;
    private String user_id;
    private TicketType ticket_type;
    private String create_time;
    private String status;
    private String desc;
    private String history;
    private UserDto user;

}
