package com.one.o2o.controller;

import com.one.o2o.dto.locker.LockerDto;
import com.one.o2o.dto.locker.LockerUpdateDto;
import com.one.o2o.dto.common.Response;
import com.one.o2o.entity.LockerBody;
import com.one.o2o.mapper.LockerMapper;
import com.one.o2o.service.LockerService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lockers")
@AllArgsConstructor
public class LockerController {
    private final LockerService lockerService;


    @GetMapping()
    public ResponseEntity<Response> readLockerList(@RequestParam int locker_body_id){
        List<LockerDto> list = lockerService.readLockerByBodyId(locker_body_id);
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "사물함 본체 목록 조회", list), HttpStatus.OK);
    }


    @GetMapping("/locker")
    public ResponseEntity<Response> readLocker(@RequestParam int locker_id){
        LockerDto lockerDto = lockerService.readLockerByLockerId(locker_id);
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "사물함 ID로 사물함 조회", lockerDto), HttpStatus.OK);
    }

    @PutMapping("/locker")
    public ResponseEntity<Response> updateLocker(@RequestBody LockerUpdateDto lockerUpdateDto){
        LockerDto lockerDto = lockerService.updateLockerProductCount(lockerUpdateDto);
        System.out.println("lockerUpdateDto = " + lockerUpdateDto);
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "사물함 상태 변경 완료", lockerDto), HttpStatus.OK);
    }

    @PutMapping("/registerProduct")
    public ResponseEntity<Response> registerProduct(@RequestBody LockerUpdateDto lockerUpdateDto){
        boolean flag = lockerService.updateLockerNewProduct(lockerUpdateDto);
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "물품이 등록되었습니다", null), HttpStatus.OK);
    }


    @GetMapping("/names")
    public ResponseEntity<Response> readLockerBodyList(){
        List<LockerBody> list = lockerService.readLockerBodyList();
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "사물함 본체 목록 조회", list), HttpStatus.OK);
    }


}
