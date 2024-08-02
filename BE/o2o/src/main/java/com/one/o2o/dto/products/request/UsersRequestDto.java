package com.one.o2o.dto.products.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UsersRequestDto {
    @JsonProperty("user_id")
    private Integer userId;

    @JsonProperty("product_nm")
    private String productNm;

    @JsonProperty("req_url")
    private String reqUrl;

    @JsonProperty("product_cnt")
    private Integer productCnt;

    @JsonProperty("req_content")
    private String reqContent;
}
