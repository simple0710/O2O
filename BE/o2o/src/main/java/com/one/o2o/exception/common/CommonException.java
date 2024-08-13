package com.one.o2o.exception.common;

import lombok.Getter;

@Getter
public class CommonException extends RuntimeException {

    private final CommonErrorCode errorCode;

    public CommonException(CommonErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
