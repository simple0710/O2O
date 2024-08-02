package com.one.o2o.repository;

import com.one.o2o.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findAllByUserId(int userId);
}
