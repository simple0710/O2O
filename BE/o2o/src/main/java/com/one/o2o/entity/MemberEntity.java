package com.one.o2o.entity;

import com.one.o2o.dto.User.MemberDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="user")
public class MemberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(name="user_lgid")
    private String userLgid;

    @Column(name="user_pw")
    private String userPw;

    @Column(name="user_nm")
    private String  userNm;

    @Column(name="emp_cd")
    private String empCd;

    @Column(name="user_img")
    private String userImg;

    @ColumnDefault("false")
    @Column(columnDefinition = "TINYINT(1)")
    private Boolean isAdmin;

    @Column(name="user_tel")
    private String userTel;

    @ColumnDefault("true")
    @Column(columnDefinition = "TINYINT(1)")
    private Boolean isActive;

    // DTO를 Entity로 변환하는 메서드
    public static MemberEntity toEntity(MemberDto dto) {
        return MemberEntity.builder()
                .userId(dto.getUserId()) // DTO에 userId가 있다면
                .userLgid(dto.getUserLgid())
                .userPw(dto.getUserPw())
                .userNm(dto.getUserNm())
                .empCd(dto.getEmpCd())
                .userImg(dto.getUserImg())
                .isAdmin(dto.getIsAdmin())
                .userTel(dto.getUserTel())
                .isActive(dto.getIsActive())
                .build();
    }
}


