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
import com.qcloud.bot.model.user.UserDto;
import com.qcloud.bot.service.user.UserService;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Resource(name = "QCloudUser")
    UserService qCloudUser;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<UserDto> usersAllGet() {
        return qCloudUser.getAllUsers();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public List<UserDto> ticketGet(@PathVariable("id") String id) {
        return qCloudUser.getUser(id);
    }


    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<UserDto> usersGet(@RequestParam(value = "query_string") String query_string) {
        return qCloudUser.getUsers(query_string);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    public List<UserDto> usersPut(@RequestBody RequestDto request) {
        return qCloudUser.putUsers(request);
    }

    @RequestMapping(value = "", method = RequestMethod.PATCH)
    public List<UserDto> usersUpdate(@RequestBody RequestDto request) {
        return qCloudUser.updateUsers(request);
    }

    @RequestMapping(value = "", method = RequestMethod.DELETE)
    public List<UserDto> usersDelete(@RequestParam(value = "deleteIdList") List<String> deleteIdList) {
        return qCloudUser.deleteUsers(deleteIdList);
    }


    
}
