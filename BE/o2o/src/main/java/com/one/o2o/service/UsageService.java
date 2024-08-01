package com.one.o2o.service;

import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.usage.ProductRentCountDto;
import com.one.o2o.dto.usage.ProductUsageRateDto;
import com.one.o2o.dto.usage.ProductsRetentionRateDto;
import com.one.o2o.entity.Product;
import com.one.o2o.entity.RentLog;
import com.one.o2o.repository.ProductsUsageRepository;
import com.one.o2o.repository.RentLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.*;
import java.util.stream.Collectors;

interface UsageServiceInterface {
    Response findAllRetentionRate();
    Response findAllProductRentCount();
    Response findAllProductUsageRate();
}

@Service
@RequiredArgsConstructor
@Slf4j
public class UsageService implements UsageServiceInterface {

    private final ProductsUsageRepository productsUsageRepository;
    private final RentLogRepository rentLogRepository;
    @Override
    public Response findAllRetentionRate() {
        Response response = new Response(200, "보유율 조회 완료");
        List<Object[]> results = productsUsageRepository.findProductsRetentionRate();
        List<ProductsRetentionRateDto> retentionRateList = new ArrayList<>();
        for (Object[] result : results) {
            Integer productId = ((Number) result[0]).intValue();
            String productNm = ((String) result[1]);
            Integer productCnt = ((Number) result[2]).intValue();
            Integer totalCountSum = ((Number) result[3]).intValue();
            ProductsRetentionRateDto dto = new ProductsRetentionRateDto(productId, productNm, productCnt, totalCountSum);
            retentionRateList.add(dto);
            log.info(dto.toString());
        }
        Map<String, List<ProductsRetentionRateDto>> map = new HashMap<>();
        map.put("products", retentionRateList);
        response.setData(map);
        return response;
    }

    @Override
    public Response findAllProductRentCount() {
        Response response = new Response(HttpStatus.OK.value(), "message");
        List<Object[]> allProductRentCount = productsUsageRepository.findAllProductRentCount();
        response.setData(allProductRentCount.stream()
                .map(object -> {
                    Integer productId = Integer.valueOf(object[0].toString());
                    String productNm = object[1].toString();
                    Integer rentCnt = Integer.valueOf(object[2].toString());
                    return ProductRentCountDto.builder()
                            .productId(productId)
                            .productNm(productNm)
                            .rentCnt(rentCnt)
                            .build();
                })
                .collect(Collectors.toList()));
        return response;
    }

    @Override
    public Response findAllProductUsageRate() {
        Response response = new Response(HttpStatus.OK.value(), "사용률 조회");
        List<Object[]> allProductUsageRate = productsUsageRepository.findAllProductUsageRate();
        DecimalFormat df = new DecimalFormat("#.##");
        response.setData(allProductUsageRate.stream()
                .map(object -> {
                    Integer productId = Integer.valueOf(object[0].toString());
                    String productNm = object[1].toString();
                    Double numerator = Double.parseDouble(object[2].toString());
                    Double denominator = ((Number) object[3]).doubleValue();
                    Double usageRate = numerator / denominator;
                    String formattedUsageRate = df.format(usageRate);
                    return ProductUsageRateDto.builder()
                            .productId(productId)
                            .productNm(productNm)
                            .usageRate(Double.parseDouble(formattedUsageRate))
                            .build();
                })
                .collect(Collectors.toList())
        );
        return response;
    }


}
