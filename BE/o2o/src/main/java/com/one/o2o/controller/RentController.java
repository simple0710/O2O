package com.one.o2o.controller;

import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.locker.LockerDto;
import com.one.o2o.dto.rent.RentRequestDto;
import com.one.o2o.dto.rent.RentResponseDto;
import com.one.o2o.dto.rent.RentResponseSingleDto;
import com.one.o2o.entity.User;
import com.one.o2o.service.RentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/rent")
@AllArgsConstructor
public class RentController {
    private final RentService rentService;

    @GetMapping("/history")
    public ResponseEntity<Response> readRentHistory(@RequestParam int userId, int pg_no, int per_page) {
        RentResponseDto rentResponseDto = rentService.readRentByUserId(userId, pg_no, per_page);
        return new ResponseEntity<>(new Response(rentResponseDto), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Response> createRent(@RequestBody RentRequestDto rentRequestDto) {
        Integer rentId = rentService.createRent(rentRequestDto, new User(4, ""));
        Map<String, Object> map = new HashMap<>();
        map.put("rent_id", rentId);
        return new ResponseEntity<>(new Response(map), HttpStatus.OK);
    }
}
