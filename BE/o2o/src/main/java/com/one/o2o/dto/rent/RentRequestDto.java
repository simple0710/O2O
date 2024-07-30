package com.one.o2o.dto.rent;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class RentRequestDto {
    private Integer reserveID;
    private Integer lockerBodyId;
    private List<RentRequestProduct> products;

    @Data
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class RentRequestProduct {
        private int productId;
        private int productCnt;
        private int lockerId;
        private int statusId;
    }
}
