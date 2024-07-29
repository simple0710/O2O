package com.one.o2o.dto.productsreport;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
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
