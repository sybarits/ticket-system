package com.qcloud.bot.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.qcloud.bot.model.RequestDto;
import com.qcloud.bot.model.ticket.TicketDto;
import com.qcloud.bot.service.ticket.TicketService;

@RestController
@RequestMapping(value = "/ticket")
public class TicketController {

    @Resource(name = "QCloudTicket")
    TicketService qCloudTicket;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<TicketDto> ticketAllGet() {
        return qCloudTicket.getAllTickets();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public List<TicketDto> ticketGet(@PathVariable("id") String id) {
        return qCloudTicket.getTicket(id);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<TicketDto> ticketGetByType(@RequestParam(value = "ticketType") String ticketType) {
        return qCloudTicket.getTicketByStatus(ticketType);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    public List<TicketDto> ticketPut(@RequestBody RequestDto request) {
        return qCloudTicket.putTickets(request);
    }

    @RequestMapping(value = "", method = RequestMethod.PATCH)
    public List<TicketDto> ticketsUpdate(@RequestBody RequestDto request) {
        return qCloudTicket.updateTickets(request);
    }

    @RequestMapping(value = "", method = RequestMethod.DELETE)
    public List<TicketDto> ticketsDelete(@RequestParam(value = "deleteIdList") List<String> deleteIdList) {
        return qCloudTicket.deleteTickets(deleteIdList);
    }


    
}
