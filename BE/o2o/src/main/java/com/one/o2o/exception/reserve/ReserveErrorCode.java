package com.one.o2o.exception.reserve;

import com.one.o2o.exception.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ReserveErrorCode implements ErrorCode {
    RESERVE_ID_NOT_FOUND(HttpStatus.BAD_REQUEST, "예약 기록을 찾을 수 없습니다."),
    RESERVE_TIME_INVALID(HttpStatus.BAD_REQUEST, "예약 시간이 유효하지 않습니다.");


    private final HttpStatus httpStatus;
    private final Integer status;
    private final String message;

    ReserveErrorCode(final HttpStatus httpStatus, final String message) {
        this.httpStatus = httpStatus;
        this.status = httpStatus.value();
        this.message = message;
    }
}
