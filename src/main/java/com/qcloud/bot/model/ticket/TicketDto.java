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
    private TicketType ticket_type;
    private String create_date;
    private String last_modify_date;
    private TicketStatus status;
    private boolean save_object;
    private String desc;
    private String history;
    
    private String user_id;
    private UserDto user;

}
