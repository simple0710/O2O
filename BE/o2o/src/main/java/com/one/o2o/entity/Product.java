package com.one.o2o.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;

import java.util.Date;

@Getter
@Entity
public class Product {
    @Id
    private int product_id;
    private String product_nm;
    private String product_img;
    private String product_det;
    private Date regist_dt;
    private int user_id;

}
