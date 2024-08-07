package com.one.o2o.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="reserve_det")
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReserveDet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer detId;
    private Integer reserveId;
    private Integer userId;
    @Column(name="product_id")
    private Integer newProductId;
    @Column(name="locker_id")
    private Integer newLockerId;
    @Column(name="status_id", columnDefinition = "TINYINT(1)")
    private Integer statusId;
    @Column(name="det_cnt", columnDefinition = "SMALLINT")
    private Integer detCnt;
    private LocalDateTime logDt;


    // join
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="locker_id", insertable=false, updatable=false)
    private Locker locker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_id", insertable=false, updatable=false)
    private Product product;
}
