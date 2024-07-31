package com.one.o2o.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.one.o2o.entity.Locker;
import com.one.o2o.entity.LockerBody;
import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@ToString
public class LockerDto {
    private int locker_id;
    private int product_id;
    private String product_nm;
    private int body_id;
    private int locker_column;
    private int locker_row;
    @JsonProperty("is_usable")
    private boolean is_usable;
    private int product_cnt;
    private int total_cnt;

}
