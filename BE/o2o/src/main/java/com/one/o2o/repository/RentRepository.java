package com.one.o2o.repository;

import com.one.o2o.entity.Rent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentRepository  extends JpaRepository<Rent, Integer> {
    Page<Rent> findAllByUserIdOrderByStartDtDesc(int userId, Pageable pageable);
    Page<Rent> findAllByUserIdAndIsReturnedIsFalseOrderByStartDtDesc(int userId, Pageable pageable);

}
