package com.one.o2o.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name="rent_log")
@Getter
@Setter
@ToString
public class RentLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="log_id")
    private int id;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="rent_id", insertable = false, updatable = false)
    private Rent rent;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="locker_id", insertable = false, updatable = false)
    private Locker locker;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_id", insertable = false, updatable = false)
    private Products products;
    @Column(name="status_id", columnDefinition = "TINYINT(1)")
    private int statusId;
    @Column(name="log_cnt", columnDefinition = "SMALLINT")
    private int logCnt;
    private LocalDateTime logDt;

    @Column(name="rent_id")
    private int newRentId;
    @Column(name="locker_id")
    private int newLockerId;
    @Column(name="product_id")
    private int newProductId;
}
