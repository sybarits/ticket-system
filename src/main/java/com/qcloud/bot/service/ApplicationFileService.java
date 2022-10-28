package com.qcloud.bot.service;

import java.io.IOException;

import javax.annotation.Resource;

import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.qcloud.bot.model.ApplicationFile;

import reactor.core.publisher.Mono;

@Service
public class ApplicationFileService {
    // This file upload & download service has the file size limit of 16MB
    @Resource
    private ReactiveMongoTemplate mongoTemplate;

    public ApplicationFile addFile(MultipartFile file) throws IOException { 
        ApplicationFile appliFile = new ApplicationFile();
        appliFile.setFilename(file.getOriginalFilename());
        appliFile.setFileType(file.getContentType());
        appliFile.setFileSize(Long.toString(file.getSize()));
        appliFile.setFile(file.getBytes());
        ApplicationFile result = mongoTemplate.insert(appliFile).block();
        result.setFile(null);
        return result; 
    }

    public ApplicationFile getFile(String id) { 
        Mono<ApplicationFile> result =  mongoTemplate.findById(id, ApplicationFile.class); 
        return result.block();
    }

    public String deleteFile(String id) {
        Mono<ApplicationFile> result = mongoTemplate.findAndRemove(Query.query(Criteria.where("_id").is(id)), ApplicationFile.class);
        return result.block().get_id();
    }
}
