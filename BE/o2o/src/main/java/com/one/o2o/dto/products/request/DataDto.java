package com.one.o2o.dto.products.request;

import com.one.o2o.dto.common.PageInfoDto;
import com.one.o2o.dto.products.request.ProductsRequestDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class DataDto {
    List<ProductsRequestDto> reqs;
    PageInfoDto pages;
}
