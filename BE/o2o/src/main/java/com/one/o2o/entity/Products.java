package com.one.o2o.entity;

import com.one.o2o.dto.products.ProductsDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product")
public class Products {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int productId;

    @Column(nullable = false)
    private String productNm;

    private String productImg;

    private String productDet;

    @Column(nullable = false, updatable = false)
    private LocalDateTime registDt;

    @Column(nullable = false)
    private Integer userId;

    @OneToMany(mappedBy = "products", fetch = FetchType.LAZY)
    private List<ProductImgs> productImgs;

    public Products(ProductsDto productsDto) {
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
