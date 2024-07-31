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
    private int locker_column;
    @Column(name="row")
    private int locker_row;
    private boolean is_usable;
    private int product_cnt;
    private int total_cnt;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="product_id")
    public Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="body_id")
    private LockerBody lockerBody;

    public void updateTotal_cnt(int cnt){
        this.total_cnt = cnt;
    }
    public void updateProduct_cnt(int cnt){
        this.product_cnt = cnt;
    }
}
