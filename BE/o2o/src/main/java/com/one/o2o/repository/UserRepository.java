package com.one.o2o.repository;

import com.one.o2o.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Integer> {
    Optional<Users> findAllByUserId(int userId);
    List<Users> findAllByUserNm(String userNm); //AndActiveIsTrue
}
