package com.one.o2o.service;

import com.one.o2o.config.JwtToken;
import com.one.o2o.config.JwtTokenProvider;
import com.one.o2o.dto.User.MemberDto;
import com.one.o2o.entity.MemberEntity;
import com.one.o2o.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public boolean registmember(MemberEntity memberEntity) {

        // 아이디 중복 확인!
        if(memberRepository.existsByUserLgid(memberEntity.getUserLgid()) >0){

            return false;
        }
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
    public MemberEntity updateprofile(int user_id, MemberDto memberEntity) throws Throwable {

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


    public JwtToken refreshAccessToken(String userId, String refreshToken) {


        // 2. 사용자 정보 조회
        MemberEntity memberEntity = memberRepository.findById(Integer.valueOf(userId)).orElse(null);
        System.out.println("~~~~~~~~~~~~~~~");
        System.out.println(memberEntity);
        System.out.println("~~~~~~~~~~~~~~~");
        if (memberEntity == null) {
            return null; // 사용자 정보가 존재하지 않음
        }


        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(memberEntity.getUserLgid(), memberEntity.getUserPw());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        JwtToken jwtToken = jwtTokenProvider.generateToken(authentication);



        return jwtToken; // 새로운 JWT 토큰 반환

    }
}
