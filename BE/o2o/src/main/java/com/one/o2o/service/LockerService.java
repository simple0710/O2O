package com.one.o2o.service;

import com.one.o2o.dto.locker.LockerDto;
import com.one.o2o.dto.locker.LockerUpdateDto;
import com.one.o2o.entity.LockerBody;

import java.util.List;

public interface LockerService {
    // 본체 목록 조회
    public List<LockerBody> readLockerBodyList();
    // 본체 별 현황 조회
    public List<LockerDto> readLockerByBodyId(int body_id);
    // 사물함 칸 별 현황 조회
    public LockerDto readLockerByLockerId(int locker_id);
    // 사물함 상태 변경
    public LockerDto updateLockerProductCount(LockerUpdateDto lockerUpdateDto);
    // 현재 수량 변경
    public boolean updateLockerProductCountAvailable(int lockerId, int productId, int productCnt);
    // 사물함에 기존 물품 등록
    public boolean updateLockerNewProduct(LockerUpdateDto lockerUpdateDto);
    // 사물함에 신규 물품 등록 = 물품 등록 + 사물함 등록
    public boolean updateLockerNewProductWithRegister(LockerUpdateDto lockerUpdateDto, Integer userId);
}