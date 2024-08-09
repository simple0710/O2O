package com.one.o2o.utils;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
@Slf4j
public class ImageManage {

    private String uploadPath;
    private String newFileName;
    @Getter
    private Path path;

    @Value("${upload.path.emp}")
    private String empPath;

    @Value("${upload.path.products}")
    private String productsPath;

    @Value("${upload.path.empTemp}")
    private String empTempPath;

    // type/ 1=물품, 2=사원, 3=임시
    public void saveImage(MultipartFile file, Integer type) {
        if (file == null || file.isEmpty()) return;
        uploadPath = null;
        newFileName = null;
        path = null;

        if (type == 1) {
            uploadPath = empPath;
        } else if (type == 2) {
            uploadPath = productsPath;
        } else if (type == 3) {
            log.info("empTempPath ={}",empTempPath);
            uploadPath = empTempPath;
        } else {
            return;
        }
        log.info("type = {}", type);
        log.info("uploadPath = {}", uploadPath);
        try {
            // 디렉토리 확인
            Path directoryPath = Paths.get(uploadPath);

            if (Files.notExists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }

            newFileName = UUID.randomUUID().toString();

            path = Paths.get(uploadPath + newFileName);

            if (!file.isEmpty()) {
                Files.write(path, file.getBytes());
            }

        } catch (Exception e) {
            deleteImage();
            e.printStackTrace();
        }
    }

    public void deleteImage() {
        try {
            if (newFileName != null) {
                // 파일 삭제 시도
                Path filePath = Paths.get(uploadPath + newFileName);
                try {
                    Files.delete(filePath);
                } catch (IOException deleteException) {
                    throw new RuntimeException("파일 삭제에 실패했습니다.", deleteException);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
