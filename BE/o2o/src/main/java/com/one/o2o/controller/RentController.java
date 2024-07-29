package com.one.o2o.controller;

import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.locker.LockerDto;
import com.one.o2o.dto.rent.RentResponseDto;
import com.one.o2o.service.RentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rent")
@AllArgsConstructor
public class RentController {
    private final RentService rentService;

    @GetMapping("/history")
    public ResponseEntity<Response> readRentHistory(@RequestParam int userId, int pg_no, int per_page){
        RentResponseDto rentResponseDto = rentService.readRentByUserId(userId, pg_no, per_page);
        return new ResponseEntity<>(new Response(rentResponseDto), HttpStatus.OK);
    }

}
