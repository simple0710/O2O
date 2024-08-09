package com.one.o2o.entity;

import com.one.o2o.utils.ProductImgsId;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product_imgs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductImgs {

    @EmbeddedId
    private ProductImgsId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("productId")
    @JoinColumn(name = "product_id", updatable = false)
    private Products products;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("fileId")
    @JoinColumn(name = "file_id", updatable = false)
    private Files file;
}