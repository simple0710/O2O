package com.one.o2o.exception.products;

import com.one.o2o.constants.ProductConstants;
import com.one.o2o.exception.ErrorCode;
import org.springframework.http.HttpStatus;

import static com.one.o2o.constants.ProductConstants.*;

public enum ProductErrorCode implements ErrorCode {
    PRODUCT_NAME_MISSING(HttpStatus.BAD_REQUEST, "제품 이름이 누락되었습니다."),
    PRODUCT_NAME_LENGTH_OVER(HttpStatus.BAD_REQUEST, String.format("제품 이름의 길이가 기준을 초과합니다. (한글 %d자, 영어 %d자)", MAX_KOREAN_CHAR_LENGTH, MAX_ENGLISH_CHAR_LENGTH)),
    PRODUCT_NOT_FOUND(HttpStatus.NOT_FOUND, "제품을 찾을 수 없습니다."),
    PRODUCT_CNT_NEGATIVE(HttpStatus.BAD_REQUEST, "제품 개수는 음수가 될 수 없습니다."),
    PRODUCT_STATUS_INVALID(HttpStatus.BAD_REQUEST, String.format("유효하지 않은 제품 상태 값입니다. %d부터 %d까지의 값만 허용됩니다.", MIN_PRODUCT_STATUS_VALUE, MAX_PRODUCT_STATUS_VALUE));

    private final HttpStatus httpStatus;
    private final String message;
    private final Integer status;

    ProductErrorCode(final HttpStatus httpStatus, final String message) {
        this.message = message;
        this.httpStatus = httpStatus;
        this.status = httpStatus.value();
    }

    @Override
    public HttpStatus getHttpStatus() {
        return this.httpStatus;
    }

    @Override
    public Integer getStatus() {
        return this.httpStatus.value();
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
