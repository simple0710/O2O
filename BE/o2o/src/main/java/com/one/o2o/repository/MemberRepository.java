package com.one.o2o.repository;

import com.one.o2o.dto.MemberDto;
import com.one.o2o.entity.MemberEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.JpaQueryMethodFactory;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
//
//public interface MemberRepository extends JpaRepository<Entity, type> {

public interface MemberRepository extends JpaRepository<MemberEntity, Integer>{

    @Query(value = "SELECT CASE WHEN COUNT(*) > 0 THEN true ELSE false END FROM user WHERE user_lgid = :getUserLgid" ,nativeQuery = true)
    //@Query(value = "SELECT CASE WHEN COUNT(*) > 0 THEN true ELSE false END FROM user WHERE user_lgid = :getUserLgid", nativeQuery = true)
    long existsByUserLgid(@Param("getUserLgid") String getUserLgid);


    //user_lgid
    //findB
    Optional<MemberEntity> findByUserLgid(String user_lgid);

}
