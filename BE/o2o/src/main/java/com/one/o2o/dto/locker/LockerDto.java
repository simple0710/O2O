package com.one.o2o.dto.locker;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.one.o2o.dto.ProductImgsDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class LockerDto {
    private int lockerId;
    private int productId;
    private String productNm;
    private int bodyId;
    private String productImg;
    private List<ProductImgsDto> productImgs;
    private int lockerColumn;
    private int lockerRow;
    private boolean isUsable;
    private int productCnt;
    private int totalCnt;
}
