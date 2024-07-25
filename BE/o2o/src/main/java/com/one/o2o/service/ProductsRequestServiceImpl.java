package com.one.o2o.service;

import com.one.o2o.dto.Response;
import com.one.o2o.exception.error.ErrorCode;
import com.one.o2o.exception.error.ErrorResponse;
import com.one.o2o.exception.error.exception.ArticleNotFoundException;
import com.one.o2o.dto.DefaultResponseDto;
import com.one.o2o.dto.productsrequest.*;
import com.one.o2o.entity.productsrequest.ProductsRequest;
import com.one.o2o.exception.error.exception.InvalidInputValueException;
import com.one.o2o.repository.ProductsRequestRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductsRequestServiceImpl {

    private final ProductsRequestRepository productsRequestRepository;

    // 요청 비품 목록 조회
    public Response findAll(int pageNumber, int pageSize) {
        try {
            Response response = new Response(200, "요청 비품 목록 관리 페이지 이동 성공");
            Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
            Page<ProductsRequest> requestPage = productsRequestRepository.findAll(pageable);

            // data
            DataDto data = new DataDto();
            // data - reqs
            data.setReqs(requestPage.stream()
                    .map(ProductsRequestDto::new)
                    .collect(Collectors.toList())
            );
            // data - pages
            data.setPages(new PageInfoDto(
                    requestPage.getNumber() + 1,
                    requestPage.getTotalPages(),
                    requestPage.getTotalElements())
            );
            response.setData(data);
            return response;
        } catch (Exception e) {
            throw new InvalidInputValueException();
        }
    }

    // 물품 요청
    public DefaultResponseDto save(UsersRequestDto urd) {
        try {
            productsRequestRepository.save(new ProductsRequest(urd));
            return new DefaultResponseDto("200", "message");
        } catch (Exception e) {
            throw new InvalidInputValueException();
        }
    }

    public ProductsRequest findById(long id) {
        return productsRequestRepository.findById(1)
                .orElseThrow(ArticleNotFoundException::new);
    }


    @Transactional
    public DefaultResponseDto updateProcess(RequestProcessDto requestProcessDto) {
        ProductsRequest productsRequest = productsRequestRepository.findById(requestProcessDto.getReqId())
                .orElseThrow(ArticleNotFoundException::new);
        String status = requestProcessDto.getReqStatus();
        DefaultResponseDto response = new DefaultResponseDto("200", "message");
        if (status.equals("approved")) {
            productsRequest.setIsApproved(true);
            productsRequest.setIsRejected(false);
            productsRequest.setRejectCmt(null);
        } else if (status.equals("rejected")) {
            productsRequest.setIsApproved(false);
            productsRequest.setIsRejected(true);
            productsRequest.setRejectCmt(requestProcessDto.getRejectCmt());
        } else {

            return new DefaultResponseDto("400", "오류 메세지");
        }
        return response;
    }
}
