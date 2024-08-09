package com.one.o2o.entity;

import com.one.o2o.dto.products.ProductsDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
    private int userId;

//    @JoinColumn(name = "product_id")
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
