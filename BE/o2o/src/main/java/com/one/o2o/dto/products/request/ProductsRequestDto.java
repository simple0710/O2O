package com.one.o2o.dto.products.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.one.o2o.entity.products.request.ProductsRequest;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class ProductsRequestDto {
    @JsonProperty("req_id")
    private Integer reqId;

    @JsonProperty("user_nm")
    private String userNm;

    @JsonProperty("product_nm")
    private String productNm;

    @JsonProperty("product_cnt")
    private Integer productCnt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd.HH:mm")
    @JsonProperty("req_dt")
    private LocalDateTime reqDt;

    @JsonProperty("req_url")
    private String reqUrl;

    @JsonProperty("req_content")
    private String reqContent;

    @JsonProperty("is_approved")
    private Boolean isApproved;

    @JsonProperty("is_rejected")
    private Boolean isRejected;

    @JsonProperty("reject_cmt")
    private String rejectCmt;

    public ProductsRequestDto(ProductsRequest pr) {
        this.reqId = pr.getReqId();
        this.userNm = pr.getUser().getUserNm();
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
