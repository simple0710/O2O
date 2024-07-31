package com.one.o2o.repository;

import com.one.o2o.entity.ReserveDet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReserveDetRepository extends JpaRepository<ReserveDet, Integer> {
}
