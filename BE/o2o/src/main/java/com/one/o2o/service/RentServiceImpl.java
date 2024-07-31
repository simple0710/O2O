package com.one.o2o.service;

import com.one.o2o.dto.rent.*;
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
import java.util.*;
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
        res.setCurPg(listPage.getNumber() + 1);
        return res;
    }

    @Override
    public Integer createRent(int userId, RentRequestDto rentRequestDto) {
        // 트랜잭션 종료
        Integer rentId = createRentTransaction(userId, rentRequestDto);
//        제대로 read 안되는 문제: 결국 해결 X
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

    public RentResponseDto readOngoingRentByUserId(int userId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
        Page<Rent> listPage = rentRepository.findAllByUserIdAndIsReturnedIsFalse(userId, pageable);
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


    @Transactional
    public int createRentTransaction(int userId, RentRequestDto rentRequestDto) {
        // 1. 대여 생성
        Rent rent = new Rent();
        // (1) 대여 정보 수정
        rent.setUserId(userId);
        rent.setReserveId(rentRequestDto.getReserveID());
        rent.setStartDt(LocalDateTime.now());
        rent.setDueDt(RentCalculation.getDueDateTime(rent.getStartDt()));
        rentRepository.save(rent);

        int rentId = rent.getId();
        for(RentSimpleProduct product: rentRequestDto.getProducts()){
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

    @Override
    @Transactional
    public boolean createReturn(int userId, ReturnRequestDto returnRequestDto) {
        Optional<Rent> findRent = rentRepository.findById(returnRequestDto.getRentId());
        // 1. 유효성 확인
        // 1) 대여 유효성
        Rent rent = findRent.orElseThrow(RentException.RentNotFoundException::new);
        if(rent.isReturned()) return true;
        Map<Integer, Integer> map = RentCalculation.getProductRentFromEntity(rent.getRentLogs());
        System.out.println("map = " + map);
        for(RentSimpleProduct product: returnRequestDto.getProducts()) {
            // 2) 물품 유효성
            // 빌려갔던 물품이 맞는지
            if(!map.containsKey(product.getProductId())) throw new RentException.InvalidReturnException();
            // 대여할 수량이 남아있는지
            if(map.get(product.getProductId()) < product.getProductCnt()) throw new RentException.InvalidReturnException();

            // 2. 반납 실행
            // 1) 반납 로그 저장
            RentLog rentLog = new RentLog();
            rentLog.setNewRentId(rent.getId());
            rentLog.setStatusId(RentCalculation._return);
            rentLog.setLogCnt(product.getProductCnt());
            rentLog.setLogDt(LocalDateTime.now());
            rentLog.setNewLockerId(product.getLockerId());
            rentLog.setNewProductId(product.getProductId());
            rentLogRepository.save(rentLog);
        }
        // 3. 대여 변경
        // 1) 모든 반납이 완료되었으면, 완료로 설정한다.
        if(map.values().stream().reduce(0, Integer::sum) == 0){
            rent.updateReturned(true);
        }
        return true;
    }
}
