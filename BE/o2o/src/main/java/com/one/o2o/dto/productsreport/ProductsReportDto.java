package com.one.o2o.dto.productsreport;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.one.o2o.entity.productsreport.ProductsReport;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ProductsReportDto {
    private Integer rptId;
    private Integer productId;
    private Integer lockerId;
    private String lockerBody;
    private String lockerLoc;
    private String userNm;
    private Integer productCnt;
    private String rptContent;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd.HH:mm")
    private LocalDateTime rptDt;
    private String rptImg;
    private Boolean isProcessed;
    private Integer statusId;

    public ProductsReportDto(ProductsReport productsReport) {
        this.rptId = productsReport.getRptId();
        this.productId = productsReport.getProduct().getProduct_id();
        this.lockerId = productsReport.getLocker().getLockerId();
//        this.lockerBody = productsReport.getLocker().getLocker;
//        this.lockerLoc = productsReport.getLocker().getLockerBody().getLocker_body_name();
        this.userNm = productsReport.getUser().getUserNm();
        this.productCnt = productsReport.getProductCnt();
        this.rptContent = productsReport.getRptContent();
        this.rptDt = productsReport.getRptDt();
        this.rptImg = productsReport.getRptImg();
        this.isProcessed = productsReport.getIsProcessed();
        this.statusId = productsReport.getProductStatus().getStatusId();
    }
}




