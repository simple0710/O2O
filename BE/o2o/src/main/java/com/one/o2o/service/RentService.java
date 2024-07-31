package com.one.o2o.service;

import com.one.o2o.dto.rent.RentRequestDto;
import com.one.o2o.dto.rent.RentResponseDto;
import com.one.o2o.dto.rent.ReturnRequestDto;

public interface RentService {
    // 대여 기록 조회
    public RentResponseDto readRentByUserId(int userId, int pageNumber, int pageSize);

    // 대여 실행
    public Integer createRent(int userId, RentRequestDto rentRequestDto);

    // 현재 진행 중인 대여 조회
    public RentResponseDto readOngoingRentByUserId(int userId, int pageNumber, int pageSize);

    // 반납 실행
    public boolean createReturn(int userId, ReturnRequestDto returnRequestDto);
}
