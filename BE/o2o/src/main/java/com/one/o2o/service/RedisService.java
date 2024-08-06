package com.one.o2o.service;


import java.time.Duration;

/**
 * Redis Service를 관리하는 인터페이스
 *
 * @author : lee
 * @fileName : RedisService
 *
 * @since : 3/29/24
 */
public interface RedisService {

    int setValues(String key, String value);                       // 값 등록 / 수정

    int setValues(String key, String value, Duration duration);    // 값 등록 / 수정

    String getValue(String key);                                    // 값 조회

    int deleteValue(String key);


}
