package com.one.o2o.repository;

import com.one.o2o.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

//@NoRepositoryBean
public interface ProductsUsageRepository extends JpaRepository<Products, Integer> {
    // 보유율 조회
    @Query(value = "SELECT p.product_id, p.product_nm, SUM(l.product_cnt), SUM(l.total_cnt) " +
            "FROM locker AS l " +
            "INNER JOIN product AS p ON l.product_id = p.product_id " +
            "GROUP BY p.product_id, p.product_nm",
            nativeQuery = true)
    List<Object[]> findProductsRetentionRate();

    // 대여 횟수 -> SUM(logCnt) and statusId = 1
    @Query("SELECT rl.products.id, rl.products.productNm, SUM(rl.logCnt) FROM RentLog rl WHERE rl.statusId = 1 GROUP BY rl.products.id")
    List<Object[]> findAllProductRentCount();
    
    // 물품별 사용률 조회 -> 대여 횟수 / 물품 수
    @Query("SELECT rl.products.id, rl.products.productNm, SUM(rl.logCnt), SUM(rl.locker.totalCnt) FROM RentLog rl WHERE rl.statusId = 1 GROUP BY rl.products.id")
    List<Object[]> findAllProductUsageRate();
}