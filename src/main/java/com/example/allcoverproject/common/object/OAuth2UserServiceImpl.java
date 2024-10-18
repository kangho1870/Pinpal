package com.example.allcoverproject.service.object;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
// OAuth2를 통해서 클라이언트 정보를 받은 후 진행할 비즈니스로직을 작성하는 서비스
// 반드시 DefaultOAuth2UserService 클래스를 확장해야 함
public class OAuth2UserServiceImpl extends DefaultOAuth2UserService {

    // OAuth2 인증 정보를 받고 실행할 비즈니스 로직 메서드
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
                                // 부모 클래스가 가지고있는 loadUser메소드를 사용함
        OAuth2User oAuth2User = super.loadUser(userRequest);
                                // 어떤 인증서버인지 그 인증서버의 이름을 반환
        String registration = userRequest.getClientRegistration().getClientName();

        return new CustomOAuth2User(oAuth2User.getName(), oAuth2User.getAttributes());
    }
}
