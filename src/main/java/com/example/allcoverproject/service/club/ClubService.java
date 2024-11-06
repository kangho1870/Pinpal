package com.example.allcoverproject.service.club;

import com.example.allcoverproject.dto.request.club.AddClubReqDto;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.clubDtl.GetCeremonyRespDto;
import com.example.allcoverproject.dto.response.clubDtl.GetClubDtlRespDto;
import com.example.allcoverproject.dto.response.clubMst.GetClubMstRespDto;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface ClubService {
    public ResponseEntity<? super GetClubDtlRespDto> getMemberList(Long clubId);
    public ResponseEntity<? super GetCeremonyRespDto> getCeremonyList(Long clubId);
    public ResponseEntity<CodeMessageRespDto> addClub(AddClubReqDto addClubReqDto);
    public ResponseEntity<? super GetClubMstRespDto> getClubData(Long clubId);
    public ResponseEntity<CodeMessageRespDto> updateOfMembersAvg(Map<String, List<Object>> map);
}
