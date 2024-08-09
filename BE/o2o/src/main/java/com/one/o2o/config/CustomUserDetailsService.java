package com.one.o2o.config;

import com.one.o2o.dto.User.MemberDto;
import com.one.o2o.entity.Users;
import com.one.o2o.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String user_lgid) throws UsernameNotFoundException {
        return memberRepository.findByUserLgid(user_lgid)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 회원을 찾을 수 없습니다."));

    }

    // 해당하는 User 의 데이터가 존재한다면 UserDetails 객체로 만들어서 return
    private UserDetails createUserDetails(Users member) {

        // MemberEntity를 MemberDto로 변환
        MemberDto memberDto = MemberDto.builder()
                .userId(member.getUserId())
                .userLgid(member.getUserLgid())
                .userPw(member.getUserPw())
                .userNm(member.getUserNm())
                .empCd(member.getEmpCd())
                .userImg(member.getUserImg())
                .isAdmin(member.getIsAdmin())
                .userTel(member.getUserTel())
                .isActive(member.getIsActive())
                .build();
        return User.builder()

                .username(String.valueOf(member.getUserId()))
                .password(member.getUserPw())
                .roles(member.getIsAdmin() ? "ADMIN" : "USER") // 권한 설정
                .build();
    }

}