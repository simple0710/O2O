package com.one.o2o.controller;

import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.rent.RentResponseDto;
import com.one.o2o.dto.reserve.ReserveRequestDto;
import com.one.o2o.dto.reserve.ReserveResponseDto;
import com.one.o2o.service.RentService;
import com.one.o2o.service.ReserveService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/reserve")
@AllArgsConstructor
@Slf4j
public class ReserveController {
    private final ReserveService reserveService;

    @PostMapping()
    public ResponseEntity<Response> createReserve(@RequestBody ReserveRequestDto reserveRequestDto){
        log.info("reserveRequestDto = {}", reserveRequestDto.getUserId());
        int reserveId = reserveService.createReserve(reserveRequestDto);
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "예약이 완료되었습니다.", reserveId), HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity<Response> deleteReserve(@RequestParam Integer reserveId){
        boolean flag = reserveService.deleteReserve(reserveId);
        String msg = flag? "예약이 취소되었습니다":"예약이 취소되지 않았습니다";
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), msg, reserveId), HttpStatus.OK);
    }

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