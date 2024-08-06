package com.one.o2o.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@Slf4j
public class FileUploadController {

    @Value("${upload.path}")
    private String uploadPath;

    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        log.info("file = {}", file);
        try {
            // 업로드할 디렉토리 경로
            Path path = Paths.get(uploadPath + file.getOriginalFilename());
            Files.write(path, file.getBytes());

            return ResponseEntity.ok("파일 업로드 성공");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패");
        }
    }

    @GetMapping("/images/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        log.info("filename = {}", filename);
        Path imagePath = Paths.get("/opt/homebrew/var/www/images/products/").resolve(filename);
        Resource resource = new FileSystemResource(imagePath.toFile());

        if (resource.exists()) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // 적절한 MIME 타입 설정
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
