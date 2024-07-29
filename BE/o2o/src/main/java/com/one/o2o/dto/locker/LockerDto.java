package com.one.o2o.dto.locker;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

@Getter
@Setter
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class LockerDto {
    private int lockerId;
    private int productId;
    private String productNm;
    private int bodyId;
    private int lockerColumn;
    private int lockerRow;
    @JsonProperty("is_usable")
    private boolean isUsable;
    private int productCnt;
    private int totalCnt;

}
