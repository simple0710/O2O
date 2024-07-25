package com.one.o2o.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DefaultResponseDto {
    private String status;
    private String message;
    private List<Object> data = new ArrayList<>();

    public DefaultResponseDto(String status, String message) {
        this.status = status;
        this.message = message;
    }
}
