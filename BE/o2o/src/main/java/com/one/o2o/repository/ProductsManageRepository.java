package com.one.o2o.repository;

import com.one.o2o.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsManageRepository extends JpaRepository<Product, Integer> {
}
