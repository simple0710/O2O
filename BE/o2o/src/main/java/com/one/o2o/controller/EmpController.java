package com.one.o2o.controller;


import com.one.o2o.dto.EmpCard.EmpCardRequestDto;
import com.one.o2o.dto.EmpCard.UserDto;
<<<<<<< HEAD
import com.one.o2o.dto.MemberDto;
import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.locker.LockerDto;
import com.one.o2o.service.EmpService;
import com.one.o2o.service.MemberService;
=======
import com.one.o2o.dto.common.Response;
import com.one.o2o.service.EmpService;
>>>>>>> 7fabf22 (feat: [BE] 사원증 인식 페이지)
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.*;

import java.util.List;
=======
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
>>>>>>> 7fabf22 (feat: [BE] 사원증 인식 페이지)

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class EmpController {

    private final EmpService empService;

    @PostMapping("/emp-check")
    public ResponseEntity<Response> readLockerList(@RequestBody EmpCardRequestDto empCardRequestDto){
        UserDto userDto = empService.findUserByEmpCard(empCardRequestDto);
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "유저 조회", userDto), HttpStatus.OK);
    }
}
