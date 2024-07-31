package com.one.o2o.repository;

import com.one.o2o.entity.Locker;
import com.one.o2o.entity.RentLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RentLogRepository  extends JpaRepository<RentLog, Integer> {
    List<RentLog> findByRent_Id(int rentId);
}
