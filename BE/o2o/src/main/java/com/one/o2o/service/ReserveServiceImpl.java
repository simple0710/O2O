package com.one.o2o.service;

import com.one.o2o.dto.common.PageInfoDto;
import com.one.o2o.dto.reserve.ReserveRequestDto;
import com.one.o2o.dto.reserve.ReserveRequestProductDto;
import com.one.o2o.dto.reserve.ReserveResponseDto;
import com.one.o2o.dto.reserve.ReserveResponseSingleDto;
import com.one.o2o.entity.Locker;
import com.one.o2o.entity.Reserve;
import com.one.o2o.entity.ReserveDet;
import com.one.o2o.exception.locker.LockerException;
import com.one.o2o.exception.reserve.ReserveException;
import com.one.o2o.mapper.ReserveMapper;
import com.one.o2o.repository.LockerRepository;
import com.one.o2o.repository.ReserveDetRepository;
import com.one.o2o.repository.ReserveRepository;
import com.one.o2o.utils.DateUtil;
import com.one.o2o.utils.RentCalculation;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ReserveServiceImpl implements ReserveService {
    private LockerRepository lockerRepository;
    private ReserveRepository reserveRepository;
    private ReserveDetRepository reserveDetRepository;
    private ReserveMapper reserveMapper;

    @Override
    public ReserveResponseDto readReserveByUser(int userId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
        Page<Reserve> page = reserveRepository.findAllByUserIdAndIsEndedIsFalse(userId, pageable);
        List<ReserveResponseSingleDto> mappedList = reserveMapper.reservesToReserveResponseDtos(page.getContent());
        // PageInfoDto 객체 생성
        PageInfoDto pageInfoDto = PageInfoDto.builder()
                .curPg(page.getNumber() + 1)
                .totalPg(page.getTotalPages())
                .totalReqs(page.getTotalElements())
                .build();

        return ReserveResponseDto.builder()
                .reserves(mappedList)
                .pages(pageInfoDto)
                .build();
    }

    @Override
    public ReserveResponseDto readReserveByUserAndLockerBody(int userId, int bodyId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
        Page<Reserve> page = reserveRepository.findAllByUserIdAndBodyIdAndIsEndedIsFalse(userId, bodyId, pageable);
        List<ReserveResponseSingleDto> mappedList = reserveMapper.reservesToReserveResponseDtos(page.getContent());
        // PageInfoDto 객체 생성
        PageInfoDto pageInfoDto = PageInfoDto.builder()
                .curPg(page.getNumber() + 1)
                .totalPg(page.getTotalPages())
                .totalReqs(page.getTotalElements())
                .build();

        return ReserveResponseDto.builder()
                .reserves(mappedList)
                .pages(pageInfoDto)
                .build();
    }

    @Override
    public Integer createReserve(int userId, ReserveRequestDto reserveRequestDto) {
        // 예약 트랜잭션
        Integer reserveId = createReserveTransaction(userId, reserveRequestDto);

        List<ReserveDet> dets = reserveDetRepository.findAllByReserveId(reserveId);
        System.out.println("dets = " + dets);
        return reserveId;
    }

    @Transactional
    private Integer createReserveTransaction(int userId, ReserveRequestDto reserveRequestDto){
        // 1) 예약 생성
        Reserve reserve = new Reserve();
        // (1) 예약 정보 수정
        reserve.setUserId(userId);
        reserve.setStartDt(LocalDateTime.now());
        reserve.setBodyId(reserveRequestDto.getLockerBodyId());
        // 문자열 시간으로 변환
        LocalDateTime ldt = DateUtil.stringToLocalDateTime(reserveRequestDto.getReserveTime());
        if(ldt == null) throw new ReserveException.InvalidReserveException("유효하지 않은 날짜 형식입니다.");
        reserve.setDueDt(ldt);
        reserveRepository.save(reserve);

        int reserveId = reserve.getReserveId();
        for(ReserveRequestProductDto product : reserveRequestDto.getReserves()){
            // 2) 예약 가능 여부 확인
            Optional<Locker> findLocker =lockerRepository.findByLockerId(product.getLockerId());
            Locker locker = findLocker.orElseThrow(LockerException.LockerNotFoundException::new);
            // (1) 수량 확인
            int lockerCnt = locker.getProductCnt();
            if(lockerCnt < product.getProductCnt()) throw new LockerException.InsufficientProductQuantityException();

            // 3) 사물함 차감
            locker.updateProductCnt(lockerCnt-product.getProductCnt());

            // 4) 예약 상세 추가
            ReserveDet reserveDet = ReserveDet.builder()
                            .userId(userId)
                            .newProductId(product.getProductId())
                            .newLockerId(product.getLockerId())
                            .statusId(RentCalculation._reserve)
                            .detCnt(product.getProductCnt())
                            .logDt(LocalDateTime.now())
                            .reserveId(reserveId)
                                .build();
            reserveDetRepository.save(reserveDet);
        }


        reserveRepository.flush();
        reserveDetRepository.flush();

        return reserveId;
    }
}
