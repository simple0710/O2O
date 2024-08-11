package com.one.o2o.controller.kiosk;

import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.products.ProductsResponseDto;
import com.one.o2o.dto.products.report.UsersReportDto;
import com.one.o2o.service.ProductsCommonService;
import com.one.o2o.service.ProductsManageService;
import com.one.o2o.service.ProductsReportService;
import com.one.o2o.service.ProductsRequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/kiosk/products")
@RequiredArgsConstructor
@Slf4j
public class KioskProductsController {

    private final ProductsManageService productsManageService;
    private final ProductsRequestService productsRequestService;
    private final ProductsReportService productsReportService;
    private final ProductsCommonService productsCommonService;

    // 이상 신고
    @PostMapping("/report")
    public ResponseEntity<?> createProductsReport(@RequestBody UsersReportDto userReportDto) {
        return new ResponseEntity<>(productsReportService.saveProductReport(userReportDto) , HttpStatus.OK);
    }



    @GetMapping("/list")
    public ResponseEntity<Response> readProductList(){
        List<ProductsResponseDto> list = productsCommonService.readAllProduct();
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "물품 목록 조회", list), HttpStatus.OK);
    }
}