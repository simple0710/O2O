package com.one.o2o.dto.products.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RequestProcessDto {
    @JsonProperty("req_id")
    private Integer reqId;

    @JsonProperty("req_status")
    private String reqStatus;

    @JsonProperty("reject_cmt")
    private String rejectCmt;
}
