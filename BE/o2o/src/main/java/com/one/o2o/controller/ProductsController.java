package com.one.o2o.controller;

import com.one.o2o.dto.products.ProductsDto;
import com.one.o2o.dto.products.report.ReportProcessDto;
import com.one.o2o.dto.products.report.UsersReportDto;
import com.one.o2o.dto.products.request.RequestProcessDto;
import com.one.o2o.dto.products.request.UsersRequestDto;
import com.one.o2o.service.ProductsManageService;
import com.one.o2o.service.ProductsReportService;
import com.one.o2o.service.ProductsRequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@Slf4j
public class ProductsController {

    private final ProductsManageService productsManageService;
    private final ProductsRequestService productsRequestService;
    private final ProductsReportService productsReportService;

    // 물품 등록
    @PostMapping("/regist")
    public ResponseEntity<?> registProducts(@RequestBody ProductsDto productsDto) {
        return new ResponseEntity<>(productsManageService.regist(productsDto), HttpStatus.OK);
    }

    // 요청 물품 목록 가져오기
    @GetMapping("/request")
    public ResponseEntity<?> findAll(
            @RequestParam(name = "pg_no", defaultValue = "1") int pageNumber,
            @RequestParam(name = "per_page", defaultValue = "10") int pageSize) {
        return new ResponseEntity<>(productsRequestService.findAll(pageNumber, pageSize), HttpStatus.OK);
    }

    // 물품 요청
    @PostMapping("/request")
    public ResponseEntity<?> userRequest(@RequestBody UsersRequestDto usersRequestDto) {
        return new ResponseEntity<>(productsRequestService.save(usersRequestDto), HttpStatus.OK);
    }

    @PutMapping("/request/process")
    public ResponseEntity<?> updateRequest(@RequestBody RequestProcessDto requestProcessDto) {
        return new ResponseEntity<>(productsRequestService.updateProcess(requestProcessDto), HttpStatus.OK);
    }

    // 이상 신고 목록 조회
    @GetMapping("/report")
    public ResponseEntity<?> findAllReport(
            @RequestParam(name = "pg_no", defaultValue = "1") int pageNumber,
            @RequestParam(name = "per_page", defaultValue = "10") int pageSize) {
        return new ResponseEntity<>(productsReportService.findAll(pageNumber, pageSize), HttpStatus.OK);
    }

    // 이상 신고
    @PostMapping("/report")
    public ResponseEntity<?> createProductsReport(@RequestBody UsersReportDto userReportDto) {
        return new ResponseEntity<>(productsReportService.save(userReportDto) , HttpStatus.OK);
    }

    @PutMapping("/report/process")
    private ResponseEntity<?> processProductsReport(@RequestBody ReportProcessDto reportProcessDto) {
        return new ResponseEntity<>(productsReportService.updateProcess(reportProcessDto), HttpStatus.OK);
    }

    @GetMapping("/overdue")
    private ResponseEntity<?> findAllOverdue(
            @RequestParam(name = "pg_no", defaultValue = "1") int pageNumber,
            @RequestParam(name = "per_page", defaultValue = "10") int pageSize) {
        log.info("pageNumber : " + pageNumber);
        log.info("pageSize = " + pageSize);
        return new ResponseEntity<>(productsManageService.findAllOverdueList(pageNumber, pageSize), HttpStatus.OK);
    }
}
