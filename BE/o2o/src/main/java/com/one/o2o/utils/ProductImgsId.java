package com.one.o2o.utils;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class ProductImgsId implements Serializable {

    private Integer productId;
    private Integer fileId;

    public ProductImgsId(Integer productId, Integer fileId) {
        this.productId = productId;
        this.fileId = fileId;
    }
}