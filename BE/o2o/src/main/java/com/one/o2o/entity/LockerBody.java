package com.one.o2o.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "locker_body")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class LockerBody {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "body_id", insertable = false, updatable = false, nullable = false)
    private int lockerBodyId;

    @Column(name = "body_location", nullable = false)
    private String lockerBodyName;

    @Column(name = "column", columnDefinition = "TINYINT(1)", nullable = false)
    private int column;

    @Column(name = "row", columnDefinition = "TINYINT(1)", nullable = false)
    private int row;
}
