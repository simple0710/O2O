package com.one.o2o.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PRODUCT_STATUS")
@Builder
@Data
public class ProductStatus {
    @Id
    @Column(name = "status_id",
            columnDefinition = "TINYINT",
            nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer statusId;
    @Column(nullable = false)
    private String statusNm;
}
