package com.one.o2o.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "reserve_det")
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReserveDet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Integer detId;

    @Column(nullable = false)
    private Integer reserveId;

    @Column(nullable = false)
    private Integer userId;

    @Column(name = "product_id", nullable = false)
    private Integer newProductId;

    @Column(name = "locker_id", nullable = false)
    private Integer newLockerId;

    @Column(name = "status_id", columnDefinition = "TINYINT(1)", nullable = false)
    private Integer statusId;

    @Column(name = "det_cnt", columnDefinition = "SMALLINT", nullable = false)
    private Integer detCnt;

    @Column(nullable = false, updatable = false)
    private LocalDateTime logDt;

    // join
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "locker_id", insertable = false, updatable = false)
    private Locker locker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private Products products;
}
