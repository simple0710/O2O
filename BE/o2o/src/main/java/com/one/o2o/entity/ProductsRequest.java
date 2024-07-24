package com.one.o2o.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name="PRODUCT_REQ")
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

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd.HH:mm")
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
}
