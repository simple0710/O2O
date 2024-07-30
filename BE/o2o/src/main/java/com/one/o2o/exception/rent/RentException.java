package com.one.o2o.exception.rent;

public class RentException {
    public static class RentNotFoundException extends RuntimeException {
        public RentNotFoundException(){
            super("대여 내역을 찾을 수 없습니다.");
        }
        public RentNotFoundException(String msg){
            super(msg);
        }
    }
}
