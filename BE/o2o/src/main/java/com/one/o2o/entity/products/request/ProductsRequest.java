package com.one.o2o.entity.products.request;

import com.one.o2o.dto.products.request.RequestProcessDto;
import com.one.o2o.dto.products.request.UsersRequestDto;
import com.one.o2o.entity.User;
import com.one.o2o.entity.Users;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

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
    @Column(name = "REQ_ID", nullable = false, updatable = false)
    private Integer reqId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    private Users user;

    @Column(name = "PRODUCT_NM", nullable = false)
    private String productNm;

    @Column(name = "REQ_URL")
    private String reqUrl;

    @Column(name = "PRODUCT_CNT", columnDefinition = "SMALLINT")
    private Integer productCnt;

    @Column(name = "REQ_CONTENT")
    private String reqContent;

    @Column(name = "REQ_DT", nullable = false, updatable = false)
    private LocalDateTime reqDt = LocalDateTime.now();

    @Column(name = "IS_APPROVED", columnDefinition = "TINYINT(1)", nullable = false)
    private Boolean isApproved = false;

    @Column(name = "IS_REJECTED", columnDefinition = "TINYINT(1)", nullable = false)
    private Boolean isRejected = false;

    @Column(name = "REJECT_CMT")
    private String rejectCmt;

    public ProductsRequest(UsersRequestDto userRequestDto) {
        Users user = new Users();
        user.setUserId(userRequestDto.getUserId());
        this.user = Users.builder()
                .userId(userRequestDto.getUserId())
                .build();
        this.productNm = userRequestDto.getProductNm();
        this.reqUrl = userRequestDto.getReqUrl();
        this.productCnt = userRequestDto.getProductCnt();
        this.reqContent = userRequestDto.getReqContent();
    }
}
