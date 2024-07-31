package com.one.o2o.mapper;

import com.one.o2o.dto.LockerDto;
import com.one.o2o.entity.Locker;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LockerMapper {
    LockerMapper INSTANCE = Mappers.getMapper(LockerMapper.class);

    // Locker -> LockerDto 매핑
    @Named("LOCKER")
    @Mapping(source="lockerBody.id", target="body_id")
    @Mapping(source="locker.lockerId", target="lockerId")
//    @Mapping(source="locker.isUsable", target="isUsable")
    @Mapping(source="product.productId", target="product_id")
    @Mapping(source="product.productNm", target="product_nm")
    LockerDto lockerToLockerDto(Locker locker);

    @IterableMapping(qualifiedByName = "LOCKER")
    List<LockerDto> lockersToLockerDtoList(List<Locker> locker);
}
