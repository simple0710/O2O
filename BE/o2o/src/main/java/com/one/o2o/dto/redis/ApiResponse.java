package com.one.o2o.dto.redis;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ApiResponse<T> {
    private T result;         // API 호출의 결과 데이터
    private String resultCode; // 결과 코드 (예: 성공, 실패 등)
    private String resultMsg;  // 결과 메시지 (예: 성공 또는 오류에 대한 설명)
}