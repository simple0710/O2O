package com.one.o2o.dto.products.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.one.o2o.entity.products.request.ProductsRequest;
import lombok.*;

import java.time.LocalDateTime;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ProductsRequestDto {
    private Integer reqId;
    private String userNm;
    private String productNm;
    private Integer productCnt;
    private LocalDateTime reqDt;
    private String reqUrl;
    private String reqContent;
    private Boolean isApproved;
    private Boolean isRejected;
    private String rejectCmt;
}
