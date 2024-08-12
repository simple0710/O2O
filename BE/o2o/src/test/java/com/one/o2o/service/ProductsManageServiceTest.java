package com.one.o2o.service;

import com.one.o2o.dto.ProductSavedEvent;
import com.one.o2o.dto.common.Response;
import com.one.o2o.dto.products.ProductsDto;
import com.one.o2o.entity.Files;
import com.one.o2o.entity.Products;
import com.one.o2o.event.ProductSavedEventListener;
import com.one.o2o.exception.user.UserErrorCode;
import com.one.o2o.exception.user.UserException;
import com.one.o2o.exception.products.ProductErrorCode;
import com.one.o2o.exception.products.ProductException;
import com.one.o2o.repository.FileRepository;
import com.one.o2o.repository.ProductsManageRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class ProductsManageServiceTest {

    @Autowired
    private ProductsManageService productsManageService;

    @MockBean
    private ProductsManageRepository productsManageRepository;

    @MockBean
    private FileRepository fileRepository;

    @MockBean
    private ProductSavedEventListener productSavedEventListener;

    @Value("${upload.path.products}")
    private String uploadPath;


    @Test
    // 물품 등록 성공
    void saveProduct() throws IOException {
        // Given: 초기 설정
        List<MultipartFile> files = Collections.singletonList(
                new MockMultipartFile("file", "testfile.jpg", "image/jpeg", "test".getBytes())
        );
        ProductsDto productsDto = ProductsDto.builder()
                .productNm("가위")
                .productDet("평범한 가위")
                .userId(1)
                .build();

        // Mock behavior
        when(productsManageRepository.save(any(Products.class)))
                .thenReturn(Products.builder().productId(1).build()); // Mock된 Product ID 반환
        when(fileRepository.save(any(Files.class)))
                .thenReturn(Files.builder().id(1).build()); // Mock된 File ID 반환
        doNothing().when(productSavedEventListener).handleProductSavedEvent(any(ProductSavedEvent.class));

        when(productsManageRepository.existsById(1)).thenReturn(true);

        // When: 메서드 호출
        Response response = productsManageService.saveProduct(files, productsDto);

        // Then: 예상 결과와 비교
        assertEquals(200, response.getStatus(), "물품 등록 성공시 200 메세지 출력");
        assertEquals("성공적으로 저장되었습니다.", response.getMessage(), "물품 등록 성공시 성공 메세지 출력");
        assertTrue(productsManageRepository.existsById(1));
        // 추가 검증: 파일이 실제로 저장되었는지, Event가 발생했는지 확인
        verify(productsManageRepository, times(1)).save(any(Products.class));
        verify(fileRepository, times(1)).save(any(Files.class));
        verify(productSavedEventListener, times(1)).handleProductSavedEvent(any(ProductSavedEvent.class));
    }

    @Test
    void saveProduct_withMissingName_shouldThrowException() throws IOException {
        // Given: 초기 설정
        List<MultipartFile> files = Collections.singletonList(
                new MockMultipartFile("file", "testfile.jpg", "image/jpeg", "test".getBytes())
        );
        ProductsDto productsDto1 = ProductsDto.builder()
//                .productNm("")
                .productDet("물품 설명1")
                .userId(1)
                .build();
        ProductsDto productsDto2 = ProductsDto.builder()
                .productNm("")
                .productDet("물품 설명2")
                .userId(1)
                .build();

        // Mock behavior
        when(productsManageRepository.save(any(Products.class)))
                .thenReturn(Products.builder().productId(1).build()); // Mock된 Product ID 반환
        when(fileRepository.save(any(Files.class)))
                .thenReturn(Files.builder().id(1).build()); // Mock된 File ID 반환
        doNothing().when(productSavedEventListener).handleProductSavedEvent(any(ProductSavedEvent.class));

        // When: 메서드 호출 및 예외 검증
        ProductException thrownException1 = assertThrows(ProductException.class, () -> {
           productsManageService.saveProduct(files, productsDto1);
        });

        ProductException thrownException2 = assertThrows(ProductException.class, () -> {
            productsManageService.saveProduct(files, productsDto2);
        });

        // Then: 예상 결과와 비교
        assertEquals(ProductErrorCode.PRODUCT_NAME_MISSING, thrownException1.getErrorCode(), "1-1. 물품 등록 시 이름 누락의 경우 error code 일치성 확인");
        assertEquals("제품 이름이 누락되었습니다.", thrownException1.getMessage(), "1-2. 물품 등록 시 이름 누락의 경우 실패 메세지 출력");
        assertEquals(400, thrownException1.getErrorCode().getStatus(), "1-3. 물품 등록 시 이름 누락의 경우 상태 번호 출력");

        assertEquals(ProductErrorCode.PRODUCT_NAME_MISSING, thrownException2.getErrorCode(), "2-1. 물품 등록 시 이름 누락의 경우 error code 일치성 확인");
        assertEquals("제품 이름이 누락되었습니다.", thrownException2.getMessage(), "2-2. 물품 등록 시 이름 누락의 경우 실패 메세지 출력");
        assertEquals(400, thrownException2.getErrorCode().getStatus(), "2-3. 물품 등록 시 이름 누락의 경우 상태 번호 출력");
    }

    @Test
    void saveProduct_withMissingUserId_shouldThrowException() throws IOException {
        // Given: 초기 설정
        List<MultipartFile> files = Collections.singletonList(
                new MockMultipartFile("file", "testfile.jpg", "image/jpeg", "test".getBytes())
        );
        ProductsDto productsDto = ProductsDto.builder()
                .productNm("물품")
                .productDet("물품 설명1")
//                .userId(1111111111)
                .build();

        // Mock behavior
        when(productsManageRepository.save(any(Products.class)))
                .thenReturn(Products.builder().productId(1).build()); // Mock된 Product ID 반환
        when(fileRepository.save(any(Files.class)))
                .thenReturn(Files.builder().id(1).build()); // Mock된 File ID 반환
        doNothing().when(productSavedEventListener).handleProductSavedEvent(any(ProductSavedEvent.class));

        // When: 메서드 호출 및 예외 검증
        UserException thrownException = assertThrows(UserException.class, () -> {
            productsManageService.saveProduct(files, productsDto);
        });

        // Then: 예상 결과와 비교
        assertEquals(UserErrorCode.USER_ID_MISSING, thrownException.getErrorCode(), "1-1. 유저 Id 누락의 경우 error code 일치성 확인");
        assertEquals("사용자 ID가 올바르게 입력되지 않았습니다.", thrownException.getMessage(), "1-2. 물품 등록 시 이름 누락의 경우 실패 메세지 출력");
        assertEquals(400, thrownException.getErrorCode().getStatus(), "1-3. 물품 등록 시 이름 누락의 경우 상태 번호 출력");
    }

    @Test
    void findAllOverdueList() {
    }

    @Test
    void saveProductFromKiosk() {
    }
}