package com.one.o2o.dto.common;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    public Response(Integer status, Object data){
        this.status = status;
        this.data = data;
    }
}
