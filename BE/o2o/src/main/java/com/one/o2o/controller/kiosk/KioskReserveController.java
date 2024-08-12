package com.one.o2o.controller.kiosk;

import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.reserve.ReserveResponseDto;
import com.one.o2o.service.ReserveService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/kiosk/reserve")
@AllArgsConstructor
public class KioskReserveController {
    private final ReserveService reserveService;

    @GetMapping("/view/body")
    public ResponseEntity<Response> readReserve(@RequestParam int userId, int bodyId, int pg_no, int per_page) {
        ReserveResponseDto reserveResponseDto = reserveService.readReserveByUserAndLockerBody(userId, bodyId, pg_no, per_page);
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "예약 조회 성공했습니다.", reserveResponseDto), HttpStatus.OK);
    }
}