package com.one.o2o.service;

import com.one.o2o.dto.MemberDto;
import com.one.o2o.entity.MemberEntity;
import com.one.o2o.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public boolean registmember(MemberEntity memberEntity) {

        // 아이디 중복 확인!
        if(memberRepository.existsByUserLgid(memberEntity.getUser_lgid()) >0){

            return false;
        }
        memberRepository.save(memberEntity);
        return true;

    }


}
