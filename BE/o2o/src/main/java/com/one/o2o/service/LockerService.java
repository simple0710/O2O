package com.one.o2o.service;

import com.one.o2o.dto.LockerDto;
import com.one.o2o.entity.Locker;
import com.one.o2o.entity.LockerBody;
import com.one.o2o.mapper.LockerMapper;
import com.one.o2o.repository.LockerBodyRepository;
import com.one.o2o.repository.LockerRepository;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import java.util.List;

interface LockerServiceInterface {
    // 본체 목록 조회
    public List<LockerBody> readLockerBodyList();
    // 본체 별 현황 조회
    public List<LockerDto> readLockerByBodyId(int body_id);
    // 사물함 칸 별 현황 조회
    public LockerDto readLockerByLockerId(int locker_id);
}

@Service
@AllArgsConstructor
public class LockerService implements LockerServiceInterface{
    private final LockerBodyRepository lockerBodyRepository;
    private final LockerRepository lockerRepository;
    private final LockerMapper lockerMapper;


    @Override
    public List<LockerBody> readLockerBodyList() {
        return lockerBodyRepository.findAll();
    }

    public List<LockerDto> readLockerByBodyId(int body_id) {
        List<Locker> list = lockerRepository.findByBodyId(body_id);
        list.forEach(locker -> Hibernate.initialize(locker.getProduct()));
        return lockerMapper.lockersToLockerDtoList(list);
    }

    public LockerDto readLockerByLockerId(int locker_id) {
        Locker locker=lockerRepository.findByLockerId(locker_id);
        return lockerMapper.lockerToLockerDto(locker);
    }
}
