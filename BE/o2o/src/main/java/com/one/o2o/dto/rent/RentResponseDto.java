package com.one.o2o.dto.rent;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.one.o2o.entity.Status;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class RentResponseDto {
    private List<RentResponseSingleDto> rents;
    private Map<Integer, Status> status;
    private int curPg;
    private int totalPg;
    private long totalRents;
}

