package com.one.o2o.event;

import com.one.o2o.dto.ProductSavedEvent;
import com.one.o2o.entity.Files;
import com.one.o2o.entity.Products;
import com.one.o2o.entity.ProductImgs;
import com.one.o2o.repository.FileRepository;
import com.one.o2o.repository.ProductImagesRepository;
import com.one.o2o.repository.ProductsManageRepository;
import com.one.o2o.utils.ProductImgsId;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ProductSavedEventListener {

    @Autowired
    private ProductImagesRepository productImagesRepository;

    @Autowired
    private ProductsManageRepository productsManageRepository;

    @Autowired
    private FileRepository fileRepository;

    @EventListener
    @Transactional
    public void handleProductSavedEvent(ProductSavedEvent event) {
        Integer productId = event.getProductId();
        Integer fileId = event.getFileId();

        // 데이터베이스에서 실제 Product와 Files 객체를 조회합니다.
        Products products = productsManageRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Products not found"));
        Files file = fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("Files not found"));

        // ProductImgsId 객체 생성
        ProductImgsId productImgsId = new ProductImgsId(productId, fileId);

        // ProductImgs 엔티티를 생성하고 저장합니다.
        ProductImgs productImages = ProductImgs
                .builder()
                .id(productImgsId)
                .products(products)
                .file(file)
                .build();

        productImagesRepository.save(productImages);
    }

}
