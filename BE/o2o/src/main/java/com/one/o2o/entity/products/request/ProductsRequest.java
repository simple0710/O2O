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
            // 현재 날짜와 시간을 가져옵니다.
            LocalDateTime now = LocalDateTime.now();

            // 초를 포함한 포맷을 정의합니다.
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd.HH:mm:ss");

            // LocalDateTime 객체를 문자열로 포맷합니다.
            String formattedDate = now.format(formatter);

            // 문자열을 LocalDateTime으로 변환합니다.
            LocalDateTime parsedDate = LocalDateTime.parse(formattedDate, formatter);
            // 변환된 LocalDateTime을 필드에 설정합니다.
            this.reqDt = parsedDate;
        }
        if (this.isApproved == null) {
            this.isApproved = false;
        }
        if (this.isRejected == null) {
            this.isRejected = false;

        }
    }
}
