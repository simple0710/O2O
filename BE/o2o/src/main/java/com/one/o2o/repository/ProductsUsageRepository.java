package com.one.o2o.repository;

import com.one.o2o.dto.usage.ProductsRetentionRateDto;
import com.one.o2o.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

//@NoRepositoryBean
public interface ProductsUsageRepository extends JpaRepository<Product, Integer> {
//    @Query("SELECT p.productId, COALESCE(SUM(l.totalCnt), 0) FROM Product p LEFT JOIN p.lockers l GROUP BY p.productId")
//    List<Object[]> findAllRetentionRate();

//    @Query("SELECT p FROM Product p")
//    List<Product> findMyTest();
    @Query(value = "SELECT p.product_id, p.product_nm, SUM(l.product_cnt), SUM(l.total_cnt) " +
            "FROM locker AS l " +
            "INNER JOIN product AS p ON l.product_id = p.product_id " +
            "GROUP BY p.product_id, p.product_nm",
            nativeQuery = true)
    List<Object[]> findProductsRetentionRate();

//    @Query(value = "SELECT p FROM Product p",
//            nativeQuery = true)
//    List<Product> findMyTest();

//    @Query("SELECT p FROM product p")
//    List<ProductsRetentionRateDto> findAllRetentionRate();

}