package com.qcloud.bot.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "application_file")
@Data
public class ApplicationFile {

    @Id
    private String _id;
    private String filename;
    private String fileType;
    private String fileSize;
    private byte[] file;

}
