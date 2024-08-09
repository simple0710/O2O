package com.one.o2o.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name = "rent_log")
@Getter
@Setter
@ToString
public class RentLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id", nullable = false)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rent_id", insertable = false, updatable = false)
    private Rent rent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "locker_id", insertable = false, updatable = false)
    private Locker locker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private Products products;

    @Column(name = "status_id", columnDefinition = "TINYINT(1)", nullable = false)
    private int statusId;

    @Column(name = "log_cnt", columnDefinition = "SMALLINT", nullable = false)
    private int logCnt;

    @Column(updatable = false, nullable = false)
    private LocalDateTime logDt;

    @Column(name = "rent_id", nullable = false)
    private int newRentId;

    @Column(name = "locker_id", nullable = false)
    private int newLockerId;

    @Column(name = "product_id", nullable = false)
    private int newProductId;
}