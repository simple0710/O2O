package com.one.o2o.mapper;

import com.one.o2o.dto.rent.RentResponseDto;
import com.one.o2o.dto.rent.RentResponseSingleDto;
import com.one.o2o.entity.*;
import com.one.o2o.utils.RentCalculation;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper(componentModel = "spring")
public interface RentMapper {
    RentMapper INSTANCE = Mappers.getMapper(RentMapper.class);

    @Named("RENT")
    @Mapping(source = "id", target = "rentId")
    @Mapping(source = "startDt", target = "rentDt")
    @Mapping(source = "dueDt", target = "dueDt")
    @Mapping(source = "returned", target = "ended")
    @Mapping(source = "rentLogs", target = "products", qualifiedByName = "logsToproducts")
    @Mapping(target="updateDt", ignore = true)
    RentResponseSingleDto rentToRentListResponseDto(Rent rent);

    @IterableMapping(qualifiedByName = "RENT")
    List<RentResponseSingleDto> rentsToRentListResponseDtos(List<Rent> rent);

    @Named("logsToproducts")
    default Map<Integer, RentResponseSingleDto.RentResponseProductDto> rentLogsToRentProductDtos(List<RentLog> rentLogs) {
        Map<Integer, RentResponseSingleDto.RentResponseProductDto> map = new HashMap<>();
        if(rentLogs == null) return map;
        for(RentLog rl : rentLogs){
            Product product = rl.getProduct();
            Locker locker = rl.getLocker();
            RentResponseSingleDto.RentResponseProductDto rentResponseProductDto = map.getOrDefault(product.getProductId(), new RentResponseSingleDto.RentResponseProductDto());
            int statusId = rl.getStatusId();
            if(!map.containsKey(product.getProductId())){ // 새로 물품 정보 등록
                rentResponseProductDto.setProductId(product.getProductId());
                rentResponseProductDto.setProductName(product.getProductNm());
                rentResponseProductDto.setLockerBody(locker.getBody().getLockerBodyName());
                rentResponseProductDto.setLockerLoc(locker.getLockerRow()+"단 "+locker.getLockerColumn()+"연");
                rentResponseProductDto.setProductCnt(rl.getLogCnt());
                map.put(product.getProductId(), rentResponseProductDto);
            }
            if(rentResponseProductDto.getStatus() == null) rentResponseProductDto.setStatus(new HashMap<>());
            // 상태별로 데이터 삽입
            Map<Integer, RentResponseSingleDto.RentResponseProductDto.StatusDto> statusMap = rentResponseProductDto.getStatus();
            if(statusMap.containsKey(statusId)){
                statusMap.get(statusId).setProductCnt(statusMap.get(statusId).getProductCnt()+rl.getLogCnt());
            } else {
                statusMap.put(statusId, statusMap.getOrDefault(statusId, new RentResponseSingleDto.RentResponseProductDto.StatusDto(statusId, rl.getLogCnt())));
            }

        }
        for(RentResponseSingleDto.RentResponseProductDto rpd : map.values()){
            rpd.setProductCnt(RentCalculation.getProductSum(rpd.getStatus()));
            rpd.getStatus().get(RentCalculation._borrow).setProductCnt(RentCalculation.getProductRent(rpd.getStatus()));
        }

        return map;
    }

}
