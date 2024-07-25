package com.one.o2o.service;

import com.one.o2o.dto.productsrequest.*;
import com.one.o2o.entity.productsrequest.ProductsRequest;
import com.one.o2o.repository.ProductsRequestRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductsRequestServiceImpl {

    private final ProductsRequestRepository productsRequestRepository;

    public ResponseDto findAll(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
        Page<ProductsRequest> requestPage = productsRequestRepository.findAll(pageable);
        System.out.println(requestPage);
        ResponseDto response = new ResponseDto();
        try {
            // response
            response.setStatus(200);
            response.setMessage("요청 비품 목록 관리 페이지 이동 성공");

            // data - reqs
            List<ProductsRequestDto> reqs = new ArrayList<>();
            for (ProductsRequest pr : requestPage) {
                ProductsRequestDto prd = new ProductsRequestDto(pr);
                reqs.add(prd);
            }

            // data - pages
            PageInfoDto pages = new PageInfoDto(requestPage.getNumber() + 1, requestPage.getTotalPages(), requestPage.getTotalElements());

            // data
            DataDto data = new DataDto();
            data.setReqs(reqs);
            data.setPages(pages);

            //response
            response.setData(data);

            System.out.println(response);
        } catch (Exception e) {
            response = new ResponseDto();
            response.setStatus(400);
            response.setMessage("잘못된 요청입니다.");
            System.out.println(e.getMessage());
        }
        return response;
    }

    public void save(UsersRequestDto urd) {
        ProductsRequest pr = new ProductsRequest(urd);
        productsRequestRepository.save(pr);
    }

    @Transactional
    public void updateProcess(RequestProcessDto requestProcessDto) {
        ProductsRequest productsRequest = productsRequestRepository.findById(requestProcessDto.getReqId()).orElseThrow(() -> new RuntimeException("Entity not found"));
        String status = requestProcessDto.getReqStatus();
        if (status.equals("approved")) {
            productsRequest.setIsApproved(true);
            productsRequest.setIsRejected(false);
            productsRequest.setRejectCmt(null);
        } else if (status.equals("rejected")) {
            productsRequest.setIsApproved(false);
            productsRequest.setIsRejected(true);
            productsRequest.setRejectCmt(requestProcessDto.getRejectCmt());
        } else {

        }
    }
}
