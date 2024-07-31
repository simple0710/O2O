package com.one.o2o.controller;

import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.rent.RentResponseDto;
import com.one.o2o.dto.reserve.ReserveResponseDto;
import com.one.o2o.service.RentService;
import com.one.o2o.service.ReserveService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/reserve")
@AllArgsConstructor
public class ReserveController {
    private final ReserveService reserveService;

    @GetMapping("/view")
    public ResponseEntity<Response> readReserve(@RequestParam int userId, int pg_no, int per_page) {
        ReserveResponseDto reserveResponseDto = reserveService.readReserveByUser(userId, pg_no, per_page);
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "예약 조회 성공했습니다.", reserveResponseDto), HttpStatus.OK);
    }

    @GetMapping("/view/body")
    public ResponseEntity<Response> readReserve(@RequestParam int userId, int bodyId, int pg_no, int per_page) {
        ReserveResponseDto reserveResponseDto = reserveService.readReserveByUserAndLockerBody(userId, bodyId, pg_no, per_page);
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "예약 조회 성공했습니다.", reserveResponseDto), HttpStatus.OK);
    }
}