package com.one.o2o.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductImgsDto {
    private Integer productId;
    private String type;
    private String name;
}