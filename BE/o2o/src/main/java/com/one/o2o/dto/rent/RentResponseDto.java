package com.one.o2o.dto.rent;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.one.o2o.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class RentResponseDto {
    private List<RentListResponseDto> rents;
    private Map<Integer, Status> status;
    private int curPg;
    private int totalPg;
    private long totalRents;

    @Data
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class RentListResponseDto {
        private int rentId;
        private LocalDateTime rentDt;
        private LocalDateTime dueDt;
        private boolean isLate;
        private Map<Integer, RentProductDto> products;


        @Data
        @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
        public static class RentProductDto {
            private int productId;
            private String productName;
            private String lockerBody;
            private String lockerLoc;
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
}

