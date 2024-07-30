package com.one.o2o.service;

import com.one.o2o.dto.rent.RentRequestDto;
import com.one.o2o.dto.rent.RentResponseDto;
import com.one.o2o.dto.rent.RentResponseSingleDto;
import com.one.o2o.entity.Rent;
import com.one.o2o.entity.User;

import java.util.List;

public interface RentService {
    // 대여 기록 조회
    public RentResponseDto readRentByUserId(int userId, int pageNumber, int pageSize);

    // 대여 실행
    public Integer createRent(RentRequestDto rentRequestDto, User user);

    // 현재 대여 중인 거 조회
    public RentResponseDto readOngoingRentByUserId(int userId, int pageNumber, int pageSize);
}
