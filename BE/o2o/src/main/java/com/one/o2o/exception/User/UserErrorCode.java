package com.one.o2o.exception.User;

import com.one.o2o.exception.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum UserErrorCode implements ErrorCode {
    USER_ID_MISSING(HttpStatus.BAD_REQUEST, "유효하지 않은 사용자 ID의 입력 입니다.");

    private final HttpStatus httpStatus;
    private final String message;
    private final Integer status;

    UserErrorCode(final HttpStatus httpStatus, final String message) {
        this.message = message;
        this.httpStatus = httpStatus;
        this.status = httpStatus.value();
    }
}