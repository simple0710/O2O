package com.one.o2o.mapper;

import com.one.o2o.dto.locker.LockerDto;
import com.one.o2o.dto.products.ProductsResponseDto;
import com.one.o2o.entity.Locker;
import com.one.o2o.entity.Product;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    // Locker -> LockerDto 매핑
    @Named("Product")
    ProductsResponseDto productToProductResponseDto(Product product);

    @IterableMapping(qualifiedByName = "Product")
    List<ProductsResponseDto> productsToProductResponseDtoList(List<Product> product);
}
