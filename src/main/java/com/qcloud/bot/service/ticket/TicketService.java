package com.qcloud.bot.service.ticket;

import java.util.List;

import com.qcloud.bot.model.RequestDto;
import com.qcloud.bot.model.ticket.TicketDto;

public interface TicketService {
    public List<TicketDto> getAllTickets();
    public List<TicketDto> getTickets(RequestDto request);
    public List<TicketDto> putTickets(RequestDto request);
    public List<TicketDto> updateTickets(RequestDto request);
    public List<TicketDto> deleteTickets(List<String> deleteIdList);
    public List<TicketDto> getTicket(String id);
    public List<TicketDto> getTicketByStatus(String ticketType);
}
