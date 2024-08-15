package com.one.o2o.validator;

import com.one.o2o.exception.products.request.ProductRequestErrorCode;
import com.one.o2o.exception.products.request.ProductRequestException;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;

import static com.one.o2o.constants.ProductRequestConstants.MAX_PRODUCT_REQUEST_CONTENT_LENGTH;

@Component
public class ProductRequestValidator {

    public void validateContentLength(String content) throws UnsupportedEncodingException {
        if (content == null) return;
        int bytes = content.getBytes("UTF-8").length;
        if (bytes > MAX_PRODUCT_REQUEST_CONTENT_LENGTH) {
            throw new ProductRequestException(ProductRequestErrorCode.PRODUCT_REQUEST_CONTENT_LENGTH);
        }
    }

    public void validateRejectLength(String content) throws UnsupportedEncodingException {
        if (content == null) return;
        int bytes = content.getBytes("UTF-8").length;
        if (bytes > MAX_PRODUCT_REQUEST_CONTENT_LENGTH) {
            throw new ProductRequestException(ProductRequestErrorCode.PRODUCT_REQUEST_REJECT_CONTENT_LENGTH);
        }
    }
}
