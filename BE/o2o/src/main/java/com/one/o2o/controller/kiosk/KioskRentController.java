package com.one.o2o.controller.kiosk;

import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.rent.RentRequestDto;
import com.one.o2o.dto.rent.RentResponseDto;
import com.one.o2o.dto.rent.ReturnRequestDto;
import com.one.o2o.service.RentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/kiosk/rent")
@AllArgsConstructor
public class KioskRentController {
    private final RentService rentService;

    @GetMapping("/history")
    public ResponseEntity<Response> readRentHistory(@RequestParam int userId, int pg_no, int per_page) {
        RentResponseDto rentResponseDto = rentService.readRentByUserId(userId, pg_no, per_page);
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "대여 조회 성공했습니다.", rentResponseDto), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Response> createRent(@RequestBody RentRequestDto rentRequestDto) {
        Integer rentId = rentService.createRent(rentRequestDto);
        Map<String, Object> map = new HashMap<>();
        map.put("rent_id", rentId);
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "대여가 완료되었습니다.", map), HttpStatus.OK);
    }

    @GetMapping("/current")
    public ResponseEntity<Response> readRentCurrent(@RequestParam int userId, int pg_no, int per_page) {
        RentResponseDto rentResponseDto = rentService.readOngoingRentByUserId(userId, pg_no, per_page);
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "진행 중 대여를 조회 성공했습니다", rentResponseDto), HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<Response> createReturn(@RequestBody ReturnRequestDto returnRequestDto) {
        boolean flag = rentService.createReturn(returnRequestDto);
        String msg = flag? "반납이 완료되었습니다.":"반납이 완료되지 않았습니다.";
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), msg), HttpStatus.OK);
    }
}
