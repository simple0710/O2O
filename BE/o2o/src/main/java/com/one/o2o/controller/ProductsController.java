package com.one.o2o.controller;

import com.one.o2o.config.JwtTokenProvider;
import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.products.ProductsDto;
import com.one.o2o.dto.products.ProductsResponseDto;
import com.one.o2o.dto.products.report.ReportProcessDto;
import com.one.o2o.dto.products.report.UsersReportDto;
import com.one.o2o.dto.products.request.RequestProcessDto;
import com.one.o2o.dto.products.request.UsersRequestDto;
import com.one.o2o.service.ProductsCommonService;
import com.one.o2o.service.ProductsManageService;
import com.one.o2o.service.ProductsReportService;
import com.one.o2o.service.ProductsRequestService;
import com.one.o2o.validator.UserValidator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@Slf4j
public class ProductsController {

    private final ProductsManageService productsManageService;
    private final ProductsRequestService productsRequestService;
    private final ProductsReportService productsReportService;
    private final ProductsCommonService productsCommonService;

    private final UserValidator userValidator;

    private final JwtTokenProvider jwtTokenProvider;

    /**
     *
     * @param productsDto 물품의 정보를 담은 Dto
     * @param files 파일 이미지 업로드
     * @return ResponseEntity 200, 등록 완료 메세지
     * @throws IOException
     */
    @PostMapping("/regist")
    @Transactional
    public ResponseEntity<?> registProduct(
            @RequestPart("products") ProductsDto productsDto,
            @RequestParam(value = "files", required = false) List<MultipartFile> files) throws IOException {
        log.info("files : " + files);
        // 상품 등록
        productsManageService.saveProduct(files, productsDto);
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "물품 등록 완료"), HttpStatus.OK);
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
    public ResponseEntity<?> updateRequest(@RequestHeader("Authorization") String authorization, @RequestBody List<RequestProcessDto> requestProcessDto) {
        log.info("requestProcessDto = " + requestProcessDto);
        userValidator.validateUserIsAdmin(authorization);
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
        return new ResponseEntity<>(productsReportService.saveProductReport(userReportDto) , HttpStatus.OK);
    }

    @PutMapping("/report/process")
    public ResponseEntity<?> processProductsReport(@RequestHeader("Authorization") String authorization, @RequestBody List<ReportProcessDto> reportProcessDto) {
        // 유저 권한 확인
        log.info("Authorization = {}", authorization);
        userValidator.validateUserIsAdmin(authorization);
        return new ResponseEntity<>(productsReportService.updateProcess(reportProcessDto), HttpStatus.OK);
    }

    @GetMapping("/overdue")
    public ResponseEntity<?> findAllOverdue(
            @RequestParam(name = "pg_no", defaultValue = "1") int pageNumber,
            @RequestParam(name = "per_page", defaultValue = "10") int pageSize) {
        log.info("pageNumber : " + pageNumber);
        log.info("pageSize = " + pageSize);
        return new ResponseEntity<>(productsManageService.findAllOverdueList(pageNumber, pageSize), HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<Response> readProductList(){
        List<ProductsResponseDto> list = productsCommonService.readAllProduct();
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "물품 목록 조회", list), HttpStatus.OK);
    }
}