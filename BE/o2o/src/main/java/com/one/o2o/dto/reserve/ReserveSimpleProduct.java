package com.one.o2o.dto.reserve;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ReserveSimpleProduct {
    private int productId;
    private int productCnt;
    private String productName;
    private int lockerId;
    private int lockerBodyId;
    private String lockerBody;
    private String lockerLoc;
}