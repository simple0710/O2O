package com.one.o2o.event;

import com.one.o2o.dto.ProductSavedEvent;
import com.one.o2o.entity.ProductImgs;
import com.one.o2o.repository.ProductImagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ProductSavedEventListener {

    @Autowired
    private ProductImagesRepository productImagesRepository;

    @EventListener
    public void handleProductSavedEvent(ProductSavedEvent event) {
        Integer productId = event.getProductId();
        Integer fileId = event.getFileId();
        ProductImgs productImages = ProductImgs
                .builder()
                .fileId(fileId)
                .productId(productId)
                .build();
        productImagesRepository.save(productImages);
    }
}
