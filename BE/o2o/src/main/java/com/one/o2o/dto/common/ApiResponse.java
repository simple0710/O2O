package com.one.o2o.dto.common;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ApiResponse {
    private String message;
}