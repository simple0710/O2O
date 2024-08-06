package com.one.o2o.dto.products;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ProductsResponseDto {
    private int productId;
    private String productNm;
    private String productImg;
    private String productDet;
}
