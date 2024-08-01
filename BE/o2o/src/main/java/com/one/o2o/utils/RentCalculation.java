package com.one.o2o.utils;

import com.one.o2o.dto.rent.RentResponseSingleDto;
import com.one.o2o.entity.RentLog;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RentCalculation {
    public static final int _borrow = 1; // 대여
    public static final int _reserve = 2;
    public static final int _lost = 6;
    public static final int _broken = 7;
    public static final int _return = 8; // 반납

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
    public static int getProductSum(Map<Integer, RentResponseSingleDto.RentResponseProductDto.StatusDto> map){
        // 총합 계산
        return map.get(_borrow).getProductCnt();
    }

    public static int getProductRent(Map<Integer, RentResponseSingleDto.RentResponseProductDto.StatusDto> map)
    {
        // 현재 대여 중인 수 계산
        int sum = 0;
        for(RentResponseSingleDto.RentResponseProductDto.StatusDto sd : map.values()){
            sum += sd.getProductCnt() * calMap.get(sd.getStatusId());
        }
        return sum * -1;
    }


    public static Map<Integer, Integer> getProductRentFromEntity(List<RentLog> logs)
    {
        Map<Integer, Integer> map = new HashMap<>();
        for(RentLog rl : logs){
            int pid = rl.getNewProductId();
            if(!map.containsKey(pid)) map.put(pid, 0);
            map.put(pid, map.get(pid)+rl.getLogCnt() * calMap.get(rl.getStatusId()) * -1);
        }
        return map;
    }

    public static LocalDateTime getDueDateTime(LocalDateTime startDt){
        return startDt.plusDays(3);
    }

}
