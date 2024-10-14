package com.example.allcoverproject.service.scoreboard;

import com.example.allcoverproject.dto.ScoreboardReqDto;
import com.example.allcoverproject.dto.ScoreboardRespDto;

import java.util.List;
import java.util.Map;


public interface ScoreboardService {

    public List<ScoreboardRespDto> getMembers(Long gameId, Long clubId) throws Exception;
    public boolean joinGame(Long gameId, Long memberId) throws Exception;
    public void joinSideGame(Long gameId, Long memberId, String sideType) throws Exception;
    public boolean joinConfirmedGame(Long gameId, Long memberId, String confirmedCode) throws Exception;
    public void setGrade(Map<String, List<Map<String, Object>>> members) throws Exception;
    public void setTeam(Map<String, List<Map<String, Object>>> members) throws Exception;
    public void saveScores(Long memberId, Long gameId, ScoreboardReqDto scores) throws Exception;
    public void stopScoreCounting(Long gameId) throws Exception;
}
