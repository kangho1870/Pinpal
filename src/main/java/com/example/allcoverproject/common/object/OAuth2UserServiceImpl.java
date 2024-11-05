package com.example.allcoverproject.common.object;

import com.example.allcoverproject.entity.Member;
import com.example.allcoverproject.provider.JwtProvider;
import com.example.allcoverproject.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
// OAuth2를 통해서 클라이언트 정보를 받은 후 진행할 비즈니스로직을 작성하는 서비스
// 반드시 DefaultOAuth2UserService 클래스를 확장해야 함
@RequiredArgsConstructor
public class OAuth2UserServiceImpl extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;

    // OAuth2 인증 정보를 받고 실행할 비즈니스 로직 메서드
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
                                // 부모 클래스가 가지고있는 loadUser메소드를 사용함
        OAuth2User oAuth2User = super.loadUser(userRequest);
                                // 어떤 인증서버인지 그 인증서버의 이름을 반환
        String registration = userRequest.getClientRegistration().getClientName().toLowerCase();

        String snsId = getAttributes(oAuth2User, registration).get("snsId");
        String profileImageUrl = getAttributes(oAuth2User, registration).get("profileImageUrl");

        Member member = memberRepository.findBySnsIdAndJoinPath(snsId, registration);

        CustomOAuth2User customOAuth2User = null;

        if(member == null) {
            Map<String, Object> attributes = new HashMap<>();
            attributes.put("snsId", snsId);
            attributes.put("joinPath", registration);
            attributes.put("profileImageUrl", profileImageUrl);
            customOAuth2User = new CustomOAuth2User(snsId, attributes, false);
        } else {
            String memberId = member.getEmail();
            String token = jwtProvider.create(memberId);

            Map<String, Object> attributes = new HashMap<>();
            attributes.put("accessToken", token);
            attributes.put("profileImageUrl", profileImageUrl);
            customOAuth2User = new CustomOAuth2User(memberId, attributes, true);
        }

        return customOAuth2User;
    }

    private Map<String, String> getAttributes(OAuth2User oAuth2User, String registration) {
        Map<String, String> attributes = new HashMap<>();
        String snsId = null;
        String profileImageUrl = null;
        if(registration.equals("kakao")) {
            Map<String, Object> kakaoAccount = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
            Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
            profileImageUrl = (String) profile.get("profile_image_url");

            attributes.put("profileImageUrl", profileImageUrl);

            snsId = oAuth2User.getName();
            attributes.put("snsId", snsId);
        }

        return attributes;
    }

}
