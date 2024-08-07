package com.one.o2o.controller;

import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.locker.LockerDto;
import com.one.o2o.dto.ProductSavedEvent;
import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.ProductSavedEvent;
import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.products.ProductsDto;
import com.one.o2o.dto.products.ProductsResponseDto;
import com.one.o2o.dto.products.report.ReportProcessDto;
import com.one.o2o.dto.products.report.UsersReportDto;
import com.one.o2o.dto.products.request.RequestProcessDto;
import com.one.o2o.dto.products.request.UsersRequestDto;
import com.one.o2o.service.ProductsCommonService;
import com.one.o2o.event.ProductSavedEventListener;
import com.one.o2o.service.FileService;
import com.one.o2o.event.ProductSavedEventListener;
import com.one.o2o.service.FileService;
import com.one.o2o.service.ProductsManageService;
import com.one.o2o.service.ProductsReportService;
import com.one.o2o.service.ProductsRequestService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@Slf4j
public class ProductsController {

    private final FileService fileService;
    private final ProductsManageService productsManageService;
    private final ProductsRequestService productsRequestService;
    private final ProductsReportService productsReportService;
    private final ProductSavedEventListener productSavedEventListener;
    private final ProductsCommonService productsCommonService;

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
        Integer productId = (Integer) productsManageService.saveProduct(productsDto).getData();
        if (files != null && !files.isEmpty()) {
            fileService.saveFile(files, productsDto.getUserId(), productId);
        }
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "물품 등록 완료"), HttpStatus.OK);
    }

    @GetMapping("/{filename:.+}")
    public ResponseEntity<?> getProductImage(@PathVariable String filename) throws IOException {
        log.info("finename : " + filename);
//        return new ResponseEntity<>(1, HttpStatus.OK);
        return new ResponseEntity<>(productsManageService.getProductImage(filename), HttpStatus.OK);
    }

    // 이미지 가져오기
    @GetMapping("/images/{fileName:.+}")
    public ResponseEntity<byte[]> getImage(@PathVariable String fileName) throws IOException {
        // 이미지 파일 경로
        Path imagePath = Paths.get("src/main/resources/uploads/products/" + fileName);

        // 파일 읽기
        byte[] imageBytes = Files.readAllBytes(imagePath);

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.IMAGE_PNG);

        // 이미지 반환
        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
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
    public ResponseEntity<?> updateRequest(@RequestBody List<RequestProcessDto> requestProcessDto) {
        log.info("requestProcessDto = " + requestProcessDto);
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
    private ResponseEntity<?> processProductsReport(@RequestBody List<ReportProcessDto> reportProcessDto) {
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

    @GetMapping("/list")
    public ResponseEntity<Response> readProductList(){
        List<ProductsResponseDto> list = productsCommonService.readAllProduct();
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "물품 목록 조회", list), HttpStatus.OK);
    }

}
