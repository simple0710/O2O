package com.one.o2o.validator;

import com.one.o2o.exception.common.CommonErrorCode;
import com.one.o2o.exception.common.CommonException;
import org.springframework.stereotype.Component;

import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;

@Component
public class URLValidator {

    public void validateUrlForm(String url) {
        if (url != null && !url.isEmpty()) {
            try {
                new URL(url).toURI();
            } catch (MalformedURLException | URISyntaxException e) {
                throw new CommonException(CommonErrorCode.URL_FORMAT_INVALID);
            }
        }
    }
}
