package com.one.o2o.service;

import com.one.o2o.dto.rent.RentRequestDto;
import com.one.o2o.dto.rent.RentResponseDto;
import com.one.o2o.dto.rent.RentResponseSingleDto;
import com.one.o2o.entity.*;
import com.one.o2o.exception.locker.LockerException;
import com.one.o2o.exception.rent.RentException;
import com.one.o2o.mapper.RentMapper;
import com.one.o2o.repository.LockerRepository;
import com.one.o2o.repository.RentLogRepository;
import com.one.o2o.repository.RentRepository;
import com.one.o2o.repository.StatusRepository;
import com.one.o2o.utils.RentCalculation;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RentServiceImpl implements RentService {
    private final RentRepository rentRepository;
    private final RentLogRepository rentLogRepository;
    private final StatusRepository statusRepository;
    private final LockerRepository lockerRepository;
    private final RentMapper rentMapper;

    @Override
    public RentResponseDto readRentByUserId(int userId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
        Page<Rent> listPage = rentRepository.findAllByUserId(userId, pageable);
        List<Rent> rentList = listPage.getContent();
        System.out.println("rentList = " + rentList);
        RentResponseDto res = new RentResponseDto();
        List<RentResponseSingleDto> rentDtoList = new ArrayList<>();
        for (Rent rent : rentList) {
            List<RentLog> rl = rent.getRentLogs();
            rl.sort(Comparator.comparing(RentLog::getLogDt));
            for (RentLog rentLog : rl) {
                System.out.println("rentLog = " + rentLog);
                rentLog.getProduct();
                rentLog.getLocker();
            }
            RentResponseSingleDto dto = rentMapper.rentToRentListResponseDto(rent);
            // 가장 마지막 기록을 updateDt으로 등록환다
            dto.setUpdateDt(rl.get(rl.size()-1).getLogDt());
            rentDtoList.add(dto);
        }
        res.setRents(rentDtoList);
        List<Status> statusList = statusRepository.findAll();
        res.setStatus(statusList.stream().collect(Collectors.toMap(Status::getStatusId, status -> status)));
        res.setTotalRents(listPage.getTotalElements());
        res.setTotalPg(listPage.getTotalPages());
        res.setCurPg(pageNumber);
        return res;
    }

    @Override
    public Integer createRent(RentRequestDto rentRequestDto, User user) {
        // 트랜잭션 종료
        Integer rentId = createRentTransaction(rentRequestDto, user);
//
//
//        Optional<Rent> findRent = rentRepository.findById(rentId);
//        Rent rent = findRent.orElseThrow(() -> new RentException.RentNotFoundException("대여가 정상적으로 저장되지 않았습니다"));
//
//        System.out.println("rent = " + rent.getId());
//        List<RentLog> logs = rentLogRepository.findByRent_Id(rentId);
//        System.out.println("new [" + rentId + "] logs = " + logs);
//        rent.setRentLogs(logs);
        return rentId;
    }


    @Transactional
    public int createRentTransaction(RentRequestDto rentRequestDto, User user) {
        // 1. 대여 생성
        Rent rent = new Rent();
        // (1) 대여 정보 수정
        rent.setUserId(user.getUserId());
        rent.setReserveId(rentRequestDto.getReserveID());
        rent.setStartDt(LocalDateTime.now());
        rent.setDueDt(RentCalculation.getDueDateTime(rent.getStartDt()));
        rentRepository.save(rent);

        int rentId = rent.getId();
        for(RentRequestDto.RentRequestProduct product: rentRequestDto.getProducts()){
            // 2) 대여 가능 여부 확인
            Optional<Locker> findLocker = lockerRepository.findByLockerIdAndProduct_ProductId(product.getLockerId(), product.getProductId());
            Locker locker = findLocker.orElseThrow(LockerException.LockerNotFoundException::new);
            // (1) 수량 확인
            int lockerCnt = locker.getProductCnt();
            if(lockerCnt < product.getProductCnt()) throw new LockerException.InsufficientProductQuantityException();

            // 3) 사물함 차감
            locker.updateProductCnt(lockerCnt-product.getProductCnt());

            // 4) 대여로그 추가
            RentLog rentLog = new RentLog();
            rentLog.setRent(rent);
            rentLog.setNewRentId(rentId);
            rentLog.setNewLockerId(product.getLockerId());
            rentLog.setNewProductId(product.getProductId());
            rentLog.setStatusId(RentCalculation._borrow);
            rentLog.setLogCnt(product.getProductCnt());
            rentLog.setLogDt(LocalDateTime.now());
            rentLogRepository.save(rentLog);
            System.out.println("rentLog = " + rentLog);
        }
        // 강제로 rentLogs 초기화
        Hibernate.initialize(rent.getRentLogs());
        rentRepository.flush();
        rentLogRepository.flush();

        return rentId;
    }
}
