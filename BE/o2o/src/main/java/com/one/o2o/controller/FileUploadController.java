package com.one.o2o.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

@RestController
@Slf4j
public class FileUploadController {

    @Value("${upload.path.emp}")
    private String uploadPath;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        log.info("file = {}", file);
        try {
            Path directoryPath = Paths.get(uploadPath);
            // 업로드할 디렉토리 경로
            Path path = Paths.get(uploadPath + file.getOriginalFilename());

            if (!Files.exists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }

            Files.write(path, file.getBytes());

            return ResponseEntity.ok("파일 업로드 성공");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패");
        }
    }

    @GetMapping("/images/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        log.info("filename = {}", filename);
        Path imagePath = Paths.get("http://localhost:80/images/employees").resolve(filename);
        Resource resource = new FileSystemResource(imagePath.toFile());

        if (resource.exists()) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // 적절한 MIME 타입 설정
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/images2/{filename}")
    public ResponseEntity<byte[]> getImage2(@PathVariable String filename) {
        log.info("filename = {}", filename);

        // Nginx를 통해 제공되는 이미지 URL
        String url = "http://localhost:80/images/employees/" + filename;
        try {
            byte[] imageBytes = restTemplate.getForObject(url, byte[].class);
            log.info(Arrays.toString(imageBytes));
            if (imageBytes != null) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // 적절한 MIME 타입 설정
                        .body(imageBytes);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Error fetching image", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
