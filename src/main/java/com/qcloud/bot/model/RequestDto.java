package com.qcloud.bot.model;

import java.util.List;

import com.qcloud.bot.model.ticket.TicketDto;
import com.qcloud.bot.model.user.UserDto;

import lombok.Data;

@Data
public class RequestDto {
    private TicketDto ticket;
    private List<TicketDto> ticketList;
    private UserDto user;
    private List<UserDto> userList;
    private String query_string;
}
