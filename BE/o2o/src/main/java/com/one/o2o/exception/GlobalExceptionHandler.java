package com.one.o2o.exception;

import com.one.o2o.exception.User.UserException;
import com.one.o2o.exception.products.ProductException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ProductException.class)
    public ResponseEntity<ErrorResponse> handleProductException(ProductException ex) {
        ErrorResponse errorResponse = ErrorResponse.of(
                ex.getErrorCode(),
                ex.getMessage()
        );
        return new ResponseEntity<>(errorResponse, ex.getErrorCode().getHttpStatus());
    }

    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErrorResponse> handleUserException(UserException e) {
        ErrorResponse errorResponse = ErrorResponse.of(
                e.getErrorCode(),
                e.getMessage()
        );
        return new ResponseEntity<>(errorResponse, e.getErrorCode().getHttpStatus());
    }
}
