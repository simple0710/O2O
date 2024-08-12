package com.one.o2o.exception.products.report;

import com.one.o2o.exception.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ProductReportErrorCode implements ErrorCode {
    PRODUCT_REPORT_ERROR_CODE(HttpStatus.BAD_REQUEST, "에러 메시지");

    private final HttpStatus httpStatus;
    private final String message;
    private final Integer status;

    ProductReportErrorCode(final HttpStatus httpStatus, final String message) {
        this.message = message;
        this.httpStatus = httpStatus;
        this.status = httpStatus.value();
    }
}
