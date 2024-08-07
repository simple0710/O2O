package com.one.o2o.service;

import com.one.o2o.dto.common.PageInfoDto;
import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.products.request.ProductsRequestDto;
import com.one.o2o.dto.products.request.RequestProcessDto;
import com.one.o2o.dto.products.request.UsersRequestDto;
import com.one.o2o.entity.products.request.ProductsRequest;
import com.one.o2o.exception.products.error.exception.ArticleNotFoundException;
import com.one.o2o.exception.products.error.exception.InvalidInputValueException;
import com.one.o2o.repository.ProductsRequestRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

interface ProductsRequestServiceInterface {
    Response findAll(int pageNumber, int pageSize);
    Response save(UsersRequestDto urd);
    ProductsRequest findById(long id);
    Response updateProcess(List<RequestProcessDto> requestProcessDtoList);
}

@Service
@RequiredArgsConstructor
public class ProductsRequestService implements ProductsRequestServiceInterface {

    private final ProductsRequestRepository productsRequestRepository;

    // 요청 비품 목록 조회
    public Response findAll(int pageNumber, int pageSize) {
        try {
            Response response = new Response(200, "요청 비품 목록 관리 페이지 이동 성공");
            Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
            Page<ProductsRequest> requestPage = productsRequestRepository.findAll(pageable);
            Map<String, Object> map = new HashMap<>();
            map.put("reqs", requestPage.stream()
                    .map(ProductsRequestDto::new)
                    .collect(Collectors.toList()));
            map.put("pages", PageInfoDto.builder()
                    .curPg(requestPage.getNumber() + 1)
                    .totalPg(requestPage.getTotalPages())
                    .totalReqs(requestPage.getTotalElements())
                    .build()
            );
            response.setData(map);
            return response;
        } catch (Exception e) {
            throw new InvalidInputValueException();
        }
    }

    // 물품 요청
    public Response save(UsersRequestDto urd) {
        try {
            productsRequestRepository.save(new ProductsRequest(urd));
            return new Response(200, "message");
        } catch (Exception e) {
            throw new InvalidInputValueException();
        }
    }

    public ProductsRequest findById(long id) {
        return productsRequestRepository.findById(1)
                .orElseThrow(ArticleNotFoundException::new);
    }

    /**
     * 관리자로부터 물품 요청 승인 및 거부 사항을 갱신합니다.
     *
     * @param requestProcessDtoList     각 게시글에 대한 처리 정보를 담은 리스트
     * @return 처리 결과 (200, "메세지")
     */
    @Transactional
    public Response updateProcess(List<RequestProcessDto> requestProcessDtoList) {
        for (RequestProcessDto request : requestProcessDtoList) {
            ProductsRequest productsRequest = productsRequestRepository.findById(request.getReqId())
                    .orElseThrow(ArticleNotFoundException::new);
            String reqStatus = request.getReqStatus();

            Boolean approvedFlag = reqStatus.equals("approved");
            productsRequest.setIsApproved(approvedFlag);
            productsRequest.setIsRejected(!approvedFlag);
            productsRequest.setRejectCmt(approvedFlag ? request.getRejectCmt() : null);
        }
        return new Response(200, "물품 요청 처리 완료");
    }
}
