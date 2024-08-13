package com.one.o2o.exception.common;

import com.one.o2o.exception.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum CommonErrorCode implements ErrorCode {
    URL_FORMAT_INVALID(HttpStatus.BAD_REQUEST, "잘못된 URL 형식입니다.");

    private final HttpStatus httpStatus;
    private final String message;
    private final Integer status;

    CommonErrorCode(final HttpStatus httpStatus, final String message) {
        this.message = message;
        this.httpStatus = httpStatus;
        this.status = httpStatus.value();
    }
}
