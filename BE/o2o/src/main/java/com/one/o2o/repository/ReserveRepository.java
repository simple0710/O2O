package com.one.o2o.repository;

import com.one.o2o.entity.Reserve;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReserveRepository extends JpaRepository<Reserve, Integer> {
    Page<Reserve> findAllByUserIdAndIsEndedIsFalse(int userId, Pageable pageable);
    Page<Reserve> findAllByUserIdAndBodyIdAndIsEndedIsFalse(int userId, int bodyId, Pageable pageable);
    List<Reserve> findAllByIsEndedIsFalseAndDueDtIsBefore(LocalDateTime now);
}
