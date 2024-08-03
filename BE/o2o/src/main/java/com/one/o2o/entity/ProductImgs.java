package com.one.o2o.entity;

import com.one.o2o.utils.ProductImgsId;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@Table(name = "product_imgs")
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ProductImgsId.class) // 복합 키 클래스 지정
public class ProductImgs {
    @Id
    @Column
    private Integer productId;
    @Id
    @Column
    private Integer fileId;
}
