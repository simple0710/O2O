package com.one.o2o.service;

import com.one.o2o.dto.Response;
import com.one.o2o.entity.productsreport.ProductsReport;
import com.one.o2o.repository.ProductsReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

interface ProductsReportServiceInterface {
    Response findAll(int pageNumber, int pageSize);
}

@Service
@RequiredArgsConstructor
public class ProductsReportService implements ProductsReportServiceInterface {
    private final ProductsReportRepository productsReportRepository;

    @Override
    public Response findAll(int pageNumber, int pageSize) {
        Response response = new Response(200, "요청 비품 목록 관리 페이지 이동 성공");
        Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
        Page<ProductsReport> requestPage = productsReportRepository.findAll(pageable);
//        response.put("rpts", );
        response.put("pages", new PageInfoDto(
                requestPage.getNumber() + 1,
                requestPage.getTotalPages(),
                requestPage.getTotalElements()));
        return response;
    }


}
