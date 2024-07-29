package com.one.o2o.service;

import com.one.o2o.dto.rent.RentResponseDto;
import com.one.o2o.entity.Rent;

import java.util.List;

public interface RentService {
    // 대여 기록 조회
    public RentResponseDto readRentByUserId(int userId, int pageNumber, int pageSize);
}
