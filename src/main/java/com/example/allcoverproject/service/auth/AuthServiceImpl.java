package com.example.allcoverproject.service.auth;


import com.example.allcoverproject.dto.MemberReqDto;
import com.example.allcoverproject.dto.SignInReqDto;
import com.example.allcoverproject.entity.Member;
import com.example.allcoverproject.provider.JwtProvider;
import com.example.allcoverproject.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public String signUp(MemberReqDto memberReqDto) {

        // 9/4 1:27
        try {

            String memberId = memberReqDto.getEmail();
            boolean isExistedId = memberRepository.existsByEmail(memberId);
            if (isExistedId) return "존재하는 아이디";

            String password = memberReqDto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);

            memberReqDto.setPassword(encodedPassword);

            Member member = new Member(memberReqDto);
            memberRepository.save(member);

            return "회원가입 완료";

        } catch (Exception e) {
            e.printStackTrace();
            return "예외발생!";
        }
    }

    @Override
    public String signIn(SignInReqDto signInReqDto) {

        try {

            String memberEmail = signInReqDto.getEmail();
            String password = signInReqDto.getPassword();
            Member memberByEmail = memberRepository.findMemberByEmail(memberEmail);
            if(memberByEmail == null) return "로그인 정보가 일치하지 않습니다.";

            boolean matches = passwordEncoder.matches(password, memberByEmail.getPassword());
            if (!matches) return "로그인 정보가 일치하지 않습니다.";

            String token = jwtProvider.create(memberEmail);

            return token;

        } catch (Exception e) {
            e.printStackTrace();
            return "예외 발생!";
        }
    }
}
