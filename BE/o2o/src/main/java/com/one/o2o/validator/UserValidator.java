package com.one.o2o.validator;

import com.one.o2o.exception.User.UserErrorCode;
import com.one.o2o.exception.User.UserException;

public class UserValidator {

    /**
     * 사용자 ID가 입력되지 않은 경우 USER_ID_MISSING 오류를 반환
     * 사용자 ID가 정수 범위를 초과하는 경우 USER_ID_OUT_OF_RANGE 오류를 반환
     *
     * @param userId
     */
    public static void validateUserId(Integer userId) {
        if (userId == null || userId <= 0) {
            throw new UserException(UserErrorCode.USER_ID_MISSING);
        }
    }
}
