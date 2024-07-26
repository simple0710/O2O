package com.one.o2o.dto.productsrequest;

import com.one.o2o.dto.Response;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class DataDto {
    List<Object> reqs;
    PageInfoDto pages;
}
