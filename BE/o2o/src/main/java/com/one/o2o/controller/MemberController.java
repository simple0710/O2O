package com.one.o2o.controller;

import com.one.o2o.config.JwtToken;
import com.one.o2o.config.JwtTokenProvider;
import com.one.o2o.dto.User.MemberDto;
import com.one.o2o.dto.SignInDto;
import com.one.o2o.dto.User.MemberLoginDto;
import com.one.o2o.dto.common.Response;
import com.one.o2o.entity.MemberEntity;
import com.one.o2o.service.MemberService;
import com.one.o2o.service.RedisServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.HashMap;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder; // PasswordEncoder 주입
    private final RedisServiceImpl redisService;
    private final JwtTokenProvider jwtTokenProvider;



    /**
     * 회원 등록하는 코드
     *
     * @param memberDto
     * @return ResponseEntity 성공 : true, 실패 : false
     */
    @PostMapping("/regist")
    public ResponseEntity<?> registMember(@RequestBody MemberDto memberDto, HttpServletResponse response){
        log.info("memberDto : " + memberDto);
        memberDto.setIsActive(true);
        memberDto.setIsAdmin(false);
        MemberEntity memberEntity = MemberEntity.toEntity(memberDto);
        // 여기 Entity에서 Dto를 통해서 만드는걸로!
        log.info("전~~~");
        log.info("memberEntity : " + memberEntity);

        // 비밀번호 인코딩
        String encodedPassword = passwordEncoder.encode(memberEntity.getUserPw());
        log.info("encodedPassword : " + encodedPassword);
        memberEntity.setUserPw(encodedPassword); // 인코딩된 비밀번호 설정
        log.info("후~~~");
        log.info("memberEntity : " + memberEntity);
        // 회원가입이 성공하면 return true 실패하면 false 값을 준다!

        return new ResponseEntity<>(memberService.registmember(memberEntity), HttpStatus.OK) ;
    }


    /**
     * 사용자 프로필 정보를 가져오는 코드
     * 서버에게 user-id (PK 값 1, 2, 3) 이런식의 값을 주면 사용자 프로필 정보를 get 해줌!
     *
     * @param userId
     * @return ResponsEntity
     */
    @GetMapping("/profile/{user-id}")
    public ResponseEntity<?> getMemberDetail(@PathVariable("user-id") int userId){
        // 서버에게 user-id (PK 값 1, 2, 3) 이런식의 값을 주면 사용자 프로필 정보를 get 해줌!
        return new ResponseEntity<>(memberService.searchprofile(userId) , HttpStatus.OK) ;
    }

    /**
     * 서버에게 MemberEntity를 주면 그 user-id (PK 값 1, 2, 3)에 따라 해당 사용자의 프로필 정보 변경
     * 일단은 비밀번호랑 전화번호 정도만 바꿀수 있도록 했는데 더 추가하면되긴함!!
     *
     * @param userId
     * @param memberEntity
     * @return ResponseEntity
     * @throws Throwable
     */
    @PutMapping("/profile/{user-id}/edit")
    public ResponseEntity<?> editMemberDetail(@PathVariable("user-id") int userId, @RequestBody MemberDto memberDto) throws Throwable {
        log.info("memberEntity = {}", memberDto);
        return new ResponseEntity<>(memberService.updateprofile(userId, memberDto), HttpStatus.OK) ;
    }


    /**
     * 로그인을 수행하는 코드
     *
     * @param signInDto userLgId, UserPw를 담은 DTO
     * @return response
     */
    @PostMapping({"/login", "/login/"})
    public ResponseEntity<?> signIn(@RequestBody SignInDto signInDto) {
        Response response = new Response(HttpStatus.OK.value(), "로그인에 성공했습니다.");
        log.info("signInDto : " + signInDto);
        String userLgid = signInDto.getUserLgid();
        String userPw = signInDto.getUserPw();
        JwtToken jwtToken = memberService.signIn(userLgid, userPw);
        log.info("request username = {}, password = {}", userLgid, userPw);
        log.info("jwtToken accessToken = {}, refreshToken = {}", jwtToken.getAccessToken(), jwtToken.getRefreshToken());

        MemberEntity memberEntity = memberService.searchprofile_with_lgid(userLgid);

        HashMap<String, MemberLoginDto> map = new HashMap<>();
        map.put("user", MemberLoginDto.builder()
                .userLgid(memberEntity.getUserLgid())
                .userNm(memberEntity.getUserNm())
                .isAdmin(memberEntity.getIsAdmin())
                .userId(memberEntity.getUserId())
                .build()
        );
        response.setData(map);
        Boolean IsTrue = memberService.registmember(memberEntity);
        HttpHeaders headers = new HttpHeaders();
        headers.add("access", jwtToken.getAccessToken());
        headers.add("refresh", jwtToken.getRefreshToken());
        int result = 0;

        result = redisService.setValues(String.valueOf(memberEntity.getUserId()),  jwtToken.getRefreshToken(), Duration.ofSeconds(10000000));
        System.out.println(String.valueOf(memberEntity.getUserId()));
        System.out.println(jwtToken.getRefreshToken());
        System.out.println("result : "+result);

        //ResponseCookigit  respnosecookie
        // 유효기간 설정!
        //쿠키로 ㅁ보낼테니 쿠키로 받아!
        return new ResponseEntity<>(response, headers, HttpStatus.OK);
    }

    @PostMapping("/token/refresh")
    public ResponseEntity<?> refreshAccessToken(Authentication authentication) {
        log.info("authentication : " + authentication);
        // 인증된 사용자 정보 가져오기
        String userId = authentication.getName(); // 사용자 ID 가져오기
        log.info("User ID : " + userId);

        // Redis에서 refresh 토큰 조회
        String refreshToken = redisService.getValue(userId);
        System.out.println(refreshToken);
        if (refreshToken == null) {

            return new ResponseEntity<>(new Response(HttpStatus.UNAUTHORIZED.value(), "유효하지 않은 refresh token입니다."), HttpStatus.UNAUTHORIZED);
        }
//
//        // refresh 토큰을 사용하여 새로운 access 토큰 발급
        JwtToken jwtToken = jwtTokenProvider.generateToken(authentication);
        log.info("jwtToken : " +  jwtToken);
        if (jwtToken == null) {
            return new ResponseEntity<>(new Response(HttpStatus.UNAUTHORIZED.value(), "access token 재발급에 실패했습니다."), HttpStatus.UNAUTHORIZED);
        }
//
//        // 새로운 access 토큰을 포함한 응답
        HttpHeaders headers = new HttpHeaders();
        headers.add("access", jwtToken.getAccessToken());
        headers.add("refresh", refreshToken);

        //int result = redisService.setValues(userId,  jwtToken.getRefreshToken(), Duration.ofSeconds(10000000));
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "access token 재발급 성공"), headers, HttpStatus.OK);
        //return null;
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(Authentication authentication) {
        // 인증된 사용자 정보 가져오기
        String userId = authentication.getName(); // 사용자 ID 가져오기
        log.info("User ID for logout: " + userId);

        // Redis에서 해당 사용자의 리프레시 토큰 삭제
        redisService.deleteValue(userId);

        // 로그아웃 성공 응답
        return new ResponseEntity<>(new Response(HttpStatus.OK.value(), "로그아웃 성공"), HttpStatus.OK);
    }

    @PostMapping("/testte")
    public String test(Authentication authentication){
    authentication.getAuthorities();

    System.out.println(authentication.getAuthorities());
    System.out.println(authentication.getPrincipal().toString());
    return "TYTY";
    }
}
