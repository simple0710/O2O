package com.one.o2o.dto.usage;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ProductsRetentionRateDto {
    private Integer productId;
    private String productNm;
//    private Integer productCnt;
//    private Integer totalCnt;
    private Integer retentionRate;
    public ProductsRetentionRateDto(Integer productId, String productNm, Integer productCnt, Integer totalCountSum) {
        this.productId = productId;
        this.productNm = productNm;
//        this.productCnt = productCnt;
//        this.totalCnt = totalCountSum;
        this.retentionRate = totalCountSum == 0 ? 100 : productCnt * 100 / totalCountSum;
    }
}
