package com.example.allcoverproject.controller;

import com.example.allcoverproject.dto.response.clubMst.GetClubListRespDto;
import com.example.allcoverproject.service.club.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MainController {

    private final ClubService clubService;

    @GetMapping("/home")
    public ResponseEntity<? super GetClubListRespDto> getClubList(@RequestParam int page) {
        ResponseEntity<? super GetClubListRespDto> responseBody = clubService.getClubList(page);
        return responseBody;
    }
}
