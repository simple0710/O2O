package com.one.o2o.service;

import com.one.o2o.dto.ProductSavedEvent;
import com.one.o2o.dto.common.PageInfoDto;
import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.locker.LockerUpdateDto;
import com.one.o2o.dto.products.ProductsDto;
import com.one.o2o.dto.products.manage.OverdueDto;
import com.one.o2o.dto.products.manage.ProductsOverdueDto;
import com.one.o2o.dto.products.manage.OverdueStatusDto;
import com.one.o2o.entity.File;
import com.one.o2o.entity.Product;
import com.one.o2o.entity.Rent;
import com.one.o2o.entity.RentLog;
import com.one.o2o.event.ProductSavedEventListener;
import com.one.o2o.exception.products.error.exception.ArticleNotFoundException;
import com.one.o2o.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.*;

interface ProductsManageInterface {
    Response saveProduct(List<MultipartFile> files, ProductsDto productsDto) throws IOException;
    Response saveProduct(List<MultipartFile> files, Integer productsId, Integer userId) throws Exception;
    Response findAllOverdueList(int pageNumber, int pageSize);
    // 키오스크에서 물품 등록
    Integer saveProductFromKiosk(LockerUpdateDto lockerUpdateDto, Integer userId);
}

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductsManageService implements ProductsManageInterface {

    @Value("${upload.path.products}")
    private String uploadPath;

    private final ProductsManageRepository productsManageRepository;
    private final ProductsOverdueRepository productsOverdueRepository;
    private final UserRepository userRepository;
    private final StatusRepository statusRepository;
    private final FileRepository fileRepository;
    private final ProductSavedEventListener productSavedEventListener;

    @Transactional
    public Response saveProduct(List<MultipartFile> files, ProductsDto productsDto) throws IOException {
        if (files != null && !files.isEmpty()) {
            Integer productsId = productsManageRepository.save(new Product(productsDto)).getProductId();
            saveProduct(files, productsId, productsDto.getUserId());
        }
        return new Response(200, "성공적으로 저장되었습니다.");
    }

    @Transactional
    public Response saveProduct(List<MultipartFile> files, Integer productsId, Integer userId) throws IOException {

        Response response = new Response(HttpStatus.OK.value(), "이미지 저장 완료");
        try {
            // 저장할 디렉토리 경로
            Path directoryPath = Paths.get(uploadPath);

            // 디렉토리가 없다면 생성
            if (Files.notExists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }
            LocalDateTime now = LocalDateTime.now();

            // 파일 리스트 저장
            for (MultipartFile file : files) {
                // UUID 이름
                String newFileName = UUID.randomUUID().toString() + file.getOriginalFilename();

                Path path = Paths.get(uploadPath + newFileName);

                if (!file.isEmpty()) {
                    // 경로에 파일 저장
                    Files.write(path, file.getBytes());

                    // DB에 파일 정보 저장
                    File fileEntity = File.builder()
                            .userId(userId)
                            .type(file.getContentType())
                            .name(newFileName)
                            .createdAt(now)
                            .build();
                    Integer fileId = (Integer) fileRepository.save(fileEntity).getId();

                    // File Images에 제품과의 연관관계 저장
                    ProductSavedEvent event = ProductSavedEvent.builder()
                            .fileId(fileId)
                            .productId(productsId)
                            .build();
                    productSavedEventListener.handleProductSavedEvent(event);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("파일 저장 중 오류가 발생했습니다.", e);
        }
        return response;
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

    @Override
    @Transactional
    public Integer saveProductFromKiosk(LockerUpdateDto lockerUpdateDto, Integer userId){
        Product product = new Product();
        product.setProductNm(lockerUpdateDto.getProductNm());
        product.setUserId(userId);
        return productsManageRepository.save(product).getProductId();
    }
}
