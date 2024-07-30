package com.one.o2o.dto.products.manage;


import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import java.time.LocalDateTime;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ProductsOverdueDto {
    private Integer userId;
    private String userNm;
    private Integer rentId;
    private LocalDateTime rentDt;
    private LocalDateTime dutDt;
//    private LocalDateTime

}
