package com.one.o2o.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class LockerUpdateDto {
    private int lockerId;
    private int productId;
    private String productNm;
    private int bodyId;
    private int lockerColumn;
    private int lockerRow;
    private int productCnt;
    private int totalCnt;
}
