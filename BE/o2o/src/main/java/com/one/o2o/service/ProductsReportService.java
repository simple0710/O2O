package com.one.o2o.service;

import com.one.o2o.dto.PageInfoDto;
import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.productsreport.ProductsReportDto;
import com.one.o2o.dto.productsreport.ReportProcessDto;
import com.one.o2o.dto.productsreport.UsersReportDto;
import com.one.o2o.entity.productsreport.ProductsReport;
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
        Page<ProductsReport> requestPage = productsReportRepository.findAll(pageable);
        Map<String, Object> map = new HashMap<>();
        map.put("rpts", requestPage.stream()
                .map(ProductsReportDto::new)
                .collect(Collectors.toList()));
        map.put("pages", new PageInfoDto(
                requestPage.getNumber() + 1,
                requestPage.getTotalPages(),
                requestPage.getTotalElements()));
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
