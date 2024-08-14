package com.example.allcoverproject.repository.clubDtl;

import com.example.allcoverproject.entity.ClubDtl;

public interface ClubDtlCustomRepository {
    public ClubDtl getClubDtlByClubIdAndMemberId(Long clubId, Long memberId);
}
