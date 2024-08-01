package com.one.o2o.service;

import com.one.o2o.dto.common.PageInfoDto;
import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.products.ProductsDto;
import com.one.o2o.dto.products.manage.OverdueDto;
import com.one.o2o.dto.products.manage.ProductsOverdueDto;
import com.one.o2o.dto.products.manage.OverdueStatusDto;
import com.one.o2o.entity.Product;
import com.one.o2o.entity.Rent;
import com.one.o2o.entity.RentLog;
import com.one.o2o.exception.products.error.exception.ArticleNotFoundException;
import com.one.o2o.repository.ProductsManageRepository;
import com.one.o2o.repository.ProductsOverdueRepository;
import com.one.o2o.repository.StatusRepository;
import com.one.o2o.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

interface ProductsManageInterface {
    Product saveProduct(ProductsDto productsDto, MultipartFile file) throws IOException;
    Response findAllOverdueList(int pageNumber, int pageSize);
}

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductsManageService implements ProductsManageInterface {

    @Value("${file.upload.dir}")
    private String uploadDir;
    private final ProductsManageRepository productsManageRepository;
    private final ProductsOverdueRepository productsOverdueRepository;
    private final UserRepository userRepository;
    private final StatusRepository statusRepository;

    @Override
    public Product saveProduct(ProductsDto productsDto, MultipartFile file) throws IOException {
        if (!file.isEmpty()) {
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();;
            Path uploadPath = Paths.get(uploadDir + "/products/" + fileName);

            // 디렉토리가 존재하지 않으면 생성
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Files.copy(file.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);
            productsDto.setProductImg(fileName);
        }
        productsManageRepository.save(new Product(productsDto));
        return null;
    }

    @Override
    public Response findAllOverdueList(int pageNumber, int pageSize) {
        Response response = new Response(200, "연체 목록 가져오기 완료");
        Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
        Page<Rent> overduePage = productsOverdueRepository.findActiveRentsWithDetails(pageable);
        Map<String, Object> map = new HashMap<>();
        List<OverdueDto> rentsList = new ArrayList<>();

        StringBuilder sb = new StringBuilder();
        HashMap<Integer, OverdueStatusDto> rentIdMap = new HashMap<>();
        for (Rent rent : overduePage) {
            List<RentLog> rentLogs = rent.getRentLogs();

            // DTO 변환
            List<ProductsOverdueDto> products = new ArrayList<>();
            int rentCnt = 0;
            for (RentLog rentLog : rentLogs) {
                Product nowProduct = rentLog.getProduct();
                log.info("status" + rentLog.getStatusId());

                // 상태
                Map<Integer, OverdueStatusDto> status = new HashMap<>();
                rentCnt += rentLog.getLogCnt();
                status.put(rentLog.getStatusId(), OverdueStatusDto.builder()
                        .statusNm(statusRepository.findAllByStatusId(rentLog.getStatusId())
                                .orElseThrow(ArticleNotFoundException::new).getStatusNm())
                        .productCnt(rentLog.getLogCnt())
                        .build()
                );
                products.add(ProductsOverdueDto.builder()
                        .productId(nowProduct.getProductId())
                        .productNm(nowProduct.getProductNm())
                        .lockerBody(rentLog.getLocker().getBody().getLockerBodyName())
                        .lockerLoc(rentLog.getLocker().getLockerRow() + "단 " + rentLog.getLocker().getLockerRow() + "연")
                        .productCnt(rentCnt)
                        .status(status)
                        .build()
                );
            }
            System.out.println(sb);
            OverdueDto overdueDto = OverdueDto.builder()
                    .userId(rent.getUserId())
                    .userNm(userRepository.findAllByUserId(rent.getUserId())
                            .orElseThrow(ArticleNotFoundException::new)
                            .getUserNm())
                    .rentId(rent.getId())
                    .rentDt(rent.getStartDt())
                    .dueDt(rent.getDueDt())
                    .products(products)
                    .isLate(true)
                    .build();
            rentsList.add(overdueDto);
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
