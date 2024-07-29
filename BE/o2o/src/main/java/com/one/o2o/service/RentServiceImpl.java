package com.one.o2o.service;

import com.one.o2o.dto.rent.RentResponseDto;
import com.one.o2o.entity.Rent;
import com.one.o2o.entity.RentLog;
import com.one.o2o.entity.Status;
import com.one.o2o.mapper.RentMapper;
import com.one.o2o.repository.RentRepository;
import com.one.o2o.repository.StatusRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RentServiceImpl implements RentService {
    private final RentRepository rentRepository;
    private final StatusRepository statusRepository;
    private final RentMapper rentMapper;

    @Override
    public RentResponseDto readRentByUserId(int userId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
        Page<Rent> listPage = rentRepository.findAllByUserId(userId, pageable);
        List<Rent> rentList = listPage.getContent();
        System.out.println("rentList = " + rentList);
        for (Rent rent : rentList) {
            List<RentLog> rl = rent.getRentLogs();
            rl.sort(Comparator.comparing(RentLog::getLogDt));
            for (RentLog rentLog : rl) {
                System.out.println("rentLog = " + rentLog);
                rentLog.getProduct();
                rentLog.getLocker();
            }
        }
        List<Status> statusList = statusRepository.findAll();
        RentResponseDto res = new RentResponseDto();
        List<RentResponseDto.RentListResponseDto> rentDtoList = rentMapper.rentsToRentListResponseDtos(rentList);
        res.setRents(rentDtoList);
        res.setStatus(statusList.stream().collect(Collectors.toMap(Status::getStatusId, status -> status)));
        res.setTotalRents(listPage.getTotalElements());
        res.setTotalPg(listPage.getTotalPages());
        res.setCurPg(pageNumber);
        return res;
    }
}
