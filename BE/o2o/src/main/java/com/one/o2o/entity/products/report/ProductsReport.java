package com.one.o2o.entity.products.report;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.one.o2o.dto.products.report.UsersReportDto;
import com.one.o2o.entity.*;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

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
    private Locker locker; // 객체

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

    @ColumnDefault("false")
    @Column
    private Boolean isProcessed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STATUS_ID")
    private ProductStatus productStatus;

    public ProductsReport(UsersReportDto userReportDto) {
        // 사용자 저장
        this.user = new User();
        this.user.setUserId(userReportDto.getUserId());

        // 물품 정보 저장
        this.productStatus = new ProductStatus();
        this.productStatus.setStatusId(userReportDto.getStatusId());

        this.product = new Product();
        this.product.setProductId(userReportDto.getProductId());
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

    @PrePersist
    public void perPersist() {
        if (this.rptDt == null) {
            this.rptDt = LocalDateTime.now();
        }
        if (this.isProcessed == null) {
            this.isProcessed = false;
        }
    }
}
