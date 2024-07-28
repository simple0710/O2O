package com.one.o2o.dto.productsreport;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class UsersReportDto {
    private Integer userId;
    private Integer lockerId;
    private Integer statusId;
    private Integer productId;
    private Integer productCnt;
    private String rptContent;
    private String rptImg;
}
