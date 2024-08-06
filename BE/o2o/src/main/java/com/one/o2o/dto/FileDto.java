package com.one.o2o.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class FileDto {
    private Integer id;
    private String name;
    private String type;
}
