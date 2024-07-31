package com.one.o2o.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name="reserve_det")
@Getter
@Setter
@ToString
public class ReserveDet {
    @Id
    private Integer detId;
    private Integer reserveId;
    private Integer userId;
    private Integer productId;
    private Integer lockerId;
    @Column(name="status_id", columnDefinition = "TINYINT(1)")
    private Integer statusId;
    @Column(name="det_cnt", columnDefinition = "SMALLINT")
    private Integer detCnt;
    private LocalDateTime logDt;
}
