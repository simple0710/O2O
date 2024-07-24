package com.one.o2o.entity;

import com.one.o2o.dto.MemberDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name="user")
public class MemberEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer user_id;

    @Column(name="user_lgid")
    private String user_lgid;

    @Column(name="user_pw")
    private String user_pw;

    @Column(name="user_nm")
    private String  user_nm;

    @Column(name="emp_cd")
    private String emp_cd;

    @Column(name="user_img")
    private String user_img;

    @ColumnDefault("false")
    @Column(columnDefinition = "TINYINT(1)")
    private boolean is_admin;

    @Column(name="user_tel")
    private String user_tel;

    @ColumnDefault("true")
    @Column(columnDefinition = "TINYINT(1)")
    private boolean is_active;

    // DTO를 Entity로 변환하는 메서드
    public static MemberEntity toEntity(MemberDto dto) {
        MemberEntity entity = new MemberEntity();
        entity.setUser_lgid(dto.getUser_lgid());
        entity.setUser_pw(dto.getUser_pw());
        entity.setUser_nm(dto.getUser_nm());
        entity.setEmp_cd(dto.getEmp_cd());
        entity.setUser_img(dto.getUser_img());
        entity.set_admin(dto.is_admin());
        entity.setUser_tel(dto.getUser_tel());
        entity.set_active(dto.is_active());
        return entity;
    }



}


