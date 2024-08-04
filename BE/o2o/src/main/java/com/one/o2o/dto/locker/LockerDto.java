package com.one.o2o.dto.locker;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.one.o2o.dto.FileDto;
import com.one.o2o.dto.ProductImgsDto;
import com.one.o2o.entity.File;
import com.one.o2o.entity.Product;
import com.one.o2o.entity.ProductImgs;
import lombok.*;

import java.util.ArrayList;
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
