package com.one.o2o.entity;


import com.one.o2o.dto.products.ProductsDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Entity
@ToString
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;
    private String productNm;
    private String productImg;
    private String productDet;
    @Column(nullable = false, updatable = false)
    private LocalDateTime registDt;
    private int userId;

    public Product(ProductsDto productsDto) {
        this.productNm = productsDto.getProductNm();
        this.productImg = productsDto.getProductImg();
        this.productDet = productsDto.getProductDet();
        this.userId = productsDto.getUserId();
    }

    @PrePersist
    protected void onCreate() {
        if (registDt == null) {
            registDt = LocalDateTime.now();
        }
    }
}
