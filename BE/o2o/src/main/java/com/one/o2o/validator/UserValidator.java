package com.one.o2o.validator;

import com.one.o2o.exception.User.UserErrorCode;
import com.one.o2o.exception.User.UserException;

public class UserValidator {

    public static void validateUserId(Integer userId) {
        if (userId == null || userId <= 0) {
            throw new UserException(UserErrorCode.USER_ID_MISSING);
        }
    }
}
