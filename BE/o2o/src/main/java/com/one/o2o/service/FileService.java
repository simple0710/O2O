package com.one.o2o.service;

import com.one.o2o.dto.ProductSavedEvent;
import com.one.o2o.dto.common.Response;
import com.one.o2o.entity.File;
import com.one.o2o.event.ProductSavedEventListener;
import com.one.o2o.repository.FileRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface FileService {
    Response saveFile(List<MultipartFile> multipartFile, Integer userId, Integer productId) throws IOException;
}

@RequiredArgsConstructor
@Service
@Slf4j
class FileServiceImpl implements FileService {

    @Value("${upload.path.products}")
    private String uploadPath;

    private final FileRepository fileRepository;
    private final ProductSavedEventListener productSavedEventListener;

    @Override
    @Transactional
    public Response saveFile(List<MultipartFile> files, Integer userId, Integer productId) throws IOException {

        Response response = new Response(HttpStatus.OK.value(), "이미지 저장 완료");
        try {
            // 저장할 디렉토리 경로
            Path directoryPath = Paths.get(uploadPath);

            // 디렉토리가 없다면 생성
            if (Files.notExists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }
            LocalDateTime now = LocalDateTime.now();

            // 파일 리스트 저장
            for (MultipartFile file : files) {
                // UUID 이름
                String newFileName = UUID.randomUUID().toString() + file.getOriginalFilename();

                Path path = Paths.get(uploadPath + newFileName);

                if (!file.isEmpty()) {
                    // 경로에 파일 저장
                    Files.write(path, file.getBytes());

                    // DB에 파일 정보 저장
                    File fileEntity = File.builder()
                            .userId(userId)
                            .type(file.getContentType())
                            .name(newFileName)
                            .createdAt(now)
                            .build();
                    Integer fileId = (Integer) fileRepository.save(fileEntity).getId();

                    // File Images에 제품과의 연관관계 저장
                    ProductSavedEvent event = ProductSavedEvent.builder()
                            .fileId(fileId)
                            .productId(productId)
                            .build();
                    productSavedEventListener.handleProductSavedEvent(event);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("파일 저장 중 오류가 발생했습니다.", e);
        }
        return response;
    }
}
