package com.one.o2o.exception.products.report;

import lombok.Getter;

@Getter
public class ProductReportException extends RuntimeException {

    private ProductReportErrorCode errorCode;

    public ProductReportException(ProductReportErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
