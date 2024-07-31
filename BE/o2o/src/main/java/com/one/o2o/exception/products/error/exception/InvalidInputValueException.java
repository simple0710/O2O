package com.one.o2o.exception.products.error.exception;

import com.one.o2o.exception.products.error.ErrorCode;

public class InvalidInputValueException extends BusinessBaseException {
    public InvalidInputValueException(ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }

    public InvalidInputValueException() {
        super(ErrorCode.INVALID_INPUT_VALUE);
    }
}
