package com.one.o2o.validator;

import com.one.o2o.config.JwtTokenProvider;
import com.one.o2o.entity.Users;
import com.one.o2o.exception.user.UserErrorCode;
import com.one.o2o.exception.user.UserException;
import com.one.o2o.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
@Slf4j
public class UserValidator {

    private final MemberRepository memberRepository;

    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 사용자 ID가 입력되지 않은 경우 USER_ID_MISSING 오류를 반환
     * 사용자 ID가 정수 범위를 초과하는 경우 USER_ID_OUT_OF_RANGE 오류를 반환
     * 사용자가 존재하지 않는 경우 USER_NOT_FOUND 오류를 반환
     *
     * @param userId
     */
    public void validateUserId(Integer userId) {
        if (userId == null || userId <= 0) {
            throw new UserException(UserErrorCode.USER_ID_MISSING);
        }

        boolean userExists = memberRepository.existsById(userId);
        if (!userExists) {
            throw new UserException(UserErrorCode.USER_NOT_FOUND);
        }
    }

    public void validateUserIsAdmin(String accessToken) {
        Authentication auth = jwtTokenProvider.getAuthentication(accessToken);

        Users user = memberRepository.findById(Integer.valueOf(auth.getName())).orElseThrow();
        if (!user.getIsAdmin()) {
            throw new UserException(UserErrorCode.USER_NOT_ADMIN);
        }
    }
}
