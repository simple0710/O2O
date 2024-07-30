package com.one.o2o.repository;

import com.one.o2o.entity.products.manage.Rent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ProductsOverdueRepository extends JpaRepository<Rent, Integer> {
    @Query("SELECT r FROM Rent r "
//            + "JOIN FETCH r.rentLogList rl "
            + "WHERE r.dueDt < CURRENT_TIMESTAMP "
            + "AND r.isReturned = false")
    Page<Rent> findActiveRentsWithDetails(Pageable pageable);

}
