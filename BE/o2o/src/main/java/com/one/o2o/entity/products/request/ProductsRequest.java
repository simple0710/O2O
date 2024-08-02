package com.one.o2o.entity.products.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.one.o2o.dto.products.request.UsersRequestDto;
import com.one.o2o.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name="PRODUCT_REQ")
@ToString
public class ProductsRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REQ_ID")
    private Integer reqId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(name = "PRODUCT_NM")
    private String productNm;

    @Column(name = "REQ_URL")
    private String reqUrl;

    @Column(name = "PRODUCT_CNT")
    private Integer productCnt;

    @Column(name = "REQ_CONTENT")
    private String reqContent;

    @Column(name = "REQ_DT")
    private LocalDateTime reqDt;

    @ColumnDefault("false")
    @Column(name = "IS_APPROVED", columnDefinition = "TINYINT(1)")
    private Boolean isApproved;

    @ColumnDefault("false")
    @Column(name = "IS_REJECTED", columnDefinition = "TINYINT(1)")
    private Boolean isRejected;

    @Column(name = "REJECT_CMT")
    private String rejectCmt;

    public ProductsRequest(UsersRequestDto userRequestDto) {
        User user = new User();
        user.setUserId(userRequestDto.getUserId());
        this.user = user;
        this.productNm = userRequestDto.getProductNm();
        this.reqUrl = userRequestDto.getReqUrl();
        this.productCnt = userRequestDto.getProductCnt();
        this.reqContent = userRequestDto.getReqContent();
    }

    @PrePersist
    public void perPersist() {
        if (this.reqDt == null) {
            this.reqDt = LocalDateTime.now();
        }
        if (this.isApproved == null) {
            this.isApproved = false;
        }
        if (this.isRejected == null) {
            this.isRejected = false;

        }
    }
}
