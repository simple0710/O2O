package com.one.o2o.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class PageInfoDto {
    private List<ProductsRequestDto> reqs;
    private Integer curPg;
    private Integer totalPg;
    private Integer totalReqs;
}
