package com.one.o2o.entity;

import com.one.o2o.mapper.LockerMapper;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name="rent_log")
@Getter
@Setter
@ToString
public class RentLog {
    @Id
    @Column(name="log_id")
    private int id;
    private int rentId;
    private int userId;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="locker_id")
    private Locker locker;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_id")
    private Product product;
    private int statusId;
    private int logCnt;
    private LocalDateTime logDt;
}
