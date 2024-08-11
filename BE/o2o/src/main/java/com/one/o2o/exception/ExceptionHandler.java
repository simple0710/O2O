package com.one.o2o.exception;

import com.one.o2o.exception.products.ProductException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class ExceptionHandler {

    @org.springframework.web.bind.annotation.ExceptionHandler(ProductException.class)
    public ResponseEntity<ErrorResponse> handleProductException(ProductException ex) {
        ErrorResponse errorResponse = ErrorResponse.of(
                ex.getErrorCode(),
                ex.getMessage()
        );
        return new ResponseEntity<>(errorResponse, ex.getErrorCode().getHttpStatus());
    }
}
