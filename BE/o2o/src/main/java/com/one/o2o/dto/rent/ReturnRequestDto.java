package com.one.o2o.dto.rent;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

import java.util.List;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ReturnRequestDto {
    private Integer rentId;
    private List<RentSimpleProduct> products;
}
