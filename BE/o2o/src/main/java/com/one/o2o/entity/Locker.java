package com.one.o2o.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;


@Entity
@Getter
@Setter
@DynamicUpdate
public class Locker {
    @Id
    @Column(name="locker_id")
    private int lockerId;

    @Column(name="body_id")
    private int newBodyId;

    @Column(name="column", columnDefinition = "TINYINT(1)")
    private int lockerColumn;

    @Column(name="row", columnDefinition = "TINYINT(1)")
    private int lockerRow;

    @Column(name="is_usable")
    private boolean isUsable;

    @Column(name="product_cnt", columnDefinition = "SMALLINT")
    private Integer productCnt;

    @Column(name="total_cnt", columnDefinition = "SMALLINT")
    private Integer totalCnt;

    @Column(name="product_id")
    private Integer newProductId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_id", insertable = false, updatable = false)
    private Products products;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="body_id", insertable = false, updatable = false)
    private LockerBody body;

    public void updateTotalCnt(int cnt){
        this.totalCnt = cnt;
    }
    public void updateProductCnt(int cnt){
        this.productCnt = cnt;
    }
    public void updateNewProduct(int productId, int productCnt, int totalCnt){
        this.newProductId = productId;
        this.productCnt = productCnt;
        this.totalCnt = totalCnt;
        this.isUsable = false;
    }
}
