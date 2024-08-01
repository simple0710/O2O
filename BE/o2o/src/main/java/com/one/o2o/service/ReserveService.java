package com.one.o2o.service;

import com.one.o2o.dto.reserve.ReserveRequestDto;
import com.one.o2o.dto.reserve.ReserveResponseDto;

public interface ReserveService {
    // 진행 중인 예약 내역 조회
    public ReserveResponseDto readReserveByUser(int userId, int pageNumber, int pageSize);
    // 해당 사물함에서 진행 중인 예약 내역 조회
    public ReserveResponseDto readReserveByUserAndLockerBody(int userId, int bodyId, int pageNumber, int pageSize);
    // 예약 등록
    public Integer createReserve(int userId, ReserveRequestDto reserveRequestDto);
}
