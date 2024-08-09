package com.one.o2o.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="reserve")
@Getter
@Setter
@ToString
@DynamicUpdate
public class Reserve {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reserveId;
    private Integer userId;
    private LocalDateTime startDt;
    private LocalDateTime dueDt;
    private boolean isEnded;
    private LocalDateTime endDt;
    private boolean isCanceled;
    private boolean isTaken;
    private Integer rentId;
    private Integer bodyId;


    @OneToMany(mappedBy = "reserveId", fetch = FetchType.LAZY)
    @Column(insertable = false, updatable = false)
    private List<ReserveDet> reserveDetList;

    // 예약이 취소되었을 때
    public void updateReserveToCanceled(LocalDateTime endDt){
        this.isEnded = true;
        this.endDt = endDt;
        this.isCanceled = true;
    }

    // 예약이 만료되었을 때
    public void updateReserveToEnded(LocalDateTime endDt){
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
