package com.one.o2o.mapper;

import com.one.o2o.dto.products.ProductsResponseDto;
import com.one.o2o.entity.Products;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    // Locker -> LockerDto 매핑
    @Named("Products")
    ProductsResponseDto productToProductResponseDto(Products products);

    @IterableMapping(qualifiedByName = "Products")
    List<ProductsResponseDto> productsToProductResponseDtoList(List<Products> products);
}
