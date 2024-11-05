package com.example.allcoverproject.service.member;

import com.example.allcoverproject.dto.response.member.GetSignInRespDto;
import org.springframework.http.ResponseEntity;

public interface MemberService {

    ResponseEntity<? super GetSignInRespDto> getSignIn(String memberId);
}
