package com.one.o2o.utils;

public enum SuccessCode {
    SELECT("200", "데이터 조회 성공"),
    INSERT("201", "데이터 삽입 성공"),
    UPDATE("202", "데이터 업데이트 성공"),
    DELETE("204", "데이터 삭제 성공");

    private final String status;
    private final String message;

    SuccessCode(String status, String message) {
        this.status = status;
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
