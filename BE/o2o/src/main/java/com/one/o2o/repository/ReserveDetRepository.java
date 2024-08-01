package com.one.o2o.repository;

import com.one.o2o.entity.ReserveDet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReserveDetRepository extends JpaRepository<ReserveDet, Integer> {
    List<ReserveDet> findAllByReserveId(int reserveId);
}
