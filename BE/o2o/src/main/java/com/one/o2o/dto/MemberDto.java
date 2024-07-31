package com.one.o2o.dto;

import jakarta.persistence.Entity;
import lombok.Data;

import org.hibernate.annotations.ColumnDefault;

@Data
public class MemberDto {

    private String user_lgid;
    private String user_pw;
    private String  user_nm;
    private String emp_cd;
    private String user_img;

    @ColumnDefault("false")
    private boolean is_admin;
    private String user_tel;
    @ColumnDefault("true")
    private boolean is_active;


}


