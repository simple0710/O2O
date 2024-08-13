package com.one.o2o.exception.products.request;

import lombok.Getter;

@Getter
public class ProductRequestException extends RuntimeException{

    private ProductRequestErrorCode errorCode;

    public ProductRequestException(ProductRequestErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
