package com.example.allcoverproject.service.auth;

import com.example.allcoverproject.dto.MemberReqDto;
import com.example.allcoverproject.dto.SignInReqDto;

public interface AuthService {
    String signUp(MemberReqDto memberReqDto);
    String signIn(SignInReqDto signInReqDto);
}
