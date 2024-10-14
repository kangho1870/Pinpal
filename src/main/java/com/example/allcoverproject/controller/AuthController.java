package com.example.allcoverproject.controller;

import com.example.allcoverproject.dto.MemberReqDto;
import com.example.allcoverproject.dto.MemberRespDto;
import com.example.allcoverproject.dto.SignInReqDto;
import com.example.allcoverproject.entity.Member;
import com.example.allcoverproject.service.auth.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("")
    public MemberRespDto getAuth(@AuthenticationPrincipal Member member) {
        MemberRespDto memberRespDto = new MemberRespDto();
        if(member != null) {
            memberRespDto = member.toMemberDto();
        }

        return memberRespDto;
    }

    @PostMapping("/sign-up")
    public String signUp(@RequestBody MemberReqDto memberReqDto) {
        String response = authService.signUp(memberReqDto);

        return response;
    }

    @PostMapping("/sign-in")
    public String signIn(@RequestBody SignInReqDto signInReqDto) {

        String response = authService.signIn(signInReqDto);
        return response;
    }
}
