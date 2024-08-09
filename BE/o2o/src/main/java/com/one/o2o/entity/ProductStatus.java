package com.one.o2o.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Data
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
