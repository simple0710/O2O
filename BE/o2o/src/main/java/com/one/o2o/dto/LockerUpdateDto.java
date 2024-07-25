package com.one.o2o.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class LockerUpdateDto {
    private int locker_id;
    private int product_id;
    private String product_nm;
    private int body_id;
    private int locker_column;
    private int locker_row;
    private int product_cnt;
    private int total_cnt;
}
