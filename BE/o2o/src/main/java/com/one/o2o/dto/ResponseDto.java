package com.one.o2o.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ResponseDto {
    private Integer status;
    private String message;
    private PageInfoDto data;
}
