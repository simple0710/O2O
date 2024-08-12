package com.one.o2o.service;

import com.one.o2o.dto.products.ProductsResponseDto;

import java.util.List;

public interface ProductsCommonService {
    // 모든 product 조회
    public List<ProductsResponseDto> readAllProduct();
}
