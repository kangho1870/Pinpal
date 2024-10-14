package com.example.allcoverproject.provider;

// JWT:
// - Json Web Token, RFC7519 표준에 정의된 JSON 형식의 문자열을 포함하는 토큰
// - 인증 및 인가
// - 암호화가 되어 있어 클라이언트와 서버 간에 안전한 데이터 전달을 수행할 수 있음
// - 헤더 : 토큰의 유형, 암호화 알고리즘이 지정되어있음
// - 페이로드 : 클라이언트 혹은 서버가 전달하려는 정보가 포함되어 있음
// - 서명 : 헤더와 페이로드를 합쳐서 인코딩하고 비밀키로 암호화한 데이터

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class JwtProvider {

    // 1 방법
    @Value("${jwt.secret}")
    private String secretKey;

    // 2 시스템의 환경변수로 등록하여 사용
    // - OS 자체의 시스템 환경변수에 비밀키를 등록

    public String create(String id) {
        // 1. JWT의 만료일자 및 시간 지정
        Date expiredDate = Date.from(Instant.now().plus(4, ChronoUnit.HOURS));

        // 2. 비밀키 생성
//        String secretKey = "mySecretKeyddawasdawdwadascczcxcsdw123455687";
        // 비밀키는 코드에 직접적으로 작성하지 않고
        // application.yml에 작성하여 사용해야 함


        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        // hmacShaKeyFor 알고리즘을 통해 키를 만듦
        // 이 때 내가 만든 비밀키를 byte로 변환하여 전달해줌

        // 3. JWT 생성
        String jwt = Jwts.builder()
                // 서명 (암호화시 사용할 비밀키와 알고리즘)
                .signWith(key, SignatureAlgorithm.HS256)
                // 페이로드
                // 작성자
                .setSubject(String.valueOf(id))
                // 생성시간 (현재시간)
                .setIssuedAt(new Date())
                // 만료시간
                .setExpiration(expiredDate)
                // 인코드 (압축)
                .compact();

        return jwt;
    }

    public String validate(String jwt) {

        // jwt 검증 결과로 반환되는 payload가 저장될 변수
        Claims claims = null;

        // 비킬키 생성
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        try {
            // 비밀키를 이용하여 jwt를 검증 작업
            claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()// parser 생성
                    .parseClaimsJws(jwt)// 파싱 작업
                    .getBody(); // 파싱 후 claims 값 get
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }
        return claims.getSubject();
    }
}
