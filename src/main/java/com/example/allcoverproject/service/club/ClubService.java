package com.example.allcoverproject.service.club;

import com.example.allcoverproject.dto.response.clubDtl.GetCeremonyRespDto;
import com.example.allcoverproject.dto.response.clubDtl.GetClubDtlRespDto;
import org.springframework.http.ResponseEntity;

public interface ClubService {
    public ResponseEntity<? super GetClubDtlRespDto> getMemberList(Long clubId);
    public ResponseEntity<? super GetCeremonyRespDto> getCeremonyList(Long clubId);
}
