package com.qcloud.bot.model.user;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "users")
@Data
public class UserDto {

    private String _id;
    private CloudType cloud_service;
    private String user_num;
    private String name_ko;
    private String email;
    private String user_id;
    private String name_us;
    private String major;
    private String institution;
    private String private_info;
    private String position;
    private String phone;
    private String create_date;
    private String application_date;
    private String application_route;
    private String perpose;
    private String adviser;
    private String usage;
    private String quota;
    private String usage_unit;
    private UserStatus status;
    private String group;
    private String etc;
    private String history;
    private String file1_id;
    private String file1_name;
    private String file2_id;
    private String file2_name;

}
