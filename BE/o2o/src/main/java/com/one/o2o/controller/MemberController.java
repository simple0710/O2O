package com.one.o2o.controller;

import com.one.o2o.dto.MemberDto;
import com.one.o2o.entity.MemberEntity;
import com.one.o2o.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/regist")
    public ResponseEntity<?> registmember(@RequestBody MemberDto memberDto){
        MemberEntity memberEntity = MemberEntity.toEntity(memberDto);
        // 여기 Entity에서 Dto를 통해서 만드는걸로!
        System.out.println(memberEntity);


        return new ResponseEntity<>(memberService.registmember(memberEntity), HttpStatus.OK) ;
    }
}
