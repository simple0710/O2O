package com.one.o2o.controller.kiosk;


import com.one.o2o.dto.EmpCard.EmpCardRequestDto;
import com.one.o2o.dto.EmpCard.UserDto;
import com.one.o2o.dto.common.Response;
import com.one.o2o.service.EmpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/kiosk/users")
@RequiredArgsConstructor
@Slf4j
public class KioskEmpController {

    private final EmpService empService;

    @PostMapping("/emp-check")
    public ResponseEntity<Response> readLockerList(
            @RequestPart("card") EmpCardRequestDto empCardRequestDto,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        log.info("card = {}", empCardRequestDto);
//        log.info("image = {}", image.getOriginalFilename());

        UserDto userDto = empService.findUserByEmpCard(image, empCardRequestDto);
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "유저 조회", userDto), HttpStatus.OK);
    }
}
