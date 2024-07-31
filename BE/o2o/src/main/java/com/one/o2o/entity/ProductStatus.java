package com.one.o2o.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PRODUCT_STATUS")
public class ProductStatus {
    @Id
    @Column(name="status_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer statusId;
    @Column
    private String statusNm;

}
