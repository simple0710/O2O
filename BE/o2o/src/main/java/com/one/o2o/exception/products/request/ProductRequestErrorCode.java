package com.one.o2o.exception.products.request;

import com.one.o2o.exception.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static com.one.o2o.constants.ProductRequestConstants.MAX_PRODUCT_REQUEST_CONTENT_LENGTH;
import static com.one.o2o.constants.ProductRequestConstants.MAX_PRODUCT_REQUEST_REJECT_COMMENT_LENGTH;

@Getter
public enum ProductRequestErrorCode implements ErrorCode {
    PRODUCT_REQUEST_ID_NOT_FOUND(HttpStatus.NOT_FOUND, "물품 요청 내용을 찾을 수 없습니다."),
    PRODUCT_REQUEST_CONTENT_LENGTH(HttpStatus.BAD_REQUEST, String.format("물품 요청 내용이 허용된 최대 길이(%d자)를 초과했습니다.", MAX_PRODUCT_REQUEST_CONTENT_LENGTH)),
    PRODUCT_REQUEST_REJECT_CONTENT_LENGTH(HttpStatus.BAD_REQUEST, String.format("물품 요청 내용이 허용된 최대 길이(%d자)를 초과했습니다.", MAX_PRODUCT_REQUEST_REJECT_COMMENT_LENGTH));

    private final HttpStatus httpStatus;
    private final String message;
    private final Integer status;

    ProductRequestErrorCode(final HttpStatus httpStatus, final String message) {
        this.message = message;
        this.httpStatus = httpStatus;
        this.status = httpStatus.value();
    }
}