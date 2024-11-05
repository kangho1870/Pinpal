package com.example.allcoverproject.repository.clubDtl;

import com.example.allcoverproject.entity.ClubDtl;

import java.util.List;

public interface ClubDtlCustomRepository {
    public ClubDtl getClubDtlByClubIdAndMemberId(Long clubId, Long memberId);
    public List<ClubDtl> getClubDtlByClubMstId(Long clubId);
}
