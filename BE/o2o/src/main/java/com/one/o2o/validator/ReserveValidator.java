package com.one.o2o.validator;

import com.one.o2o.exception.reserve.ReserveErrorCode;
import com.one.o2o.exception.reserve.ReserveException;
import com.one.o2o.repository.ReserveRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class ReserveValidator {

    private final ReserveRepository reserveRepository;

    /**
     * 예약 기록이 존재하는지 검증
     * 예약 기록이 DB에 없는 경우 오류를 반환
     * 
     * @param reserveId 검증할 예약 ID
     */
    public void validateReserveId(Integer reserveId) {
        if (!reserveRepository.existsById(reserveId)) {
            throw new ReserveException(ReserveErrorCode.RESERVE_ID_NOT_FOUND);
        }
    }

    /**
     * 예약한 수령 시간이 유효한지 검증
     * 예약한 수령 시간이 현재 시간보다 작은 경우 오류를 반환
     * 
     * @param reserveTime 검증할 예약 수령 시간
     */
    public void validateReserveDate(LocalDateTime reserveTime) {
        if (reserveTime.isBefore(LocalDateTime.now())) {
            throw new ReserveException(ReserveErrorCode.RESERVE_TIME_INVALID);
        }
    }
}
