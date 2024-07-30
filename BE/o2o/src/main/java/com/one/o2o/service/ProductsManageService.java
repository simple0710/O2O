package com.one.o2o.service;

import com.one.o2o.dto.Response;
import com.one.o2o.dto.products.ProductsDto;
import com.one.o2o.entity.Product;
import com.one.o2o.entity.products.manage.Rent;
import com.one.o2o.repository.ProductsManageRepository;
import com.one.o2o.repository.ProductsOverdueRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

interface ProductsManageInterface {
    Response regist(ProductsDto productsDto);
    Response findAllOverdueList(int pageNumber, int pageSize);
}

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductsManageService implements ProductsManageInterface {

    private final ProductsManageRepository productsManageRepository;
    private final ProductsOverdueRepository productsOverdueRepository;
    @Transactional
    public Response regist(ProductsDto productsDto) {
        Response response = new Response(200, "물품 등록 완료");
        productsManageRepository.save(new Product(productsDto));
        return response;
    }

    @Override
    public Response findAllOverdueList(int pageNumber, int pageSize) {
        Response response = new Response(200, "연체 목록 가져오기 완료");
        Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
        Page<Rent> all = productsOverdueRepository.findActiveRentsWithDetails(pageable);
        for (Rent rent : all) {
            log.info("rent : " + rent.getRentLogList());
        }
//        log.info("all.getContent(). = " + all.getContent());
        Map<String, Object> map = new HashMap<>();
        map.put("rents", all.getContent());
//        map.put("test", all.getContent().toString());
        response.setData(map);
        return response;
    }
}
