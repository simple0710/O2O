package com.one.o2o.controller;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;

@RestController
public class FileController {

    private static final String IMAGE_PATH = "src/main/resources/uploads/products/";



    @GetMapping("/images")
    public ResponseEntity<Resource> getImage(@RequestParam String filename) {
        try {
            String decodedFilename = java.net.URLDecoder.decode(filename, "UTF-8");
            // 파일 경로 설정

            File file = new File(IMAGE_PATH + filename);
            if (!file.exists()) {
                return ResponseEntity.notFound().build();
            }

            Resource resource = new FileSystemResource(file);

            // 파일의 Content-Type 설정
            String contentType = "image/png"; // 파일 확장자에 따라 적절히 설정 필요

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
