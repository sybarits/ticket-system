package com.qcloud.bot.model;

import java.util.List;

import com.qcloud.bot.model.auth.AuthPage;
import com.qcloud.bot.model.newresearcher.NewResearcher;
import com.qcloud.bot.model.newresearcher.TrainingHistory;
import com.qcloud.bot.model.ticket.TicketDto;
import com.qcloud.bot.model.user.UserDto;

import lombok.Data;

@Data
public class RequestDto {
    private TicketDto ticket;
    private List<TicketDto> ticketList;
    private UserDto user;
    private List<UserDto> userList;
    private List<NewResearcher> newResearcherList;
    private String query_string;
    private List<TrainingHistory> trainingHistoryList;
    private AuthPage authPage;
}
