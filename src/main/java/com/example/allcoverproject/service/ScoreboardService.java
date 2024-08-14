package com.example.allcoverproject.service;

import com.example.allcoverproject.dto.MemberRespDto;

import java.util.List;
import java.util.Map;


public interface ScoreboardService {

    public List<MemberRespDto> getMembers(Long gameId, Long clubId) throws Exception;
    public boolean joinGame(Long gameId, Long memberId) throws Exception;
    public Map<String, Object> getSideStatus(Long gameId, Long memberId) throws Exception;
    public void joinSideGame(Long gameId, Long memberId, String sideType) throws Exception;
    public boolean getConfirmedJoinStatus (Long gameId, Long memberId) throws Exception;
    public boolean joinConfirmedGame(Long gameId, Long memberId, String confirmedCode) throws Exception;
}
