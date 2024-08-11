package com.one.o2o.exception.User;

import com.one.o2o.exception.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum UserErrorCode implements ErrorCode {
    USER_ID_MISSING(HttpStatus.BAD_REQUEST, "사용자 ID가 입력되지 않았습니다.");

    private final HttpStatus httpStatus;
    private final String message;
    private final Integer status;

    UserErrorCode(final HttpStatus httpStatus, final String message) {
        this.message = message;
        this.httpStatus = httpStatus;
        this.status = httpStatus.value();
    }
}