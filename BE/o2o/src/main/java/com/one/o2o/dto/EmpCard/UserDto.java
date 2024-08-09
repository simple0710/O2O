package com.one.o2o.dto.EmpCard;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class UserDto {
    private Integer userId;
    private String userLgid;
    private String userNm;
    private String empCd;
    private String userImg;
    private Boolean isAdmin;
    private String userTel;
    private Boolean isActive;
}


