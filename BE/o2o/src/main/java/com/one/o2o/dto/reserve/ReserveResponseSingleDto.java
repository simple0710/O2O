package com.one.o2o.dto.reserve;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.util.List;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ReserveResponseSingleDto {
    private int reserveId;
    private LocalDateTime reserveDt;
    private LocalDateTime dueDt;
    private List<ReserveSimpleProduct> products;
}
