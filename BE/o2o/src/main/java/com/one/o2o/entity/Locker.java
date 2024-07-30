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

    @Column(name="column")
    private int lockerColumn;
    @Column(name="row")
    private int lockerRow;
//    @Column(name = "is_usable")
    @Column
    private boolean isUsable;
    private int productCnt;
    private int totalCnt;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="product_id")
    public Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="body_id")
    private LockerBody lockerBody;

    public void updateTotal_cnt(int cnt){
        this.totalCnt = cnt;
    }
    public void updateProduct_cnt(int cnt){
        this.productCnt = cnt;
    }
}
