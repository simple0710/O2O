package com.one.o2o.mapper;

import com.one.o2o.dto.EmpCard.UserDto;
import com.one.o2o.dto.MemberDto;
import com.one.o2o.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;


@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Named("userToMemberDto")
    UserDto userToUserDto(User user);

}