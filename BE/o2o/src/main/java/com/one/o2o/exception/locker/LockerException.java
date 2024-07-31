package com.one.o2o.exception.locker;



public class LockerException {
    public static class LockerNotFoundException extends RuntimeException {
        public LockerNotFoundException(){
            super("해당하는 사물함을 찾을 수 없습니다.");
        }
        public LockerNotFoundException(String msg){
            super(msg);
        }
    }

    public static class InsufficientProductQuantityException extends RuntimeException {
        public InsufficientProductQuantityException(){
            super("사물함 내부 수량이 부족합니다.");
        }
        public InsufficientProductQuantityException(String msg){
            super(msg);
        }
    }
}
