package com.example.allcoverproject.controller;

import com.example.allcoverproject.dto.response.clubDtl.GetCeremonyRespDto;
import com.example.allcoverproject.dto.response.clubDtl.GetClubDtlRespDto;
import com.example.allcoverproject.service.club.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/club")
@RequiredArgsConstructor
public class MyClubController {

    private final ClubService clubService;

    @GetMapping("/home")
    public ResponseEntity<? super GetClubDtlRespDto> getMemberList(@RequestParam Long clubId) {
        ResponseEntity<? super GetClubDtlRespDto> responseBody = clubService.getMemberList(clubId);
        return responseBody;
    }

    @GetMapping("/ceremony")
    public ResponseEntity<?> getCeremony(@RequestParam Long clubId) {
        ResponseEntity<? super GetCeremonyRespDto> responseBody = clubService.getCeremonyList(clubId);
        return responseBody;
    }
}
