package com.one.o2o.exception.reserve;

import com.one.o2o.exception.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ReserveErrorCode implements ErrorCode {
    RESERVE_ERROR_CODE(HttpStatus.BAD_REQUEST, "에러");


    private final HttpStatus httpStatus;
    private final Integer status;
    private final String message;

    ReserveErrorCode(final HttpStatus httpStatus, final String message) {
        this.httpStatus = httpStatus;
        this.status = httpStatus.value();
        this.message = message;
    }
}
