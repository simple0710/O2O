package com.one.o2o.utils;

import com.one.o2o.dto.rent.RentResponseDto;
import com.one.o2o.entity.Status;

import java.util.Map;

public class RentCalculation {
    private static int _borrow = 1; // 대여
    private static int _return = 8;
    private static int _lost = 6;
    private static int _broken = 7;
    // 사물함 개수 변동 저장(1: 사물함에 추가, -1: 사물함 제거)
    private static Map<Integer, Integer> calMap = Map.of(
            1, -1,
            2, -1,
            3, -1,
            4, 1,
            5, 1,
            6, 1,
            7, 1,
            8, 1
    );
    // 대여, 반납 별 개수 계산

    public static int getBorrowCode(){
        return _borrow;
    }

    public static int getProductSum(Map<Integer, RentResponseDto.RentListResponseDto.RentProductDto.StatusDto> map){
        // 총합 계산
        return map.get(_borrow).getProductCnt();
    }

    public static int getProductRent(Map<Integer, RentResponseDto.RentListResponseDto.RentProductDto.StatusDto> map)
    {
        // 현재 대여 중인 수 계산
        int sum = 0;
        for(RentResponseDto.RentListResponseDto.RentProductDto.StatusDto sd : map.values()){
            sum += sd.getProductCnt() * calMap.get(sd.getStatusId());
        }
        return sum * -1;
    }
}
