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
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="status_id",
            columnDefinition = "TINYINT",
            nullable = false,
            updatable = false)
    private Integer statusId;

    @Column(nullable = false, updatable = false)
    private String statusNm;
}
