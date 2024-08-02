package com.one.o2o.service;

import com.one.o2o.dto.common.PageInfoDto;
import com.one.o2o.dto.common.Response;
import com.one.o2o.entity.*;
import com.one.o2o.dto.products.report.ProductsReportDto;
import com.one.o2o.dto.products.report.ReportProcessDto;
import com.one.o2o.dto.products.report.UsersReportDto;
import com.one.o2o.entity.products.report.ProductsReport;
import com.one.o2o.exception.products.error.exception.ArticleNotFoundException;
import com.one.o2o.repository.ProductsReportRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

interface ProductsReportServiceInterface {
    Response findAll(int pageNumber, int pageSize);
    Response save(UsersReportDto userReportDto);
    Response updateProcess(ReportProcessDto reportProcessDto);
}

@Service
@RequiredArgsConstructor
public class ProductsReportService implements ProductsReportServiceInterface {

    private final ProductsReportRepository productsReportRepository;

    @Override
    public Response findAll(int pageNumber, int pageSize) {
        Response response = new Response(200, "이상 신고 목록 관리 페이지 이동 성공");
        Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
        Page<ProductsReport> reportsPage = productsReportRepository.findAll(pageable);
        Map<String, Object> map = new HashMap<>();
        map.put("rpts", reportsPage.stream()
                        .map(productsReport -> {
                            Product product = productsReport.getProduct();
                            Locker locker = productsReport.getLocker();
                            LockerBody lockerBody = locker.getBody();
                            User user = productsReport.getUser();
                            ProductStatus status = productsReport.getProductStatus();
                            return ProductsReportDto.builder()
                                    .rptId(productsReport.getRptId())
                                    .productId(product.getProductId())
                                    .productNm(product.getProductNm())
                                    .bodyId(lockerBody.getLockerBodyId())
                                    .lockerId(locker.getLockerId())
                                    .lockerLoc(
                                            String.format(
                                                    "%d연 %d단",
                                                    locker.getLockerColumn(),
                                                    locker.getLockerRow()
                                            )
                                    )
                                    .userNm(user.getUserNm())
                                    .productCnt(productsReport.getProductCnt())
                                    .rptContent(productsReport.getRptContent())
                                    .rptDt(productsReport.getRptDt())
                                    .rptImg(productsReport.getRptImg())
                                    .isProcessed(productsReport.getIsProcessed())
                                    .statusId(status.getStatusId())
                                    .build();
                        })
                .collect(Collectors.toList())
        );
        map.put("pages", PageInfoDto.builder()
                .curPg(reportsPage.getNumber() + 1)
                .totalPg(reportsPage.getTotalPages())
                .totalReqs(reportsPage.getTotalElements())
                .build()
        );
        response.setData(map);
        return response;
    }

    @Override
    public Response save(UsersReportDto userReportDto) {
        Response response = new Response(200, "이상 신고 등록 완료");
        productsReportRepository.save(new ProductsReport(userReportDto));
        return response;
    }

    @Override
    @Transactional
    public Response updateProcess(ReportProcessDto reportProcessDto) {
        Response response = new Response(200, "이상 처리 완료");
        ProductsReport productsReport = productsReportRepository.findById(reportProcessDto.getRptId())
                .orElseThrow(ArticleNotFoundException::new);
        productsReport.setIsProcessed(reportProcessDto.getIsProcessed());
        return response;
    }
}
