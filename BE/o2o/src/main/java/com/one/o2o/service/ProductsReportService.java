package com.one.o2o.service;

import com.one.o2o.dto.common.PageInfoDto;
import com.one.o2o.dto.common.Response;
import com.one.o2o.entity.*;
import com.one.o2o.dto.products.report.ProductsReportDto;
import com.one.o2o.dto.products.report.ReportProcessDto;
import com.one.o2o.dto.products.report.UsersReportDto;
import com.one.o2o.entity.products.report.ProductsReport;
import com.one.o2o.exception.products.error.exception.ArticleNotFoundException;
import com.one.o2o.exception.rent.RentException;
import com.one.o2o.repository.ProductsReportRepository;
import com.one.o2o.repository.RentLogRepository;
import com.one.o2o.repository.RentRepository;
import com.one.o2o.utils.RentCalculation;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

interface ProductsReportServiceInterface {
    Response findAll(int pageNumber, int pageSize);
    Response save(UsersReportDto userReportDto);
    Response updateProcess(List<ReportProcessDto> reportProcessDto);
}

@Service
@RequiredArgsConstructor
public class ProductsReportService implements ProductsReportServiceInterface {
    private final RentRepository rentRepository;
    private final RentLogRepository rentLogRepository;
    private final ProductsReportRepository productsReportRepository;

    private final LockerService lockerService;

    @Override
    public Response findAll(int pageNumber, int pageSize) {
        Response response = new Response(200, "이상 신고 목록 관리 페이지 이동 성공");
        Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
        Page<ProductsReport> reportsPage = productsReportRepository.findAll(pageable);
        Map<String, Object> map = new HashMap<>();
        map.put("rpts", reportsPage.stream()
                        .map(productsReport -> {
                            Products products = productsReport.getProducts();
                            Locker locker = productsReport.getLocker();
                            LockerBody lockerBody = locker.getBody();
                            Users user = productsReport.getUser();
                            ProductStatus status = productsReport.getProductStatus();
                            return ProductsReportDto.builder()
                                    .rptId(productsReport.getRptId())
                                    .productId(products.getProductId())
                                    .productNm(products.getProductNm())
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
    @Transactional
    public Response save(UsersReportDto userReportDto) {
        Response response = new Response(200, "이상 신고 등록 완료");
        // 1. 유효성 확인
        // 우선 유효성 체크 모두 무효화
        // 1) 반납 유효성
        Rent rent = rentRepository.findById(userReportDto.getRentId())
                .orElseThrow(RentException.RentNotFoundException::new);
        if(rent.isReturned()) throw new RentException.InvalidReturnException("이미 완료된 반납입니다.");
        Map<Integer, Integer> map = RentCalculation.getProductRentFromEntity(rent.getRentLogs());
        // 2. 파손/분실 처리 실행
        // 1) 파손/분실 로그 저장
        Integer lockerId = userReportDto.getLockerId();
        Integer productId = userReportDto.getProductId();
        RentLog rentLog = new RentLog();
        rentLog.setNewRentId(rent.getId());
        rentLog.setStatusId(userReportDto.getStatusId());
        rentLog.setLogCnt(userReportDto.getProductCnt());
        rentLog.setLogDt(LocalDateTime.now());
        rentLog.setNewLockerId(lockerId);
        rentLog.setNewProductId(userReportDto.getProductId());
        rentLogRepository.save(rentLog);
        // 2) 물품 수량 확인
        map.put(productId, map.get(productId) - userReportDto.getProductCnt());
        // 3. 대여 변경
        // 1) 모든 반납(신고)이 완료되었으면, 완료로 설정한다.
        if(map.values().stream().reduce(0, Integer::sum) == 0){
            rent.updateReturned(true);
            rent.setEndDt(LocalDateTime.now());
        }

        // 파손/분실 신고 저장
        productsReportRepository.save(new ProductsReport(userReportDto));
        return response;
    }

    @Override
    @Transactional
    public Response updateProcess(List<ReportProcessDto> reportProcessDtoList) {
        Response response = new Response(200, "이상 처리 완료");
        for (ReportProcessDto report : reportProcessDtoList) {
            ProductsReport productsReport = productsReportRepository.findById(report.getRptId())
                    .orElseThrow(ArticleNotFoundException::new);
            productsReport.setIsProcessed(report.getIsProcessed());
        }
        return response;
    }
}
