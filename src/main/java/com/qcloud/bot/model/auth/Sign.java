package com.qcloud.bot.model.auth;

import lombok.Data;

@Data
public class Sign {
    private String result, message, token, roles;
}
