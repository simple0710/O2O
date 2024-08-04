package com.one.o2o.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.one.o2o.dto.products.ProductsDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

//    @JoinColumn(name = "product_id")
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<ProductImgs> productImgs;
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
