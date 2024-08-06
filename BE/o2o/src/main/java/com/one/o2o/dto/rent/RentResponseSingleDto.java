package com.one.o2o.dto.rent;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class RentResponseSingleDto {
    private int rentId;
    private LocalDateTime rentDt;
    private LocalDateTime dueDt;
    private LocalDateTime updateDt;
    @JsonProperty("is_ended")
    private boolean isEnded;
    private List<RentResponseProductDto> products;


    @Data
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class RentResponseProductDto {
        private int productId;
        private String productName;
        private String lockerBody;
        private String lockerLoc;
        private Integer lockerId;
        private Integer lockerBodyId;
        private int productCnt;
        private Map<Integer, StatusDto> status;

        @Data
        @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
        @AllArgsConstructor
        public static class StatusDto {
            private Integer statusId;
            private int productCnt;
        }
    }
}

