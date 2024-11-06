package com.example.allcoverproject.controller;

import com.example.allcoverproject.dto.request.club.AddClubReqDto;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.service.club.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class ClubController {

    private final ClubService clubService;

    @PostMapping(value = {"", "/"})
    public ResponseEntity<CodeMessageRespDto> addClub(AddClubReqDto addClubReqDto) {
        ResponseEntity<CodeMessageRespDto> responseBody = clubService.addClub(addClubReqDto);
        return responseBody;
    }
}
