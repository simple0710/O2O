package com.one.o2o.mapper;

import com.one.o2o.dto.ProductImgsDto;
import com.one.o2o.dto.locker.LockerDto;
import com.one.o2o.entity.Locker;
import com.one.o2o.entity.ProductImgs;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LockerMapper {
    LockerMapper INSTANCE = Mappers.getMapper(LockerMapper.class);

    @Named("productImgsToDto")
    @Mapping(source = "id.productId", target = "productId")
    @Mapping(source = "file.type", target = "type")
    @Mapping(source = "file.name", target = "name")
    ProductImgsDto productImgsToProductImgsDto(ProductImgs productImgs);

    // Locker -> LockerDto 매핑
    @Named("LOCKER")
    @Mapping(source="locker.body.lockerBodyId", target="bodyId")
    @Mapping(source="locker.lockerId", target="lockerId")
    @Mapping(source="locker.usable", target="usable")
    @Mapping(source="product.productId", target="productId")
    @Mapping(source="product.productNm", target="productNm")
    @Mapping(source = "product.productImgs", target = "productImgs", qualifiedByName = "productImgsToDto")
    @Mapping(source = "product.productImg", target = "productImg")
    LockerDto lockerToLockerDto(Locker locker);

    @IterableMapping(qualifiedByName = "LOCKER")
    List<LockerDto> lockersToLockerDtoList(List<Locker> locker);
}
