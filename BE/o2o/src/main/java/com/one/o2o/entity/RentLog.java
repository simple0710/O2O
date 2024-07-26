package com.one.o2o.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="rent_log")
public class RentLog {
    @Id
    @Column(name="log_id")
    private int id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="rent_id")
    private int rent_id;
    private int user_id;
    private int locker_id;
    private int product_id;
    private int status_id;
    private int log_cnt;
    private Date log_dt;
}
