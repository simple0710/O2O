package com.one.o2o.dto.reserve;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.one.o2o.dto.common.PageInfoDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ReserveResponseDto {
    private List<ReserveResponseSingleDto> reserves;
    private PageInfoDto pages;
}
