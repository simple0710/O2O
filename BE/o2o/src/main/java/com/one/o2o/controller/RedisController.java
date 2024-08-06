package com.one.o2o.controller;

import com.one.o2o.dto.redis.ApiResponse;
import com.one.o2o.dto.redis.RedisDto;
import com.one.o2o.service.RedisServiceImpl;
import com.one.o2o.utils.SuccessCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Redis 동작 Controller
 *
 * @author : lee
 * @fileName : RedisController
 * @since : 3/29/24
 */
@RestController
@RequestMapping("/api/v1/redis")
public class RedisController {

    private final RedisServiceImpl redisService;

    @Autowired
    public RedisController(RedisServiceImpl redisService) {
        this.redisService = redisService;
    }

    /**
     * Redis의 값을 조회합니다.
     *
     * @param redisDto
     * @return
     */@GetMapping("/getValue")
    public ResponseEntity<ApiResponse<Object>> getValue(@RequestBody RedisDto redisDto) {
        String result = redisService.getValue(redisDto.getKey());
        ApiResponse<Object> ar = ApiResponse.builder()
                .result(result)
                .resultCode(SuccessCode.SELECT.getStatus())
                .resultMsg(SuccessCode.SELECT.getMessage())
                .build();
        return new ResponseEntity<>(ar, HttpStatus.OK);
    }

    /**
     * Redis의 값을 추가/수정합니다.
     *
     * @param redisDto
     * @return
     */@PostMapping("/setValue")
    public ResponseEntity<ApiResponse<Object>> setValue(@RequestBody RedisDto redisDto) {
        System.out.println(redisDto.getKey());
        int result = 0;

        if (redisDto.getDuration() == null) {
            result = redisService.setValues(redisDto.getKey(), redisDto.getValue());
        } else {
            result = redisService.setValues(redisDto.getKey(), redisDto.getValue(), redisDto.getDuration());
        }
        ApiResponse<Object> ar = ApiResponse.builder()
                .result(result)
                .resultCode(SuccessCode.SELECT.getStatus())
                .resultMsg(SuccessCode.SELECT.getMessage())
                .build();
        return new ResponseEntity<>(ar, HttpStatus.OK);
    }

    /**
     * Redis의 key 값을 기반으로 row를 제거합니다.
     *
     * @param redisDto
     * @return
     */@PostMapping("/deleteValue")
    public ResponseEntity<ApiResponse<Object>> deleteRow(@RequestBody RedisDto redisDto) {
        int result = redisService.deleteValue(redisDto.getKey());
        ApiResponse<Object> ar = ApiResponse.builder()
                .result(result)
                .resultCode(SuccessCode.SELECT.getStatus())
                .resultMsg(SuccessCode.SELECT.getMessage())
                .build();
        return new ResponseEntity<>(ar, HttpStatus.OK);
    }

    /**
     * Redis의 key 값에 만료 시간을 설정합니다.
     *
     * @param redisDto RedisDto 객체 (key와 만료 시간을 포함)
     * @return API 응답
     */
    @PostMapping("/setExpiration")
    public ResponseEntity<ApiResponse<Object>> setExpiration(@RequestBody RedisDto redisDto) {
        // 만료 시간을 설정하려면 값도 필요하므로, 해당 값을 포함해 저장합니다.
        redisService.setValues(redisDto.getKey(), redisDto.getValue(), redisDto.getDuration());
        ApiResponse<Object> ar = ApiResponse.builder()
                .result("OK")
                .resultCode(SuccessCode.UPDATE.getStatus())
                .resultMsg(SuccessCode.UPDATE.getMessage())
                .build();
        return new ResponseEntity<>(ar, HttpStatus.OK);
    }
}
