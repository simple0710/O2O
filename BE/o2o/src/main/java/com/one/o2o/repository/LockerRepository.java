package com.one.o2o.repository;

import com.one.o2o.entity.Locker;
import com.one.o2o.entity.LockerBody;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LockerRepository  extends JpaRepository<Locker, Integer> {
    List<Locker> findByBody_LockerBodyId(int body_id);
    Optional<Locker> findByLockerId(int locker_id);
}
