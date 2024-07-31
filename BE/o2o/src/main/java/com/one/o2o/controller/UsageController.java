package com.one.o2o.controller;

import com.one.o2o.service.UsageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usage")
@RequiredArgsConstructor
public class UsageController  {
    private final UsageService usageService;

    @GetMapping("/analysis/retention-rate")
    public ResponseEntity<?> findAllRetentionRate() {
        return new ResponseEntity<>(usageService.findAllRetentionRate(), HttpStatus.OK);
    }

    @GetMapping("/analysis/rent-count")
    public ResponseEntity<?> findAllProductRentCount() {
        return new ResponseEntity<>(usageService.findAllProductRentCount(), HttpStatus.OK);
    }

    @GetMapping("/analysis/usage-rate")
    public ResponseEntity<?> findAllProductUsageRate() {
        return new ResponseEntity<>(usageService.findAllProductUsageRate(), HttpStatus.OK);
    }
}
