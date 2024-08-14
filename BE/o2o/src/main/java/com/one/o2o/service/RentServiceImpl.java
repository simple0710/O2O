package com.one.o2o.service;

import com.one.o2o.dto.rent.*;
import com.one.o2o.entity.*;
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
    private final LockerService lockerService;
    private final ReserveService reserveService;

    @Override
    public RentResponseDto readRentByUserId(int userId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
        Page<Rent> listPage = rentRepository.findAllByUserIdOrderByStartDtDesc(userId, pageable);
        List<Rent> rentList = listPage.getContent();
        System.out.println("rentList = " + rentList);
        RentResponseDto res = new RentResponseDto();
        List<RentResponseSingleDto> rentDtoList = new ArrayList<>();
        for (Rent rent : rentList) {
            List<RentLog> rl = rent.getRentLogs();
            if(rl.isEmpty()) throw new RentException.RentNotFoundException("적합하지 않은 대여 내역입니다.");
            rl.sort(Comparator.comparing(RentLog::getLogDt));
            for (RentLog rentLog : rl) {
                System.out.println("rentLog = " + rentLog);
                rentLog.getProducts();
                rentLog.getLocker();
            }
            RentResponseSingleDto dto = rentMapper.rentToRentListResponseDto(rent);
            // 가장 마지막 기록을 updateDt으로 등록한다
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
    @Transactional
    public Integer createRent(RentRequestDto rentRequestDto) {
        // 트랜잭션 종료
        // 1) 대여 생성
        Rent rent = new Rent();
        // (1) 대여 정보 수정
        rent.setUserId(rentRequestDto.getUserId());
        rent.setStartDt(LocalDateTime.now());
        rent.setDueDt(RentCalculation.getDueDateTime(rent.getStartDt()));
        rentRepository.save(rent);
        Integer rentId = rent.getId();


        // (2) 예약 있을 시 종료
        if(rentRequestDto.getReserveID() != null){
            rent.setReserveId(rentRequestDto.getReserveID());
            reserveService.finishReserve(rentRequestDto.getReserveID(), rent.getId()); // 여기서 오류 발생
        }

        for(RentSimpleProduct product: rentRequestDto.getProducts()){
            // 2) 대여 가능 여부 확인 및 사물함 수량 차감
            lockerService.updateLockerProductCountAvailable(product.getLockerId(), product.getProductId(), product.getProductCnt()*RentCalculation.getMul(RentCalculation._borrow));
            // 3) 대여로그 추가
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
    public RentResponseDto readOngoingRentByUserId(int userId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
        Page<Rent> listPage = rentRepository.findAllByUserIdAndIsReturnedIsFalseOrderByStartDtDesc(userId, pageable);
        List<Rent> rentList = listPage.getContent();
        System.out.println("rentList = " + rentList);
        RentResponseDto res = new RentResponseDto();
        List<RentResponseSingleDto> rentDtoList = new ArrayList<>();
        for (Rent rent : rentList) {
            List<RentLog> rl = rent.getRentLogs();
            if(rl.isEmpty()) throw new RentException.RentNotFoundException("적합하지 않은 대여 내역입니다.");
            rl.sort(Comparator.comparing(RentLog::getLogDt));
            for (RentLog rentLog : rl) {
                System.out.println("rentLog = " + rentLog);
                rentLog.getProducts();
                rentLog.getLocker();
            }
            RentResponseSingleDto dto = rentMapper.rentToRentListResponseDto(rent);
            // 가장 마지막 기록을 updateDt으로 등록한다
            dto.setUpdateDt(rl.get(rl.size()-1).getLogDt());
            // 대여가 0이면 제외한다
            dto.setProducts(dto.getProducts().stream().filter(rpd -> rpd.getStatus().get(RentCalculation._borrow).getProductCnt() > 0).toList());
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
    @Transactional
    public boolean createReturn(ReturnRequestDto returnRequestDto) {
        // 1. 유효성 확인
        // 1) 반납 유효성
        Rent rent = rentRepository.findById(returnRequestDto.getRentId())
                .orElseThrow(RentException.RentNotFoundException::new);
        if(rent.isReturned()) throw new RentException.InvalidReturnException("이미 완료된 반납입니다.");
        Map<Integer, Integer> map = RentCalculation.getProductRentFromEntity(rent.getRentLogs());
        System.out.println("map = " + map);
        for(RentSimpleProduct product: returnRequestDto.getProducts()) {
            // 2) 물품 유효성
            // 빌려갔던 물품이 맞는지
            if(!map.containsKey(product.getProductId())) throw new RentException.InvalidReturnException();
            // 반납할 수량이 남아있는지
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
            // 2) 사물함 복원
            lockerService.updateLockerProductCountAvailable(product.getLockerId(), product.getProductId(), product.getProductCnt()*RentCalculation.getMul(RentCalculation._return));
            // 3) 물품 수량 확인
            map.put(product.getProductId(), map.get(product.getProductId()) - product.getProductCnt());
        }
        // 3. 대여 변경
        // 1) 모든 반납이 완료되었으면, 완료로 설정한다.
        if(map.values().stream().reduce(0, Integer::sum) == 0){
            rent.updateReturned(true);
            rent.setEndDt(LocalDateTime.now());
        }
        return true;
    }
}
