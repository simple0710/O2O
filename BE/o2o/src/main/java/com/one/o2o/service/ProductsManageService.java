package com.one.o2o.service;

import com.one.o2o.dto.common.PageInfoDto;
import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.products.ProductsDto;
import com.one.o2o.dto.products.manage.OverdueDto;
import com.one.o2o.dto.products.manage.ProductsOverdueDto;
import com.one.o2o.dto.products.manage.StatusDto;
import com.one.o2o.entity.Product;
import com.one.o2o.entity.Rent;
import com.one.o2o.entity.RentLog;
import com.one.o2o.repository.ProductsManageRepository;
import com.one.o2o.repository.ProductsOverdueRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

interface ProductsManageInterface {
    Response regist(ProductsDto productsDto);
    Response findAllOverdueList(int pageNumber, int pageSize);
}

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductsManageService implements ProductsManageInterface {

    private final ProductsManageRepository productsManageRepository;
    private final ProductsOverdueRepository productsOverdueRepository;
    @Transactional
    public Response regist(ProductsDto productsDto) {
        Response response = new Response(200, "물품 등록 완료");
        productsManageRepository.save(new Product(productsDto));
        return response;
    }

    @Override
    public Response findAllOverdueList(int pageNumber, int pageSize) {
        Response response = new Response(200, "연체 목록 가져오기 완료");
        Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
        Page<Rent> overduePage = productsOverdueRepository.findActiveRentsWithDetails(pageable);
        Map<String, Object> map = new HashMap<>();
        List<OverdueDto> rentsList = new ArrayList<>();

        for (Rent rent : overduePage) {
            // DTO 변환
            List<RentLog> rentLogs = rent.getRentLogs();
            List<ProductsOverdueDto> products = new ArrayList<>();
            for (RentLog rentlog : rentLogs) {
                Product nowProduct = rentlog.getProduct();
                log.info("status" + rentlog.getStatusId());
                // 여기서 status를 정리 해야 함
                Map<Integer, StatusDto> status = new HashMap<>();
                status.put(1, new PageInfoDto(1, 1, 20L));
                products.add(ProductsOverdueDto.builder()
                        .productId(nowProduct.getProductId())
                        .productNm(nowProduct.getProductNm())
                        .lockerBody("1층 사물함")
                        .lockerLoc("1단 3연")
                        .productCnt(1)
                        .status(status)
                        .build()
                );
            }
            // 상태를 저장했으면 status에
            OverdueDto overdueDto = OverdueDto.builder()
                    .userId(rent.getUserId())
//                    .userNm(rent.getUserNm())  // Rent 객체에 userNm 필드가 있어야 함
                    .rentId(rent.getId())
                    .rentDt(rent.getStartDt())
                    .dueDt(rent.getDueDt())
                    .products(products)
                    .isLate(true)
                    .build();
            rentsList.add(overdueDto);


            // 로그 출력
//            log.info("Created DTO: userId=" + productsOverdueDto.getUserId() +
////                    ", userNm=" + productsOverdueDto.getUserNm() +
//                    ", rentId=" + productsOverdueDto.getRentId() +
//                    ", rentDt=" + productsOverdueDto.getRentDt() +
//                    ", dueDt=" + productsOverdueDto.getDueDt());
        }

        map.put("rents", rentsList);
        map.put("pages", new PageInfoDto(
                overduePage.getNumber() + 1,
                overduePage.getTotalPages(),
                overduePage.getTotalElements())
        );
        response.setData(map);
        return response;
    }

}
