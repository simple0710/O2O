package com.one.o2o.dto.productsrequest;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class ResponseDto {
    private Integer status;
    private String message;
    private DataDto data;
}
