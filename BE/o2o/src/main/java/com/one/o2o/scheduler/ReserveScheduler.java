package com.one.o2o.scheduler;

import com.one.o2o.entity.Reserve;
import com.one.o2o.entity.ReserveDet;
import com.one.o2o.repository.LockerRepository;
import com.one.o2o.repository.ReserveRepository;
import com.one.o2o.service.LockerService;
import com.one.o2o.utils.DateUtil;
import com.one.o2o.utils.RentCalculation;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
@AllArgsConstructor
@Slf4j
public class ReserveScheduler {
    private LockerService lockerService;
    private ReserveRepository reserveRepository;

    // 매일 30분마다 만료된 예약을 확인한다
    @Scheduled(cron="0 0/30 * * * *")
//    @Scheduled(cron="0 */5 * * * *") // 테스트용
    @Transactional
    public void expiredReserveCheck(){
        LocalDateTime now = LocalDateTime.now();
        List<Reserve> list = reserveRepository.findAllByIsEndedIsFalseAndDueDtIsBefore(DateUtil.plusNMinutes(now, 1));
        for(Reserve reserve : list){
            try {
                // 3. 예약 상세
                for(ReserveDet det:reserve.getReserveDetList()){
                    // 1) 물품 개수 파악
                    int productId = det.getNewProductId();
                    int productCnt = det.getDetCnt();
                    int lockerId = det.getNewLockerId();
                    // 2) 사물함 복원
                    lockerService.updateLockerProductCountAvailable(lockerId, productCnt, productCnt * RentCalculation.getMul(RentCalculation._reserveCancel));
                }
                reserve.updateReserveToEnded(now);
            } catch (Exception e) {
                log.error("예약 ["+reserve.getReserveId()+"] 업데이트 중 오류 발생: " + e.getMessage(), e);
                // 오류 발생 시, 해당 물품의 업데이트를 건너뛰고 다음으로 진행
            }
        }
        log.info("expiredReserveCheck: "+list.size()+"개의 reserve가 만료되었습니다.");
    }
}
