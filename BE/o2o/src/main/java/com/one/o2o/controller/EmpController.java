package com.one.o2o.controller;


import com.one.o2o.dto.EmpCard.EmpCardRequestDto;
import com.one.o2o.dto.EmpCard.UserDto;
import com.one.o2o.dto.MemberDto;
import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.locker.LockerDto;
import com.one.o2o.service.EmpService;
import com.one.o2o.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
