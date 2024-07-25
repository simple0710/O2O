package com.one.o2o.controller;

import com.one.o2o.dto.productsrequest.UsersRequestDto;
import com.one.o2o.service.ProductsRequestServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductsController {

    private final ProductsRequestServiceImpl productsRequestServiceImpl;

    // 요청 물품 목록 가져오기
    @GetMapping("/request")
    public ResponseEntity<?> findAll(
            @RequestParam(name = "pg_no", defaultValue = "1") int pageNumber,
            @RequestParam(name = "per_page", defaultValue = "10") int pageSize) {
        return new ResponseEntity<>(productsRequestServiceImpl.findAll(pageNumber, pageSize), HttpStatus.OK);
    }

    // 물품 요청
    @PostMapping("/request")
    public ResponseEntity<?> userRequest(@RequestBody UsersRequestDto usersRequestDto) {
        System.out.println(usersRequestDto);
        productsRequestServiceImpl.save(usersRequestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
