package com.one.o2o.validator;

import com.one.o2o.exception.products.report.ProductReportErrorCode;
import com.one.o2o.exception.products.report.ProductReportException;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;

import static com.one.o2o.constants.ProductReportConstants.MAX_PRODUCT_REPORT_CONTENT_LENGTH;

@Component
public class ProductReportValidator {

    /**
     * 제품 보고서의 내용 길이 검증
     * 내용의 길이가 허용된 최대 길이를 초과하는 경우 오류를 반환
     *
     * @param content 검증할 내용
     */
    public void validateContentLength(String content) throws UnsupportedEncodingException {
        int bytes = content.getBytes("UTF-8").length;
        if (bytes > MAX_PRODUCT_REPORT_CONTENT_LENGTH) {
            throw new ProductReportException(ProductReportErrorCode.PRODUCT_REPORT_CONTENT_LENGTH);
        }
    }
}
