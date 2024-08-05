package com.one.o2o.dto;

import jakarta.persistence.Entity;
import lombok.Builder;
import lombok.Data;

import org.hibernate.annotations.ColumnDefault;

@Data
@Builder
public class MemberDto {

    private String userLgid;
    private String userPw;
    private String  userNm;
    private String empCd;
    private String userImg;

    @ColumnDefault("false")
    private Boolean isAdmin;
    private String userTel;
    @ColumnDefault("true")
    private Boolean isActive;


}


