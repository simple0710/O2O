package com.one.o2o.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="Rent")
@Getter
@Setter
public class Rent {
    @Id
    @Column(name="rent_id")
    private Integer id;
    private int userId;
    private Integer reserveId;
    private LocalDateTime startDt;
    private LocalDateTime dueDt;
    private LocalDateTime endDt;
    private boolean isReturned;

    @OneToMany(mappedBy = "rentId",  fetch = FetchType.LAZY)
    private List<RentLog> rentLogs;


}
