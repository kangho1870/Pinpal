package com.example.allcoverproject.service.auth;


import com.example.allcoverproject.dto.request.SignInReqDto;
import com.example.allcoverproject.dto.request.SignUpReqDto;
import com.example.allcoverproject.dto.request.auth.IdCheckReqDto;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.auth.SignInRespDto;
import com.example.allcoverproject.entity.Member;
import com.example.allcoverproject.provider.JwtProvider;
import com.example.allcoverproject.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<CodeMessageRespDto> idCheck(IdCheckReqDto idCheckReqDto) {
        String userId = idCheckReqDto.getMemberId();

        try {

            boolean existsByEmail = memberRepository.existsByEmail(userId);
            if(existsByEmail) return CodeMessageRespDto.duplicated();

        } catch (Exception e) {
            e.printStackTrace();
            return  CodeMessageRespDto.databaseError();
        }


        return CodeMessageRespDto.success();
    }

    @Override
    public ResponseEntity<CodeMessageRespDto> signUp(SignUpReqDto signUpReqDto) {

        String memberId = signUpReqDto.getMemberId();

        try {

            boolean existsByEmail = memberRepository.existsByEmail(memberId);
            if(existsByEmail) return CodeMessageRespDto.duplicated();

        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }

        try {

            Member member = new Member(signUpReqDto);
            memberRepository.save(member);

        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }

        return CodeMessageRespDto.success();
    }

    @Override
    public ResponseEntity<? super SignInRespDto> signIn(SignInReqDto signInReqDto) {
        String memberId = signInReqDto.getEmail();
        String password = signInReqDto.getPassword();
        String accessToken = null;

        try {

            Member memberByEmail = memberRepository.findMemberByEmail(memberId);
            if(memberByEmail == null) return CodeMessageRespDto.signInFail();

            boolean matches = passwordEncoder.matches(password, memberByEmail.getPassword());
            if(!matches) return CodeMessageRespDto.signInFail();

            accessToken = jwtProvider.create(memberByEmail.getEmail());
            if(accessToken == null) return CodeMessageRespDto.tokenCreateFail();


        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }

        return SignInRespDto.success(accessToken);
    }
}
