package com.one.o2o.dto.User;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class MemberLoginDto {
    private Integer userId;
    private String userLgid;
    private String  userNm;
    private String userImg;
    private Boolean isAdmin;
}
