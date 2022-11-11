package com.qcloud.bot.model.newresearcher;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "newresearcher")
@Data
public class NewResearcher {
    @Id
    private String _id;
    private NewResearcherStatus status;
    private NewResearcherType type;
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
    private String quota;
    private String usage_unit;
    private String group;
    private String etc;
    private String history;
    private String training_contry;
    private String training_institution;
    private String training_part;
    private String training_charge;
    private String application_number;
    private String training_start_date;
    private String training_extension_date;
    private String training_end_date;
    private String training_cost;
    private String file_id;
    private String file_name;

}
