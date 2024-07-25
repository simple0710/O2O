package com.one.o2o.service;

import com.one.o2o.dto.MemberDto;
import com.one.o2o.entity.MemberEntity;
import com.one.o2o.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.function.Supplier;

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

    @Transactional
    public MemberEntity searchprofile(int user_id){

        return memberRepository.findById(user_id).get();
    }

    @Transactional
    public MemberEntity updateprofile(int user_id, MemberEntity memberEntity) throws Throwable {
        MemberEntity user_entity=  memberRepository.findById(user_id).orElseThrow(new Supplier<Throwable>() {
            @Override
            public Throwable get() {
                return new IllegalArgumentException("수정에 실패하였습니다!");
            }
        });
        user_entity.setUser_pw(memberEntity.getUser_pw());
        user_entity.setUser_tel(memberEntity.getUser_tel());



        return null;
    }


}
