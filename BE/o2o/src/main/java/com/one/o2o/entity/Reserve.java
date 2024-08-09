package com.one.o2o.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "reserve")
@Getter
@Setter
@ToString
@DynamicUpdate
public class Reserve {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer reserveId;

    @Column(nullable = false)
    private Integer userId;

    @Column(nullable = false)
    private Integer bodyId;

    @Column(updatable = false, nullable = false)
    private LocalDateTime startDt;

    @Column(nullable = false)
    private LocalDateTime dueDt;

    @Column(nullable = false)
    private boolean isEnded;

    @Column
    private LocalDateTime endDt;

    @Column(nullable = false)
    private boolean isCanceled;

    @Column(nullable = false)
    private boolean isTaken;

    @Column
    private Integer rentId;

    @OneToMany(mappedBy = "reserveId", fetch = FetchType.LAZY)
    @Column(insertable = false, updatable = false)
    private List<ReserveDet> reserveDetList;

    // 예약이 취소되었을 때
    public void updateReserveToCanceled(LocalDateTime endDt) {
        this.isEnded = true;
        this.endDt = endDt;
        this.isCanceled = true;
    }

    // 예약이 종료되었을 때(만료)
    public void updateReserveToEnded(LocalDateTime endDt) {
        this.isEnded = true;
        this.endDt = endDt;
    }

    // 예약이 종료되었을 때
    public void updateReserveToFinished(LocalDateTime endDt, Integer rentId){
        this.isEnded = true;
        this.endDt = endDt;
        this.isTaken = true;
        this.rentId = rentId;
    }
}