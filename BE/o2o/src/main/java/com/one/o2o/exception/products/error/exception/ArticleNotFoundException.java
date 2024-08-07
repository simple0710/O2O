package com.one.o2o.exception.products.error.exception;

import com.one.o2o.exception.products.error.ErrorCode;

public class ArticleNotFoundException extends NotFoundException {
    public ArticleNotFoundException() {
        super(ErrorCode.ARTICLE_NOT_FOUND);
    }
}
