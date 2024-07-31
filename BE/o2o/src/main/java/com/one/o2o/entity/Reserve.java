package com.one.o2o.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name="reserve")
@Getter
@Setter
@ToString
public class Reserve {
    @Id
    private Integer reserveId;
    private Integer userId;
    private LocalDateTime startDt;
    private LocalDateTime dueDt;
    private boolean isEnded;
    private LocalDateTime endDt;
    private boolean isCanceled;
    private boolean isTaken;
    private Integer rentId;
}
