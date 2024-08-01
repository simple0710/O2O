package com.one.o2o.exception.locker;


import com.one.o2o.exception.GeneralException;

public class LockerException {
    public static class LockerNotFoundException extends GeneralException {
        public LockerNotFoundException(){
            super("해당하는 사물함을 찾을 수 없습니다.");
        }
        public LockerNotFoundException(String msg){
            super(msg);
        }
    }

    public static class InsufficientProductQuantityException extends GeneralException {
        public InsufficientProductQuantityException(){
            super("사물함 내부 수량이 부족합니다.");
        }
        public InsufficientProductQuantityException(String msg){
            super(msg);
        }
    }

    public static class InvalidLockerException extends GeneralException {
        public InvalidLockerException(){
            super("유효하지 않은 사물함입니다.");
        }
        public InvalidLockerException(String msg){
            super(msg);
        }
    }
}
