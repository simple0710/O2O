package com.one.o2o.entity;

import com.one.o2o.dto.products.ProductsDto;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Entity
@ToString
@Setter
@NoArgsConstructor
public class Product {
    @Id
    private int product_id;
    private String product_nm;
    private String product_img;
    private String product_det;
    private int user_id;

    public Product(ProductsDto productsDto) {
        this.product_nm = productsDto.getProductNm();
        this.product_img = productsDto.getProductImg();
        this.product_det = productsDto.getProductDet();
        this.user_id = productsDto.getUserId();
    }
}
