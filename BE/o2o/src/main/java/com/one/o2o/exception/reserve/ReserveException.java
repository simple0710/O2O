package com.one.o2o.exception.reserve;

import com.one.o2o.exception.GeneralException;

public class ReserveException {
    public static class ReserveNotFoundException extends GeneralException {
        public ReserveNotFoundException(){
            super("예약 내역을 찾을 수 없습니다.");
        }
        public ReserveNotFoundException(String msg){
            super(msg);
        }
    }

    public static class InvalidReserveException extends GeneralException {
        public InvalidReserveException(){
            super("적절하지 않은 예약 시도입니다.");
        }
        public InvalidReserveException(String msg){
            super(msg);
        }
    }
}
