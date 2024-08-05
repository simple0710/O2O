package com.one.o2o.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class MemberDto {
    private Integer userId;
    private String userLgid;
    private String userPw;
    private String  userNm;
    private String empCd;
    private String userImg;
    private Boolean isAdmin;
    private String userTel;
    private Boolean isActive;
}


