package com.one.o2o.service;

import com.one.o2o.dto.Response;
import com.one.o2o.dto.usage.ProductsRetentionRateDto;
import com.one.o2o.entity.Product;
import com.one.o2o.repository.ProductsUsageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

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
        List<Object[]> results = productsUsageRepository.findMyTest();
        List<ProductsRetentionRateDto> dtos = new ArrayList<>();

        for (Object[] result : results) {
            Integer productId = ((Number) result[0]).intValue();
            Integer productCnt = ((Number) result[1]).intValue();
            Integer totalCountSum = ((Number) result[2]).intValue();
            ProductsRetentionRateDto dto = new ProductsRetentionRateDto(productId, productCnt, totalCountSum);
            dtos.add(dto);
            log.info(dtos.toString());
        }

//        response.setData(allRetentionRate);
        return response;
    }
}
