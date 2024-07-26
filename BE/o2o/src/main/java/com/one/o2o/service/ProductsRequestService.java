package com.one.o2o.service;

import com.one.o2o.dto.Response;
import com.one.o2o.dto.productsrequest.RequestProcessDto;
import com.one.o2o.dto.productsrequest.UsersRequestDto;
import com.one.o2o.entity.productsrequest.ProductsRequest;

public interface ProductsRequestService {
    Response findAll(int pageNumber, int pageSize);
    Response save(UsersRequestDto urd);
    ProductsRequest findById(long id);
    Response updateProcess(RequestProcessDto requestProcessDto);
}
