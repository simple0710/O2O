package com.one.o2o.validator;

import com.one.o2o.exception.locker.LockerErrorCode;
import com.one.o2o.exception.locker.LockerException;
import com.one.o2o.repository.LockerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class LockerValidator {

    private final LockerRepository lockerRepository;

    /**
     * 주어진 lockerId가 유효한지 검증
     * - lockerId가 null이거나 0 이하일 경우, 오류를 반환
     * - lockerId가 데이터베이스에 존재하지 않는 경우, 오류를 반환.
     *
     * @param lockerId 검증할 lockerId
     */
    public void validateLockerId(Integer lockerId) {
        if (lockerId == null) {
            log.error("잘못된 lockerId: {}", lockerId);
            throw new LockerException(LockerErrorCode.LOCKER_ID_INVALID);
        }

        if (lockerId <= 0) {
            throw new LockerException(LockerErrorCode.LOCKER_ID_NEGATIVE);
        }

        boolean lockerExists = lockerRepository.existsById(lockerId);
        if (!lockerExists) {
            log.error("존재하지 않는 lockerId: {}", lockerId);
            throw new LockerException(LockerErrorCode.LOCKER_NOT_FOUND);
        }
        log.info("유효한 lockerId 확인됨: {}", lockerId);
    }

    /**
     * locker 물품 등록 시, 물품의 개수를 검증
     * 총 개수가 보다 물품 개수가 많은 경우 오류를 반환
     * 
     * @param productCnt
     * @param totalCnt
     */
    public void validateTotalProductCnt(Integer productCnt, Integer totalCnt) {
        log.info("productCnt = {}", productCnt);
        log.info("totalCnt = {}", totalCnt);
        if (totalCnt < productCnt) {
            throw new LockerException(LockerErrorCode.TOTAL_COUNT_UNDER_PRODUCT_COUNT);
        }
    }
}
