package com.one.o2o.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import org.hibernate.annotations.DynamicUpdate;

@Data
@Entity
@Getter
@DynamicUpdate
public class Locker {
    @Id
    @Column(name="locker_id")
    private int lockerId;
    @Column(name="body_id")
    private int bodyId;
    @Column(name="column")
    private int lockerColumn;
    @Column(name="row")
    private int lockerRow;
    @Column(name="is_usable")
    private boolean isUsable;
    private int productCnt;
    private int totalCnt;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="product_id")
    public Product product;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="body_id")
//    private LockerBody body;

    public void updateTotalCnt(int cnt){
        this.totalCnt = cnt;
    }
    public void updateProductCnt(int cnt){
        this.productCnt = cnt;
    }
}
