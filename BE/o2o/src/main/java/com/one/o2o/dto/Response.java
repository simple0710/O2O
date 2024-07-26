package com.one.o2o.dto;

import lombok.*;

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
}
