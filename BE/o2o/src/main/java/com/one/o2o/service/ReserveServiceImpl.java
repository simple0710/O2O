package com.one.o2o.service;

import com.one.o2o.dto.common.PageInfoDto;
import com.one.o2o.dto.reserve.ReserveResponseDto;
import com.one.o2o.dto.reserve.ReserveResponseSingleDto;
import com.one.o2o.entity.Reserve;
import com.one.o2o.mapper.ReserveMapper;
import com.one.o2o.repository.ReserveRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ReserveServiceImpl implements ReserveService {
    private ReserveRepository reserveRepository;
    private ReserveMapper reserveMapper;

    @Override
    public ReserveResponseDto readReserveByUser(int userId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
        Page<Reserve> page = reserveRepository.findAllByUserIdAndIsEndedIsFalse(userId, pageable);
        List<ReserveResponseSingleDto> mappedList = reserveMapper.reservesToReserveResponseDtos(page.getContent());
        // PageInfoDto 객체 생성
        PageInfoDto pageInfoDto = PageInfoDto.builder()
                .curPg(page.getNumber() + 1)
                .totalPg(page.getTotalPages())
                .totalReqs(page.getTotalElements())
                .build();

        return ReserveResponseDto.builder()
                .reserves(mappedList)
                .pages(pageInfoDto)
                .build();
    }

    @Override
    public ReserveResponseDto readReserveByUserAndLockerBody(int userId, int bodyId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
        Page<Reserve> page = reserveRepository.findAllByUserIdAndBodyIdAndIsEndedIsFalse(userId, bodyId, pageable);
        List<ReserveResponseSingleDto> mappedList = reserveMapper.reservesToReserveResponseDtos(page.getContent());
        // PageInfoDto 객체 생성
        PageInfoDto pageInfoDto = PageInfoDto.builder()
                .curPg(page.getNumber() + 1)
                .totalPg(page.getTotalPages())
                .totalReqs(page.getTotalElements())
                .build();

        return ReserveResponseDto.builder()
                .reserves(mappedList)
                .pages(pageInfoDto)
                .build();
    }
}
