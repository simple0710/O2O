package com.one.o2o.dto.products.manage;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class OverdueDto {
    private Integer userId;
    private String userNm;
    private Integer rentId;
    private LocalDateTime rentDt;
    private LocalDateTime dueDt;
    private Boolean isLate;
    private List<ProductsOverdueDto> products;
}
