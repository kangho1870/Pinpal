package com.example.allcoverproject.controller;

import com.example.allcoverproject.dto.response.member.GetSignInRespDto;
import com.example.allcoverproject.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/sign-in")
    public ResponseEntity<? super GetSignInRespDto> getSignIn(@AuthenticationPrincipal String memberId) {
        System.out.println("memberId = " + memberId);
        ResponseEntity<? super GetSignInRespDto> response = memberService.getSignIn(memberId);
        return response;
    }
}
