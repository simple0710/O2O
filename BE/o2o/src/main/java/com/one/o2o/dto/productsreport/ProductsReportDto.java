package com.one.o2o.dto.productsreport;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.one.o2o.entity.productsreport.ProductsReport;
import jakarta.persistence.Column;
import jakarta.persistence.PrePersist;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Data
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ProductsReportDto {
    private Integer rptId;
    private Integer productId;
    private String productNm;
    private Integer bodyId;
    private Integer lockerId;
//        private String lockerBody;
    private String lockerLoc;
    private String userNm;
    private Integer productCnt;
    private String rptContent;
    private LocalDateTime rptDt;
    private String rptImg;
    private Boolean isProcessed;
    private Integer statusId;
    private Integer col;
    private Integer row;

    @PrePersist
    public void perPersist() {
        if (this.isProcessed == null) {
            this.isProcessed = false;
        }
    }
}




