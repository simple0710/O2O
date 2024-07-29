package com.one.o2o.service;

import com.one.o2o.dto.Response;
import com.one.o2o.dto.products.ProductsDto;
import com.one.o2o.entity.Product;
import com.one.o2o.repository.ProductsManageRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

interface ProductsManageInterface {
    Response regist(ProductsDto productsDto);
}

@Service
@RequiredArgsConstructor
public class ProductsManageService implements ProductsManageInterface{

    private final ProductsManageRepository productsManageRepository;

    @Override
    @Transactional
    public Response regist(ProductsDto productsDto) {
        Response response = new Response(200, "물품 등록 완료");
        productsManageRepository.save(new Product(productsDto));
        return response;
    }
}
