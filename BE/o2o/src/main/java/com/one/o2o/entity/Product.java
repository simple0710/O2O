package com.one.o2o.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Entity
@ToString
@Setter
@NoArgsConstructor
public class Product {
    @Id
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
