package com.one.o2o.entity.products.report;

import com.one.o2o.dto.products.report.UsersReportDto;
import com.one.o2o.entity.*;
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
    @Column(nullable = false, updatable = false)
    private Integer rptId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    private Users user; // 객체

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LOCKER_ID", nullable = false)
    private Locker locker; // 객체

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRODUCT_ID", nullable = false)
    private Products products;

    @Column(columnDefinition = "SMALLINT")
    private Integer productCnt;

    @Column
    private String rptContent;

    @Column(nullable = false, updatable = false)
    private LocalDateTime rptDt = LocalDateTime.now();

    @Column
    private String rptImg;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean isProcessed = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STATUS_ID", nullable = false)
    private ProductStatus productStatus;

    public ProductsReport(UsersReportDto userReportDto) {
        // 사용자 저장
        this.user = Users.builder()
                .userId(userReportDto.getUserId())
                .build();

        // 물품 정보 저장
        this.productStatus = ProductStatus.builder()
                .statusId(userReportDto.getStatusId())
                .build();

        this.products = Products.builder()
                .productId(userReportDto.getProductId())
                .build();
        this.productCnt = userReportDto.getProductCnt();
        // 사물함 정보 저장
        this.locker = new Locker();
        this.locker.setLockerId(userReportDto.getLockerId());

        // 기타 정보 저장
        this.rptContent = userReportDto.getRptContent();
        this.rptImg = userReportDto.getRptImg();

        this.productStatus = new ProductStatus();
        this.productStatus.setStatusId(userReportDto.getStatusId());

    }
}
