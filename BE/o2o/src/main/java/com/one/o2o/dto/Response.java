package com.one.o2o.dto;

import com.one.o2o.dto.productsrequest.DataDto;
import com.one.o2o.dto.productsrequest.PageInfoDto;
import com.one.o2o.dto.productsrequest.ProductsRequestDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Response {
    private Integer status;
    private String message;
    private Object data;

    public Response(Integer status, String message) {
        this.status = status;
        this.message = message;
    }

    public Response(String message){
        this.message = message;
    }

    public Response(Object data){
        this.data = data;
    }
}
