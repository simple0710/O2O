package com.one.o2o.service;

import com.one.o2o.dto.Response;

public interface ProductsRequestService {
    Response findAll(int pageNumber, int pageSize);
}
