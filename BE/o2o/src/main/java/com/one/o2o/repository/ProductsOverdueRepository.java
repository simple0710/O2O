package com.one.o2o.repository;

import com.one.o2o.entity.Rent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductsOverdueRepository extends JpaRepository<Rent, Integer> {
    @Query("SELECT r FROM Rent r "
            + "WHERE r.dueDt <= NOW() "
            + "AND r.isReturned = false")
    Page<Rent> findActiveRentsWithDetails(Pageable pageable);

}
