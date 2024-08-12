package com.one.o2o.repository;

import com.one.o2o.entity.Files;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<Files, Integer> {
}
