package com.example.allcoverproject.config;

import com.example.allcoverproject.filter.JwtAuthenticationFilter;
import com.example.allcoverproject.handler.OAuth2SuccessHandler;
import com.example.allcoverproject.common.object.OAuth2UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configurable
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final OAuth2UserServiceImpl oAuth2UserService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;


    @Bean
    protected SecurityFilterChain configure(HttpSecurity security) throws Exception {
        security
                // basic 인증 방식 미사용
                .httpBasic(HttpBasicConfigurer::disable)
                // session 미사용 (유지 x)
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // CSRF 취약점 대비 미지정
                .csrf(CsrfConfigurer::disable)
                // CORS 정책 설정
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // URL 패턴 및 HTTP 메서드에 따라 인증 및 인가 여부 지정
                .authorizeHttpRequests((authorizeRequest) ->
                        authorizeRequest
                                // 메인, 로그인 화면은 모든 접근 허용 -> permitAll()
                                .requestMatchers("/api/v1/auth/**", "/oauth2/callback/*","/", "/scoreboard/**").permitAll()
                                // 나머지 요청은 모두 인증을 거쳐야 함
                                .anyRequest().authenticated()
                )
                // 필터 등록
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                // OAuth2 인증 처리
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(oAuth2SuccessHandler)
                        .authorizationEndpoint(endPoint -> endPoint.baseUri("/api/v1/auth/sns-sign-in"))
                        .redirectionEndpoint(endPoint -> endPoint.baseUri("/oauth2/callback/*"))
                        .userInfoEndpoint(endPoint -> endPoint.userService(oAuth2UserService))

                );

        return security.build();
    }

    @Bean
    protected CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
