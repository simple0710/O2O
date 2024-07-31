package com.one.o2o.dto.productsrequest;

import com.one.o2o.dto.common.PageInfoDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class DataDto {
    List<ProductsRequestDto> reqs;
    PageInfoDto pages;
}
