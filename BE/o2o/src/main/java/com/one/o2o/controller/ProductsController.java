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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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
    public ResponseEntity<?> registProduct(
            @RequestPart("productsDto") ProductsDto productsDto,
            @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        return new ResponseEntity<>(productsManageService.saveProduct(productsDto, file), HttpStatus.OK);
    }

    /**
     * 요청 물품 리스트를 가져옵니다. 페이지네이션 기능을 제공합니다.
     *
     * @param pageNumber 현재 페이지 번호, default = 1
     * @param pageSize 한 페이지 당 보여줄 요청 수, default = 10
     * @return ResponseEntity(요청 물품 리스트, HTTP 상태 코드(200))
     */
    @GetMapping("/request")
    public ResponseEntity<?> findAllProductsRequest(
            @RequestParam(name = "pg_no", defaultValue = "1") int pageNumber,
            @RequestParam(name = "per_page", defaultValue = "10") int pageSize) {
        return new ResponseEntity<>(productsRequestService.findAllProductsRequest(pageNumber, pageSize), HttpStatus.OK);
    }

    /**
     * 사용자의 물품 요청을 등록합니다.
     *
     * @param usersRequestDto 사용자의 물품 요청 정보를 담고 있는 DTO
     * @return ResponseEntity(HTTP 상태 코드(200))
     */
    @PostMapping("/request")
    public ResponseEntity<?> registUserProductsRequest(@RequestBody UsersRequestDto usersRequestDto) {
        return new ResponseEntity<>(productsRequestService.save(usersRequestDto), HttpStatus.OK);
    }

    /**
     *
     * @param requestProcessDto 유저의 물품 요청 처리 정보를 담고 있는 DTO
     * @return ResponseEntity(HTTP 상태 코드(200))
     */
    @PutMapping("/request/process")
    public ResponseEntity<?> updateUserProductsRequest(@RequestBody RequestProcessDto requestProcessDto) {
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
