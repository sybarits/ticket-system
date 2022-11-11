package com.qcloud.bot.model.newresearcher;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "traininghistories")
@Data
public class TrainingHistory {
    @Id
    private String _id;
    private String researcher_id;
    private String application_date;
    private String application_number;
    private String training_start_date;
    private String training_end_date;
    private String training_cost;
    private String training_days;
    private String training_months;

}