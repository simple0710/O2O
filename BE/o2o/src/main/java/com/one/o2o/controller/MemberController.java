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
    // 회원가입하는 코드
    public ResponseEntity<?> registmember(@RequestBody MemberDto memberDto){
        MemberEntity memberEntity = MemberEntity.toEntity(memberDto);
        // 여기 Entity에서 Dto를 통해서 만드는걸로!
        System.out.println(memberEntity);

        // 회원가입이 성공하면 return true 실패하면 false 값을 준다!
        return new ResponseEntity<>(memberService.registmember(memberEntity), HttpStatus.OK) ;
    }


    @GetMapping("/profile/{user-id}")
    public ResponseEntity<?> registmember(@PathVariable("user-id") int user_id){
        // 서버에게 user-id (PK 값 1, 2, 3) 이런식의 값을 주면 사용자 프로필 정보를 get 해줌!
        return new ResponseEntity<>(memberService.searchprofile(user_id) , HttpStatus.OK) ;
    }

    @PostMapping("/profile/{user-id}/edit")
    public ResponseEntity<?> registmember(@PathVariable("user-id") int user_id, @RequestBody MemberEntity memberEntity) throws Throwable {
        // 서버에게 MemberEntity를 주면 그 user-id (PK 값 1, 2, 3)에 따라 해당 사용자의 프로필 정보 변경!!
        // 일단은 비밀번호랑 전화번호 정도만 바꿀수 있도록 했는데 더 추가하면되긴함!!
        return new ResponseEntity<>(memberService.updateprofile(user_id, memberEntity) , HttpStatus.OK) ;
    }
}
