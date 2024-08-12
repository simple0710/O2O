package com.one.o2o.dto;

import com.one.o2o.entity.File;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductImgsDto {
    private Integer productId;
    private String type;
    private String name;
}