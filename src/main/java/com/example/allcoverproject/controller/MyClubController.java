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

import java.time.LocalDate;
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

    @PostMapping("/joinClub")
    public ResponseEntity<CodeMessageRespDto> joinClub(@RequestParam Long clubId, @RequestParam Long memberId) {
        ResponseEntity<CodeMessageRespDto> responseBody = clubService.joinClub(clubId, memberId);
        return responseBody;
    }

    @GetMapping("/home")
    public ResponseEntity<? super GetClubDtlRespDto> getMemberList(@RequestParam Long clubId) {
        ResponseEntity<? super GetClubDtlRespDto> responseBody = clubService.getMemberList(clubId);
        return responseBody;
    }

    @PostMapping(value = {"", "/"})
    public ResponseEntity<CodeMessageRespDto> addClub(@RequestBody AddClubReqDto addClubReqDto) {
        ResponseEntity<CodeMessageRespDto> responseBody = clubService.addClub(addClubReqDto);
        return responseBody;
    }

    @GetMapping("/recent-ceremony")
    public ResponseEntity<? super GetCeremonyRespDto> getRecentCeremony(@RequestParam Long clubId) {
        ResponseEntity<? super GetCeremonyRespDto> responseBody = clubService.getRecentCeremonyList(clubId);
        return responseBody;
    }

    @PostMapping("/update-role")
    public ResponseEntity<CodeMessageRespDto> updateRole(@RequestBody  Map<String, Object> data) {
        System.out.println("data = " + data);
        ResponseEntity<CodeMessageRespDto> responseBody = clubService.updateOfMemberRole(data);
        return responseBody;
    }

    @GetMapping("/ceremony")
    public ResponseEntity<? super GetCeremonyRespDto> getCeremony(@RequestParam Long clubId, @RequestParam LocalDate startDate, @RequestParam LocalDate endDate, @RequestParam int gameType) {
        ResponseEntity<? super GetCeremonyRespDto> responseBody = clubService.getCeremonyList(clubId, startDate, endDate, gameType);
        return responseBody;
    }
}
