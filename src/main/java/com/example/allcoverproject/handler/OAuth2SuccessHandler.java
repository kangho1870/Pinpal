package com.example.allcoverproject.handler;

import com.example.allcoverproject.common.object.CustomOAuth2User;
import com.example.allcoverproject.entity.Member;
import com.example.allcoverproject.repository.member.MemberRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

// OAuth2 인증 서비스 로직이 정상적으로 완료되었을 때 실행할 핸들러
// SimplerUrlAuthenticationSuccessHandler 클래스 확장
// response 처리 담당
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                                                        // OAuth2UserServiceImpl 클래스에서 넘어오는 정보임
        CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = customOAuth2User.getAttributes();
        boolean existed = customOAuth2User.isExisted();


        // 회원가입이 되어있을경우
        if(existed) {
            Member memberByEmail = memberRepository.findMemberByEmail(customOAuth2User.getName());
            memberByEmail.setProfile((String) attributes.get("profileImageUrl"));
            System.out.println(attributes.get("profileImageUrl"));
            memberRepository.save(memberByEmail);
            String accessToken = (String) attributes.get("accessToken");
            response.sendRedirect("http://192.168.35.151:3000/sns-success?access_token=" + accessToken + "&expiration=14400");
        }
        else {
            String snsId = (String) attributes.get("snsId");
            String joinPath = (String) attributes.get("joinPath");
            String profileImageUrl = (String) attributes.get("profileImageUrl");
            response.sendRedirect("http://192.168.35.151:3000/auth?snsId=" + snsId + "&joinPath=" + joinPath + "&profileImageUrl=" + profileImageUrl);
        }
    }
}
