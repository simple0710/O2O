package com.one.o2o.exception.products.report;

import com.one.o2o.exception.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static com.one.o2o.constants.ProductReportConstants.MAX_PRODUCT_REPORT_CONTENT_LENGTH;

@Getter
public enum ProductReportErrorCode implements ErrorCode {
    PRODUCT_REPORT_ID_NOT_FOUND(HttpStatus.NOT_FOUND, "이상 신고 내용을 찾을 수 없습니다."),
    PRODUCT_REPORT_CONTENT_LENGTH(HttpStatus.BAD_REQUEST, String.format("이상 신고 내용이 허용된 최대 길이(%d자)를 초과했습니다.", MAX_PRODUCT_REPORT_CONTENT_LENGTH)),
    INVALID_PRODUCT_STATUS_ID(HttpStatus.BAD_REQUEST, "잘못된 상태 입력입니다.");

    private final HttpStatus httpStatus;
    private final String message;
    private final Integer status;

    ProductReportErrorCode(final HttpStatus httpStatus, final String message) {
        this.message = message;
        this.httpStatus = httpStatus;
        this.status = httpStatus.value();
    }
}
