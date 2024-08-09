package com.one.o2o.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="rent_id", insertable = false, nullable = false)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private int userId;

    @Column
    private Integer reserveId;

    @Column(updatable = false, nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd.HH:mm")
    private LocalDateTime startDt;

    @Column(nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd.HH:mm")
    private LocalDateTime dueDt;

    @Column
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd.HH:mm")
    private LocalDateTime endDt;

    @Column(nullable = false)
    private boolean isReturned;

    @OneToMany(mappedBy = "rent",  fetch = FetchType.LAZY)
    @JsonBackReference
    private List<RentLog> rentLogs;

    public void updateReturned(boolean result){
        this.isReturned = result;
    }
}
