package com.one.o2o.controller;

import com.one.o2o.dto.LockerBody;
import com.one.o2o.service.LockerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/lockers")
public class LockerController {
    private final LockerService lockerService;
    public LockerController(LockerService lockerService) {
        this.lockerService = lockerService;
    }

    @GetMapping("/names")
    public ResponseEntity<List<LockerBody>> readLockerBodyList(){
        List<LockerBody> list = lockerService.readLockerBodyList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


}
