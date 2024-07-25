package com.one.o2o.exception;



public class LockerException {
    public static class LockerNotFoundException extends RuntimeException {
        public LockerNotFoundException(){
            super("해당하는 사물함을 찾을 수 없습니다.");
        }
        public LockerNotFoundException(String msg){
            super(msg);
        }
    }
}
