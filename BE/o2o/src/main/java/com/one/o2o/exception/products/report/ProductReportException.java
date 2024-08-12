package com.one.o2o.exception.products.report;

import com.one.o2o.exception.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ProductReportException extends RuntimeException {

    private ProductReportErrorCode errorCode;

    public ProductReportException(ProductReportErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
