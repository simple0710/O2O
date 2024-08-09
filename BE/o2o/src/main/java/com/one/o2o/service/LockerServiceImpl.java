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
    private final ProductsManageService productsManageService;
    private final LockerBodyRepository lockerBodyRepository;
    private final LockerRepository lockerRepository;
    private final LockerMapper lockerMapper;


    @Override
    public List<LockerBody> readLockerBodyList() {
        return lockerBodyRepository.findAll();
    }
    @Override
    public List<LockerDto> readLockerByBodyId(int body_id) {
        List<Locker> list = lockerRepository.findByBody_LockerBodyId(body_id);
        list.forEach(locker -> Hibernate.initialize(locker.getProducts()));
        return lockerMapper.lockersToLockerDtoList(list);
    }
    @Override
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

    @Override
    @Transactional
    public boolean updateLockerProductCountAvailable(int lockerId, int productId, int productCnt) {
        // 사물함 수량 변경
        Optional<Locker> findLocker = lockerRepository.findByLockerId(lockerId);
        Locker locker = findLocker.orElseThrow(LockerException.LockerNotFoundException::new);
        // (1) 수량 확인
        if(locker.getTotalCnt() < locker.getProductCnt()+productCnt) throw new LockerException.InsufficientProductQuantityException();
        if(locker.getProductCnt() < productCnt) throw new LockerException.InsufficientProductQuantityException();
        // (2) 차감
        locker.updateProductCnt(locker.getProductCnt()+productCnt);
        return true;
    }

    @Override
    @Transactional
    public boolean updateLockerNewProduct(LockerUpdateDto lockerUpdateDto){
        // 사물함 확인
        Optional<Locker> findLocker = lockerRepository.findByLockerId(lockerUpdateDto.getLockerId());
        Locker locker = findLocker.orElseThrow(LockerException.LockerNotFoundException::new);
        if(!locker.isUsable()) throw new LockerException.InvalidLockerException("사용이 불가능한 사물함입니다.");
        locker.updateNewProduct(lockerUpdateDto.getProductId(), lockerUpdateDto.getProductCnt(), lockerUpdateDto.getTotalCnt());
        return true;
    }


    @Override
    @Transactional
    public boolean updateLockerNewProductWithRegister(LockerUpdateDto lockerUpdateDto, Integer userId){
        int productId = productsManageService.saveProductFromKiosk(lockerUpdateDto, userId);
        lockerUpdateDto.setProductId(productId);
        boolean flag = updateLockerNewProduct(lockerUpdateDto);
        return true;
    }
}
