package com.one.o2o.entity.productsreport;

import com.one.o2o.entity.Locker;
import com.one.o2o.entity.LockerBody;
import com.one.o2o.entity.Product;
import com.one.o2o.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product_rpt")
@ToString
public class ProductsReport {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer rptId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user; // 객체

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LOCKER_ID")
    private LockerBody lockerBody; // 객체

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;

    @Column
    private Integer productCnt;

    @Column
    private String rptContent;

    @Column
    private LocalDateTime rptDt;

    @Column
    private String rptImg;

    @Column
    private Boolean isProcessed;

    @Column
    private Integer statusId;
}
