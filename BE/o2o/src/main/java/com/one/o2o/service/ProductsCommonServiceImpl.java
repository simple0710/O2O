package com.one.o2o.service;


import com.one.o2o.dto.products.ProductsResponseDto;
import com.one.o2o.entity.Products;
import com.one.o2o.mapper.ProductMapper;
import com.one.o2o.repository.ProductsManageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductsCommonServiceImpl implements ProductsCommonService {
    private final ProductsManageRepository productsManageRepository;
    private final ProductMapper productMapper;

    @Override
    public List<ProductsResponseDto> readAllProduct(){
        // 추후 페이징 처리 필요
        List<Products> products = productsManageRepository.findAll();
        return productMapper.productsToProductResponseDtoList(products);
    }
}
