package com.example.allcoverproject.service;

import com.example.allcoverproject.dto.MemberRespDto;
import com.example.allcoverproject.dto.ScoreboardRespDto;

import java.util.List;
import java.util.Map;


public interface ScoreboardService {

    public List<ScoreboardRespDto> getMembers(Long gameId, Long clubId) throws Exception;
    public boolean joinGame(Long gameId, Long memberId) throws Exception;
    public void joinSideGame(Long gameId, Long memberId, String sideType) throws Exception;
    public boolean joinConfirmedGame(Long gameId, Long memberId, String confirmedCode) throws Exception;
}
