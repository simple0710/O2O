package com.one.o2o.service;

import com.one.o2o.dto.EmpCard.EmpCardRequestDto;
import com.one.o2o.dto.EmpCard.UserDto;
import com.one.o2o.entity.User;
import com.one.o2o.mapper.UserMapper;
import com.one.o2o.repository.UserRepository;
import com.one.o2o.utils.ImageManage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmpServiceImpl implements EmpService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final ImageManage imageManage;

    @Value("${upload.path.empTemp}")
    private String empTempPath;

    @Value("${upload.path.emp}")
    private String empPath;

    @Value("${python.path")
    private String pythonPath;

    @Value("${python.path.script.image.compare}")
    private String comparePath;

    @Override
    public UserDto findUserByEmpCard(MultipartFile image, EmpCardRequestDto empCardRequestDto) {

        List<User> userList = userRepository.findAllByUserNm(empCardRequestDto.getName());
        // user 여러 명 나왔을 때 처리 필요
        if (userList.isEmpty()) return null;

        // 회원 사진 비교 로직 수행
        try {
            imageManage.saveImage(image, 3);
            double max = 0;
            int idx = -1;
            for (int i = 0; i < userList.size(); i++) {
                double matchValue = Double.parseDouble(compare(imageManage.getPath(), userList.get(i).getUserImg())) * 100;
                log.info("index = {}", i);
                if (70 <= matchValue && max < matchValue) {
                    max = matchValue;
                    idx = i;
                }
            }
            return idx == -1 ? userMapper.userToUserDto(userList.get(0)) : userMapper.userToUserDto(userList.get(idx));
        } finally {
            if (imageManage != null) {
                imageManage.deleteImage();
            }
        }
    }

    private String compare(Path nowUserImg, String anotherImg) {
        Process process = null;
        BufferedReader reader = null;
        BufferedReader errorReader = null;
        try {
            // 한글이 포함된 파일 경로를 URL 인코딩합니다.
            String image1Path = empTempPath + nowUserImg.getFileName();
            String image2Path = empPath + anotherImg;

            java.io.File file = new java.io.File(image2Path);
            if (!file.exists()) {
                log.info("Error: The file \" + image2Path + \" does not exist.");
                return "0";
            }

            ProcessBuilder processBuilder = new ProcessBuilder(pythonPath,
                    comparePath,
                    image1Path,
                    image2Path
            );
            processBuilder.environment().put("PYTHONIOENCODING", "utf-8");

            processBuilder.redirectErrorStream(true);  // 에러 스트림을 표준 출력으로 리다이렉트
            process = processBuilder.start();

            reader = new BufferedReader(new InputStreamReader(process.getInputStream(), "UTF-8"));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }

            int exitCode = process.waitFor();
            return output.toString();
//            return "Python script executed. Exit code: " + exitCode + "\nOutput: " + output.toString();
        } catch (Exception e) {
            return "0";
//            return "Error executing Python script: " + e.getMessage();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (Exception e) {
                    // 로그 처리
                }
            }
            if (process != null) {
                process.destroy();
            }
        }
    }
}
