package com.one.o2o.repository;

import com.one.o2o.entity.ProductsRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductsRequestRepository extends JpaRepository<ProductsRequest, Integer> {}
