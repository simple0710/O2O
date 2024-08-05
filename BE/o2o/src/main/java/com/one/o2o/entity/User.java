package com.one.o2o.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name="USER")
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="USER_ID")
    private Integer userId;

    @Column(name = "USER_NM")
    private String userNm;

    @Column(name="user_lgid")
    private String userLgid;
    @Column(name = "emp_cd")
    private String empCd;
    @Column(name = "user_img")
    private String userImg;
    @Column(name = "is_admin")
    private boolean isAdmin;
    @Column(name = "user_tel")
    private String userTel;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private List<Rent> rentLogList = new ArrayList<>();
}
