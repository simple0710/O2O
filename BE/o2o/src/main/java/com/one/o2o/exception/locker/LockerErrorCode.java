package com.one.o2o.exception.locker;

import com.one.o2o.exception.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum LockerErrorCode implements ErrorCode {
    LOCKER_ID_INVALID(HttpStatus.BAD_REQUEST, "잘못된 locker ID입니다."),
    LOCKER_ID_NEGATIVE(HttpStatus.BAD_REQUEST, "locker ID의 값은 1이상의 수입니다."),
    LOCKER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 locker ID입니다."),
    TOTAL_COUNT_UNDER_PRODUCT_COUNT(HttpStatus.BAD_REQUEST, "올바르지 않은 물품 개수 입력입니다.");

    private final HttpStatus httpStatus;
    private final String message;
    private final Integer status;

    LockerErrorCode(final HttpStatus httpStatus, final String message) {
        this.message = message;
        this.httpStatus = httpStatus;
        this.status = httpStatus.value();
    }
}
