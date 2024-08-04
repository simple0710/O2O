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
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

interface ProductsManageInterface {
    Response saveProduct(ProductsDto productsDto) throws IOException;
    Response findAllOverdueList(int pageNumber, int pageSize);
    Response getProductImage(String filename);
}

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductsManageService implements ProductsManageInterface {

    @Value("${file.upload.dir}")
    private String uploadProductsDir;

    private final ProductsManageRepository productsManageRepository;
    private final ProductsOverdueRepository productsOverdueRepository;
    private final UserRepository userRepository;
    private final StatusRepository statusRepository;

    @Override
    public Response saveProduct(ProductsDto productsDto) throws IOException {
        return new Response(
                200,
                "성공적으로 저장되었습니다.",
                productsManageRepository.save(new Product(productsDto)).getProductId()
        );
    }

    public Response getProductImage(String filename) {
        Response response = new Response();
        try {
            Path file = Paths.get(uploadProductsDir + "/products/" + filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() && resource.isReadable()) {
                // MIME 타입을 추측하거나 설정
                String contentType = "image/jpeg"; // 기본값으로 설정, 필요에 따라 변경

                byte[] imageBytes = resource.getInputStream().readAllBytes();
                response.setData(imageBytes);

                response.setStatus(HttpStatus.OK.value());
//                response.setContentType(contentType);
                response.setMessage("이미지가 성공적으로 로드되었습니다.");
            } else {
                response.setStatus(HttpStatus.NOT_FOUND.value());
                response.setMessage("이미지를 찾을 수 없습니다.");
            }
        } catch (MalformedURLException e) {
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("이미지를 읽는 데 실패했습니다.");
        } catch (IOException e) {
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("이미지를 읽는 데 실패했습니다.");
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
