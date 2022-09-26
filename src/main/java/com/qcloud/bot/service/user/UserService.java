package com.qcloud.bot.service.user;

import java.util.List;

import com.qcloud.bot.model.RequestDto;
import com.qcloud.bot.model.user.UserDto;

public interface UserService {
    public List<UserDto> getAllUsers();
    public List<UserDto> getUsers(RequestDto request);
    public List<UserDto> putUsers(RequestDto request);
    public List<UserDto> updateUsers(RequestDto request);
    public List<UserDto> deleteUsers(RequestDto request);
}
