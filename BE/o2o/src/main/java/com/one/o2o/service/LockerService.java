package com.one.o2o.service;

import com.one.o2o.dto.LockerBody;
import com.one.o2o.repository.LockerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

interface LockerServiceInterface {
    // 목록 조회
    public List<LockerBody> readLockerBodyList();
}

@Service
public class LockerService implements LockerServiceInterface{
    private final LockerRepository lockerRepository;
    public LockerService(LockerRepository lockerRepository) {
        this.lockerRepository = lockerRepository;
    }

    @Override
    public List<LockerBody> readLockerBodyList() {
        return lockerRepository.findAll();
    }
}
