package com.one.o2o.repository;

import com.one.o2o.entity.products.report.ProductsReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductsReportRepository extends JpaRepository<ProductsReport, Integer> {

}