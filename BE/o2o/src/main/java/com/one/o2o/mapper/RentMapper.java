package com.one.o2o.mapper;

import com.one.o2o.dto.rent.RentResponseDto;
import com.one.o2o.entity.*;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

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
    @Mapping(source = "returned", target = "late")
    @Mapping(source = "rentLogs", target = "products", qualifiedByName = "logsToproducts")
    RentResponseDto.RentListResponseDto rentToRentListResponseDto(Rent rent);


    @IterableMapping(qualifiedByName = "RENT")
    List<RentResponseDto.RentListResponseDto> rentsToRentListResponseDtos(List<Rent> rent);

    @Named("logsToproducts")
    default Map<Integer, RentResponseDto.RentListResponseDto.RentProductDto> rentLogsToRentProductDtos(List<RentLog> rentLogs) {
        Map<Integer, RentResponseDto.RentListResponseDto.RentProductDto> map = new HashMap<>();
        for(RentLog rl : rentLogs){
            Product product = rl.getProduct();
            Locker locker = rl.getLocker();
            RentResponseDto.RentListResponseDto.RentProductDto rentProductDto = map.getOrDefault(product.getProductId(), new RentResponseDto.RentListResponseDto.RentProductDto());
            if(!map.containsKey(product.getProductId())){
                rentProductDto.setProductId(product.getProductId());
                rentProductDto.setProductName(product.getProductNm());
                rentProductDto.setLockerBody(locker.getBody().getLockerBodyName());
                rentProductDto.setLockerLoc(locker.getLockerRow()+"단 "+locker.getLockerColumn()+"연");
                rentProductDto.setProductCnt(rl.getLogCnt());
                map.put(product.getProductId(), rentProductDto);
            }
            int statusId = rl.getStatusId();
            if(rentProductDto.getStatus() == null) rentProductDto.setStatus(new HashMap<>());
            Map<Integer, RentResponseDto.RentListResponseDto.RentProductDto.StatusDto> statusMap = rentProductDto.getStatus();
            if(statusMap.containsKey(statusId)){
                statusMap.get(statusId).setProductCnt(statusMap.get(statusId).getProductCnt()+rl.getLogCnt());
            } else {
                statusMap.put(statusId, statusMap.getOrDefault(statusId, new RentResponseDto.RentListResponseDto.RentProductDto.StatusDto(statusId, rl.getLogCnt())));
            }
        }
        return map;
    }

}
