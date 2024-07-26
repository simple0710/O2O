package com.one.o2o.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Date;

@Entity
@Table(name="Rent")
public class Rent {
    @Id
    @Column(name="rent_id")
    private int id;
    private int user_id;
    private int reserve_id;
    private Date start_dt;
    private Date due_dt;
    private Date end_dt;
    private boolean is_returned;
}
