package com.one.o2o.service;

import com.one.o2o.config.JwtToken;
import com.one.o2o.config.JwtTokenProvider;
import com.one.o2o.dto.User.MemberDto;
import com.one.o2o.entity.MemberEntity;
import com.one.o2o.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    @Value("${upload.path.emp}")
    private String uploadPath;

    private final MemberRepository memberRepository;

    @Transactional
    public boolean registMember(MemberDto memberDto, MultipartFile file) {
        String newFileName = null;

        try {
            // 파일 저장 처리
            if (file != null && !file.isEmpty()) {
                Path directoryPath = Paths.get(uploadPath);

                if (Files.notExists(directoryPath)) {
                    Files.createDirectories(directoryPath);
                }

                newFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                Path path = Paths.get(uploadPath + newFileName);
                Files.write(path, file.getBytes());

                memberDto.setUserImg(newFileName);
            }

            // 회원 정보 저장 처리
            if (!saveMember(memberDto)) {
                // 회원 저장 실패 시 파일 삭제
                if (newFileName != null) {
                    Path filePath = Paths.get(uploadPath + newFileName);
                    try {
                        Files.delete(filePath);
                    } catch (IOException e) {
                        throw new RuntimeException("파일 삭제에 실패했습니다.", e);
                    }
                }
                throw new RuntimeException("회원 저장에 실패했습니다.");
            }

            return true;
        } catch (IOException e) {
            // 파일 저장 실패 시 예외 처리
            if (newFileName != null) {
                // 파일 삭제 시도
                Path filePath = Paths.get(uploadPath + newFileName);
                try {
                    Files.delete(filePath);
                } catch (IOException deleteException) {
                    throw new RuntimeException("파일 삭제에 실패했습니다.", deleteException);
                }
            }
            throw new RuntimeException("파일 저장에 실패했습니다.", e);
        }
    }

    private boolean saveMember(MemberDto memberDto) {
        // 아이디 중복 확인
        if (memberRepository.existsByUserLgid(memberDto.getUserLgid()) > 0) {
            return false;
        }

        memberDto.setIsActive(true);
        memberDto.setIsAdmin(false);
        MemberEntity memberEntity = MemberEntity.toEntity(memberDto);
        memberRepository.save(memberEntity);
        return true;
    }

    @Transactional
    public MemberEntity searchprofile(int user_id){

        return memberRepository.findById(user_id).get();
    }

    @Transactional
    public MemberEntity searchprofile_with_lgid(String user_id){

        return memberRepository.findByUserLgid(user_id).get();
    }

    @Transactional
    public MemberEntity updateprofile(int user_id, MemberEntity memberEntity) throws Throwable {

        MemberEntity user_entity=  memberRepository.findById(user_id).orElseThrow(new Supplier<Throwable>() {
            @Override
            public Throwable get() {
                return new IllegalArgumentException("수정에 실패하였습니다!");
            }
        });
        user_entity.setUserPw(memberEntity.getUserPw());
        user_entity.setUserTel(memberEntity.getUserTel());



        return null;
    }


    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public JwtToken signIn(String userlgid, String password){
        // 1. userlgid + password 를 기반으로 Authentication 객체 생성
        // 이때 authentication 은 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userlgid, password);

        // 2. 실제 검증. authenticate() 메서드를 통해 요청된 Member 에 대한 검증 진행
        // authenticate 메서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        JwtToken jwtToken = jwtTokenProvider.generateToken(authentication);
        log.info("jwtToken : " +  jwtToken);
        return jwtToken;
    }
}
