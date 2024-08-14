package com.one.o2o.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ProductStatus {
    MISSING(6),
    BROKEN(7);

    private final Integer statusId;
}