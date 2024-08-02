package com.one.o2o.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignInDto {
    private String user_lgid;
    private String user_pw;
}