package com.one.o2o.entity;

import com.one.o2o.dto.MemberDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
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
    private boolean isActive;

    // DTO를 Entity로 변환하는 메서드
    public static MemberEntity toEntity(MemberDto dto) {
        MemberEntity entity = new MemberEntity();
        entity.setUserLgid(dto.getUserLgid());
        entity.setUserPw(dto.getUserPw());
        entity.setUserNm(dto.getUserNm());
        entity.setEmpCd(dto.getEmpCd());
        entity.setUserImg(dto.getUserImg());
        entity.setIsAdmin(dto.getIsAdmin());
        entity.setUserTel(dto.getUserTel());
        entity.setActive(dto.getIsActive());
        return entity;
    }
}


