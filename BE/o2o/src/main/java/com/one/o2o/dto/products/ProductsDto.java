package com.one.o2o.dto.products;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ProductsDto {
    private String productNm;
    private String productImg;
    private String productDet;
    private Integer userId;

    // 생성자는 @Builder 어노테이션으로 자동 생성되므로 명시적으로 작성할 필요는 없습니다.
}
