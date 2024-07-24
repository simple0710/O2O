package com.one.o2o.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="locker_body")
public class LockerBody {
    @Id
    @Column(name="body_id")
    private int locker_body_id;
    @Column(name="body_location")
    private String locker_body_name;

    private int column;
    private int row;
}
