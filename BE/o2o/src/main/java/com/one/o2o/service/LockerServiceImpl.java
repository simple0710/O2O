package com.one.o2o.service;

import com.one.o2o.dto.locker.LockerDto;
import com.one.o2o.dto.locker.LockerUpdateDto;
import com.one.o2o.entity.Locker;
import com.one.o2o.entity.LockerBody;
import com.one.o2o.exception.locker.LockerException;
import com.one.o2o.mapper.LockerMapper;
import com.one.o2o.repository.LockerBodyRepository;
import com.one.o2o.repository.LockerRepository;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;



@Service
@AllArgsConstructor
public class LockerServiceImpl implements LockerService{

    private final LockerBodyRepository lockerBodyRepository;
    private final LockerRepository lockerRepository;
    private final LockerMapper lockerMapper;


    @Override
    public List<LockerBody> readLockerBodyList() {
        return lockerBodyRepository.findAll();
    }

    public List<LockerDto> readLockerByBodyId(int body_id) {
        List<Locker> list = lockerRepository.findByBody_LockerBodyId(body_id);
        list.forEach(locker -> Hibernate.initialize(locker.getProduct()));
        return lockerMapper.lockersToLockerDtoList(list);
    }

    public LockerDto readLockerByLockerId(int locker_id) {
        Locker locker=lockerRepository.findByLockerId(locker_id).orElseThrow();
        return lockerMapper.lockerToLockerDto(locker);
    }

    @Override
    @Transactional
    public LockerDto updateLockerProductCount(LockerUpdateDto lockerUpdateDto) {
        Optional<Locker> findLocker = lockerRepository.findByLockerId(lockerUpdateDto.getLockerId());
        Locker locker = findLocker.orElseThrow(LockerException.LockerNotFoundException::new);
        locker.updateTotalCnt(lockerUpdateDto.getTotalCnt());
        locker.updateProductCnt(lockerUpdateDto.getProductCnt());
        return lockerMapper.lockerToLockerDto(locker);
    }


}
