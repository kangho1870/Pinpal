package com.example.allcoverproject.service;

import com.example.allcoverproject.dto.MemberRespDto;

import java.util.List;

public interface ScoreboardService {

    public List<MemberRespDto> getMembers(Long gameId) throws Exception;
    public boolean joinGame(Long gameId, Long memberId) throws Exception;
}
