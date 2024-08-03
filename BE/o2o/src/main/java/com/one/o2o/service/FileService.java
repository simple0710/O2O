package com.one.o2o.service;

import com.one.o2o.dto.common.Response;
import com.one.o2o.entity.File;
import com.one.o2o.repository.FileRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.UUID;

public interface FileService {
    Response saveFile(MultipartFile multipartFile, Integer userId) throws IOException;
}

@RequiredArgsConstructor
@Service
class FileServiceImpl implements FileService {

    @Value("${file.upload.dir}")
    private String uploadDir;

    private final FileRepository fileRepository;

    @Override
    @Transactional
    public Response saveFile(MultipartFile multipartFile, Integer userId) throws IOException {
        Response response = new Response(HttpStatus.OK.value(), "이미지 저장 완료");
        String uuidFileName = UUID.randomUUID().toString() + "_" + multipartFile.getOriginalFilename();
        File file = File.builder()
                .userId(userId)
                .type(multipartFile.getContentType())
                .name(uuidFileName)
                .createdAt(LocalDateTime.now())
                .build();
        String filePath = uploadDir + "products/" + uuidFileName;
        Path path = Paths.get(filePath);
        if (Files.notExists(path.getParent())) {
            Files.createDirectories(path.getParent());
        }
        try {
            // 파일을 임시로 저장
            Files.copy(multipartFile.getInputStream(), path);

            // 데이터베이스에 파일 정보 저장
            response.setData(fileRepository.save(file).getId());

        } catch (Exception e) {
            // 예외가 발생하면 파일을 삭제하고 예외를 다시 던진다
            Files.deleteIfExists(path);
            throw new RuntimeException("파일 저장 중 오류가 발생했습니다.", e);
        }
        return response;
    }
}
