package com.one.o2o.dto.EmpCard;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class UserDto {
    private Integer userId;
    private String userLgid;
    private String userNm;
    private String empCd;
    private String userImg;

    @ColumnDefault("false")
    private Boolean isAdmin;
    private String userTel;
    @ColumnDefault("true")
    private Boolean isActive;


}


