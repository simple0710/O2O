package com.one.o2o.dto.products.manage;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ProductsOverdueDto {
    private Integer productId;
    private String productNm;
//    private String productImg;
    private String lockerBody;
    private String lockerLoc;
    private Integer productCnt;
    private Map<Integer, OverdueStatusDto> status;
}
