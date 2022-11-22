package com.qcloud.bot.model.auth;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "authpages")
@Data
public class AuthPage {
    
    private List<String> administrator;
    private List<String> cloudService;
    private List<String> newResearcher;

}
