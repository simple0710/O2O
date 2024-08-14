package com.one.o2o.exception.rent;

import com.one.o2o.exception.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum RentErrorCode implements ErrorCode {
    RENT_ERROR_CODE(HttpStatus.BAD_REQUEST, "얼");

    private final HttpStatus httpStatus;
    private final String message;
    private final Integer status;

    RentErrorCode(final HttpStatus httpStatus, final String message) {
        this.httpStatus = httpStatus;
        this.status = httpStatus.value();
        this.message = message;
    }
}
