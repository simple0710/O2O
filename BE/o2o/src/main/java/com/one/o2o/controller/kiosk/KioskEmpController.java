package com.one.o2o.controller.kiosk;


import com.one.o2o.dto.EmpCard.EmpCardRequestDto;
import com.one.o2o.dto.EmpCard.UserDto;
import com.one.o2o.dto.common.Response;
import com.one.o2o.service.EmpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/kiosk/users")
@RequiredArgsConstructor
@Slf4j
public class KioskEmpController {

    private final EmpService empService;

    @PostMapping("/emp-check")
    public ResponseEntity<Response> readLockerList(@RequestBody EmpCardRequestDto empCardRequestDto){
        UserDto userDto = empService.findUserByEmpCard(empCardRequestDto);
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "유저 조회", userDto), HttpStatus.OK);
    }
}
