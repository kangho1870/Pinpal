package com.example.allcoverproject.controller;

import com.example.allcoverproject.dto.request.club.AddClubReqDto;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.clubDtl.GetCeremonyRespDto;
import com.example.allcoverproject.dto.response.clubDtl.GetClubDtlRespDto;
import com.example.allcoverproject.dto.response.clubMst.GetClubMstRespDto;
import com.example.allcoverproject.service.club.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/club")
@RequiredArgsConstructor
public class MyClubController {

    private final ClubService clubService;

    @GetMapping("{clubId}")
    public ResponseEntity<? super GetClubMstRespDto> getClubInfo(@PathVariable Long clubId) {
        ResponseEntity<? super GetClubMstRespDto> responseBody = clubService.getClubData(clubId);
        return responseBody;
    }

    @PostMapping("/update-avg")
    public ResponseEntity<CodeMessageRespDto> updateClubAvg(@RequestBody Map<String, List<Object>> clubAvg) {
        ResponseEntity<CodeMessageRespDto> responseBody = clubService.updateOfMembersAvg(clubAvg);
        return responseBody;
    }

    @GetMapping("/home")
    public ResponseEntity<? super GetClubDtlRespDto> getMemberList(@RequestParam Long clubId) {
        ResponseEntity<? super GetClubDtlRespDto> responseBody = clubService.getMemberList(clubId);
        return responseBody;
    }

    @PostMapping(value = {"", "/"})
    public ResponseEntity<CodeMessageRespDto> addClub(@RequestBody AddClubReqDto addClubReqDto) {
        System.out.println("addClubReqDto = " + addClubReqDto.getMemberId());
        ResponseEntity<CodeMessageRespDto> responseBody = clubService.addClub(addClubReqDto);
        return responseBody;
    }

    @GetMapping("/ceremony")
    public ResponseEntity<?> getCeremony(@RequestParam Long clubId) {
        ResponseEntity<? super GetCeremonyRespDto> responseBody = clubService.getCeremonyList(clubId);
        return responseBody;
    }
}
