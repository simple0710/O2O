package com.one.o2o.dto;

import com.one.o2o.entity.ProductsRequest;

import java.time.LocalDateTime;

public class ProductsRequestDto {
    private Integer reqId;
    private String userNm = "1";
    private String productNm;
    private Integer productCnt;
    private LocalDateTime reqDt;
    private String reqUrl;
    private String reqContent;
    private Boolean isApproved;
    private Boolean isRejected;
    private String rejectCmt;

    public ProductsRequestDto(ProductsRequest pr) {
        this.reqId = pr.getReqId();
//        this.userNm = pr.getUser().getUserNm();
        this.productNm = pr.getProductNm();
        this.productCnt = pr.getProductCnt();
        this.reqDt = pr.getReqDt();
        this.reqUrl = pr.getReqUrl();
        this.reqContent = pr.getReqContent();
        this.isApproved = pr.getIsApproved();
        this.isRejected = pr.getIsRejected();
        this.rejectCmt = pr.getRejectCmt();
    }
}
