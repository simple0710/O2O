package com.one.o2o.exception;

import com.one.o2o.dto.common.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(annotations = RestController.class)
@Slf4j
public class ErrorHandler {
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse> badRequestError(BadRequestException e){
        log.error("ErrorHandler.badRequestError");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.builder()
                        .message(e.getMessage())
                        .build());
    }

    @ExceptionHandler(LockerException.LockerNotFoundException.class)
    public ResponseEntity<ApiResponse> LockerNotFoundException(LockerException.LockerNotFoundException e){
        log.error("ErrorHandler.LockerNotFoundException");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.builder()
                        .message(e.getMessage())
                        .build());
    }
}