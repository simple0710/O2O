package com.one.o2o.mapper;

import com.one.o2o.dto.rent.RentResponseSingleDto;
import com.one.o2o.dto.reserve.ReserveResponseDto;
import com.one.o2o.dto.reserve.ReserveResponseSingleDto;
import com.one.o2o.dto.reserve.ReserveSimpleProduct;
import com.one.o2o.entity.Reserve;
import com.one.o2o.entity.ReserveDet;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReserveMapper {
    ReserveMapper INSTANCE = Mappers.getMapper(ReserveMapper.class);

    @Named("RESERVE")
    @Mapping(source="startDt", target="reserveDt")
    @Mapping(source="reserveDetList", target="products", qualifiedByName = "detsToReserveSimpleProducts")
    ReserveResponseSingleDto reserveToReserveResponseDto(Reserve reserve);

    @IterableMapping(qualifiedByName = "RESERVE")
    List<ReserveResponseSingleDto> reservesToReserveResponseDtos(List<Reserve> reserve);

    @Named("RESERVE_DET")
    @Mapping(source = "detCnt", target="productCnt")
    @Mapping(source="locker.newBodyId", target="lockerBodyId")
    @Mapping(target = "lockerLoc", expression = "java(reserveDet.getLocker().getLockerColumn() + \"단 \" + reserveDet.getLocker().getLockerRow() + \"연\")")
    @Mapping(source="locker.body.lockerBodyName", target="lockerBody")
    @Mapping(source="product.productNm", target="productName")
    @Mapping(source="newLockerId", target="lockerId")
    @Mapping(source="newProductId", target="productId")
    ReserveSimpleProduct detToReserveSimpleProduct(ReserveDet reserveDet);

    @Named("detsToReserveSimpleProducts")
    @IterableMapping(qualifiedByName = "RESERVE_DET")
    List<ReserveSimpleProduct> detsToReserveSimpleProducts(List<ReserveDet> reserveDet);




}
