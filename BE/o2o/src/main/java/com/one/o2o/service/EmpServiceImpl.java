package com.one.o2o.service;

import com.one.o2o.dto.EmpCard.EmpCardRequestDto;
import com.one.o2o.dto.EmpCard.UserDto;
import com.one.o2o.entity.User;
import com.one.o2o.mapper.UserMapper;
import com.one.o2o.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EmpServiceImpl implements EmpService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserDto findUserByEmpCard(EmpCardRequestDto empCardRequestDto) {
        List<User> userList = userRepository.findAllByUserNm(empCardRequestDto.getName());
        // user 여러 명 나왔을 때 처리 필요
        if(userList.size() == 0) return null;
        else {
            return userMapper.userToUserDto(userList.get(0));
        }
    }
}
