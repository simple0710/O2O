package com.one.o2o.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductSavedEvent {
    private final Integer productId;
    private final Integer fileId;
}
