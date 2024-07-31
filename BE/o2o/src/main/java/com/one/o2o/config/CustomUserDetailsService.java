package com.one.o2o.config;

import com.one.o2o.dto.MemberDto;
import com.one.o2o.entity.MemberEntity;
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
    private UserDetails createUserDetails(MemberEntity member) {

        // MemberEntity를 MemberDto로 변환
        MemberDto memberDto = new MemberDto();
        memberDto.setUser_lgid(member.getUserLgid());
        memberDto.setUser_pw(member.getUser_pw());
        memberDto.setUser_nm(member.getUser_nm());
        memberDto.setEmp_cd(member.getEmp_cd());
        memberDto.setUser_img(member.getUser_img());
        memberDto.set_admin(member.is_admin());
        memberDto.setUser_tel(member.getUser_tel());
        memberDto.set_active(member.is_active());

        return User.builder()
                .username(memberDto.getUser_nm()  )
                .password(memberDto.getUser_pw())
                .roles(memberDto.is_admin() ? "ADMIN" : "USER") // 권한 설정
                .build();
    }

}