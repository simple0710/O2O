package com.one.o2o.dto.reserve;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

import java.util.List;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ReserveRequestDto {
    private Integer lockerBodyId;
    private String reserveTime;
    private List<ReserveRequestProductDto> reserves;
}
