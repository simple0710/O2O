package com.one.o2o.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Entity
@ToString
@Setter
public class Product {
    @Id
    private int product_id;
    private String product_nm;
    private String product_img;
    private String product_det;
    private int user_id;
}
