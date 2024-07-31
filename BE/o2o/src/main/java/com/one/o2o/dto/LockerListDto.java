package com.one.o2o.dto;

import com.one.o2o.dto.locker.LockerDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class LockerListDto {
    private String body_location;
    private int column;
    private int row;
    private List<LockerDto> lockers;
}
