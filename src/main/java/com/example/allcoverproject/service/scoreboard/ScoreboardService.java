package com.example.allcoverproject.service.scoreboard;

import com.example.allcoverproject.dto.request.scoreboard.ScoreboardReqDto;
import com.example.allcoverproject.dto.request.scoreboard.ScoreboardStopGameReqDto;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.scoreboard.GetScoreboardListRespDto;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;


public interface ScoreboardService {

    public ResponseEntity<? super GetScoreboardListRespDto> getMembers(Long gameId, Long clubId) ;
    public ResponseEntity<CodeMessageRespDto> joinGame(Long gameId, Long memberId);
    public ResponseEntity<CodeMessageRespDto> joinSideGame(Long gameId, Long memberId, String sideType);
    public ResponseEntity<CodeMessageRespDto> joinConfirmedGame(Long gameId, Long memberId, String confirmedCode);
    public ResponseEntity<CodeMessageRespDto> setGrade(Map<String, List<Map<String, Object>>> members);
    public ResponseEntity<CodeMessageRespDto> setTeam(Map<String, List<Map<String, Object>>> members);
    public ResponseEntity<CodeMessageRespDto> saveScores(Long memberId, Long gameId, ScoreboardReqDto scores);
    public ResponseEntity<CodeMessageRespDto> stopScoreCounting(Long gameId);
    public ResponseEntity<CodeMessageRespDto> stopGame(ScoreboardStopGameReqDto scoreboardStopGameReqDto);
}

