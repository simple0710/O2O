package com.one.o2o.service;

import com.one.o2o.dto.PageInfoDto;
import com.one.o2o.entity.ProductsRequest;
import com.one.o2o.repository.ProductsRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductsRequestServiceImpl {

    private final ProductsRequestRepository productsRequestRepository;

    public Page<ProductsRequest> findAll(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
//        PageInfoDto page = Request
        return productsRequestRepository.findAll(pageable);
    }
}
