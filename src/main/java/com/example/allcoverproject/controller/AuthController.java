package com.example.allcoverproject.controller;

import com.example.allcoverproject.dto.request.SignUpReqDto;
import com.example.allcoverproject.dto.request.auth.IdCheckReqDto;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.request.SignInReqDto;
import com.example.allcoverproject.dto.response.auth.SignInRespDto;
import com.example.allcoverproject.service.auth.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<CodeMessageRespDto> signUp(@Valid @RequestBody SignUpReqDto signUpReqDto) {
        ResponseEntity<CodeMessageRespDto> response = authService.signUp(signUpReqDto);
        return response;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<? super SignInRespDto> signIn(@Valid @RequestBody SignInReqDto signInReqDto) {
        ResponseEntity<? super SignInRespDto> response = authService.signIn(signInReqDto);
        return response;
    }

    @PostMapping("/id-check")
    public ResponseEntity<CodeMessageRespDto> idCheck(@RequestBody @Valid IdCheckReqDto userId) {
        ResponseEntity<CodeMessageRespDto> response = authService.idCheck(userId);
        return response;
    }

}
