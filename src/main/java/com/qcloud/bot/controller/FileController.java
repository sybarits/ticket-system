package com.qcloud.bot.controller;

import com.qcloud.bot.model.ApplicationFile;
import com.qcloud.bot.service.ApplicationFileService;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import javax.annotation.Resource;

@RestController
@RequestMapping(value = "/file")
public class FileController {

    @Resource
    private ApplicationFileService fileService;

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public ApplicationFile upload(@RequestParam("file") MultipartFile file) throws IOException {
        return fileService.addFile(file);
    }

    @RequestMapping(value = "/download/{id}", method = RequestMethod.GET)
    public ApplicationFile download(@PathVariable String id) throws IOException {
        return fileService.getFile(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public String delete(@PathVariable String id) throws IOException {
        return fileService.deleteFile(id);
    }

}
