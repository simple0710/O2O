package com.one.o2o.repository;

import com.one.o2o.entity.LockerBody;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LockerBodyRepository extends JpaRepository<LockerBody, Integer> {
    LockerBody findById(int body_id);
    @Override
    List<LockerBody> findAll();
    List<LockerBody> findAllByIsActiveIsTrue();
}
