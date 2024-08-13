package com.one.o2o.exception;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ErrorResponse<T extends ErrorCode> {
    private final HttpStatus httpStatus;
    private final Integer status;
    private final String message;

    // 제네릭 ErrorCode를 기반으로 ErrorResponse 객체 생성
    public static <T extends ErrorCode> ErrorResponse<T> of(T errorCode) {
        return new ErrorResponse<>(errorCode.getHttpStatus(), errorCode.getStatus(), errorCode.getMessage());
    }

    // 커스텀 메시지를 포함한 ErrorResponse 객체 생성
    public static <T extends ErrorCode> ErrorResponse<T> of(T errorCode, String customMessage) {
        return new ErrorResponse<>(errorCode.getHttpStatus(), errorCode.getStatus(), customMessage);
    }
}
