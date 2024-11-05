package com.example.allcoverproject.service.auth;

import com.example.allcoverproject.dto.request.MemberReqDto;
import com.example.allcoverproject.dto.request.SignInReqDto;
import com.example.allcoverproject.dto.request.SignUpReqDto;
import com.example.allcoverproject.dto.request.auth.IdCheckReqDto;
import com.example.allcoverproject.dto.response.CMRespDto;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.auth.SignInRespDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<CodeMessageRespDto> idCheck(IdCheckReqDto idCheckReqDto);
    ResponseEntity<CodeMessageRespDto> signUp(SignUpReqDto signUpReqDto);
    ResponseEntity<? super SignInRespDto> signIn(SignInReqDto signInReqDto);
}
