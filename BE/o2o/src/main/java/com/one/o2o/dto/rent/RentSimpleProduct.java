package com.one.o2o.dto.rent;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class RentSimpleProduct {
    private int productId;
    private int productCnt;
    private int lockerId;
    private int statusId;
}