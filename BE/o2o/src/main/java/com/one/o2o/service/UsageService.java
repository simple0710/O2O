package com.one.o2o.service;

import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.usage.ProductsRetentionRateDto;
import com.one.o2o.entity.Product;
import com.one.o2o.repository.ProductsUsageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

interface UsageServiceInterface {
    Response findAllRetentionRate();
}

@Service
@RequiredArgsConstructor
@Slf4j
public class UsageService implements UsageServiceInterface {

    private final ProductsUsageRepository productsUsageRepository;
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
}
