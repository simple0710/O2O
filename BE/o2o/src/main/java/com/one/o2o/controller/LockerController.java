package com.one.o2o.controller;

import com.one.o2o.dto.locker.LockerDto;
import com.one.o2o.dto.locker.LockerUpdateDto;
import com.one.o2o.dto.common.Response;
import com.one.o2o.entity.LockerBody;
import com.one.o2o.service.LockerService;
import lombok.AllArgsConstructor;
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
        return new ResponseEntity<>(new Response(list), HttpStatus.OK);
    }


    @GetMapping("/locker")
    public ResponseEntity<Response> readLocker(@RequestParam int locker_id){
        LockerDto lockerDto = lockerService.readLockerByLockerId(locker_id);
        return new ResponseEntity<>(new Response(lockerDto), HttpStatus.OK);
    }

    @PutMapping("/locker")
    public ResponseEntity<Response> updateLocker(@RequestBody LockerUpdateDto lockerUpdateDto){
        LockerDto lockerDto = lockerService.updateLockerProductCount(lockerUpdateDto);
        return new ResponseEntity<>(new Response(lockerDto), HttpStatus.OK);
    }


    @GetMapping("/names")
    public ResponseEntity<Response> readLockerBodyList(){
        List<LockerBody> list = lockerService.readLockerBodyList();
        return new ResponseEntity<>(new Response(list), HttpStatus.OK);
    }


}
