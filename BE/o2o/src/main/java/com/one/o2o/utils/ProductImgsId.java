package com.one.o2o.utils;

import java.io.Serializable;
import java.util.Objects;

public class ProductImgsId implements Serializable {
    private Integer fileId;
    private Integer productId;

    // 기본 생성자
    public ProductImgsId() {}

    public ProductImgsId(Integer fileId, Integer productId) {
        this.fileId = fileId;
        this.productId = productId;
    }

    // equals와 hashCode 메서드 구현
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductImgsId that = (ProductImgsId) o;
        return Objects.equals(fileId, that.fileId) && Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(fileId, productId);
    }
}
