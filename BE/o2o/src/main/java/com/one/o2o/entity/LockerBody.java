package com.one.o2o.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="locker_body")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class LockerBody {
    @Id
    @Column(name="body_id")
    private int lockerBodyId;
    @Column(name="body_location")
    private String lockerBodyName;
    @Column(name="column", columnDefinition = "TINYINT(1)")
    private int column;
    @Column(name="row", columnDefinition = "TINYINT(1)")
    private int row;
    @Column(name="is_active", columnDefinition = "BOOLEAN")
    private Boolean isActive;
}
