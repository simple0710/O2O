package com.one.o2o.dto.reserve;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ReserveRequestProductDto {
    private Integer lockerId;
    private Integer productId;
    private Integer productCnt;
}
