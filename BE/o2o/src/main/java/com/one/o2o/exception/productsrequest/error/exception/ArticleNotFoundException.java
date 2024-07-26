package com.one.o2o.exception.productsrequest.error.exception;

import com.one.o2o.exception.productsrequest.error.ErrorCode;

public class ArticleNotFoundException extends NotFoundException {
    public ArticleNotFoundException() {
        super(ErrorCode.ARTICLE_NOT_FOUND);
    }
}
