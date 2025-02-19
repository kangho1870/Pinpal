package com.example.allcoverproject.controller;

import com.example.allcoverproject.dto.request.scoreboard.ScoreboardReqDto;
import com.example.allcoverproject.dto.request.scoreboard.ScoreboardStopGameReqDto;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.scoreboard.GetScoreboardListRespDto;
import com.example.allcoverproject.service.scoreboard.ScoreboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/v1/scoreboard")
@RequiredArgsConstructor
@Slf4j
public class ScoreboardController {

    private final ScoreboardService scoreboardService;

    @GetMapping(value = {"", "/"})
    public ResponseEntity<? super GetScoreboardListRespDto> getMembers(@RequestParam Long gameId, @RequestParam Long clubId) {
        ResponseEntity<? super GetScoreboardListRespDto> members = scoreboardService.getMembers(gameId, clubId);
        log.info("Game ID: {}", gameId);
        return members;
    }

    @PostMapping("/join")
    public ResponseEntity<CodeMessageRespDto> joinGame(@RequestParam Long gameId, @RequestParam Long memberId) {
        ResponseEntity<CodeMessageRespDto> responseBody = scoreboardService.joinGame(gameId, memberId);
        log.info("Game ID: {}", gameId);
        return responseBody;
    }

    @PostMapping("/setGrade")
    public ResponseEntity<CodeMessageRespDto> setGrade(@RequestBody Map<String, List<Map<String, Object>>> members) {
        ResponseEntity<CodeMessageRespDto> responseBody = scoreboardService.setGrade(members);
        return responseBody;
    }

    @PostMapping("/setTeam")
    public ResponseEntity<CodeMessageRespDto> setTeam(@RequestBody Map<String, List<Map<String, Object>>> members) {
        ResponseEntity<CodeMessageRespDto> responseBody = scoreboardService.setTeam(members);
        return responseBody;
    }

    @PostMapping("/joinSide")
    public ResponseEntity<CodeMessageRespDto> joinSide(@RequestParam Long gameId, @RequestParam Long memberId, @RequestParam String sideType) {
        ResponseEntity<CodeMessageRespDto> response = scoreboardService.joinSideGame(gameId, memberId, sideType);
        return response;
    }

    @PostMapping("/confirmedJoin")
    public ResponseEntity<CodeMessageRespDto> confirmedJoinGame(@RequestParam Long gameId, @RequestParam Long memberId, @RequestBody Map<String, String> confirmedCode) {
        ResponseEntity<CodeMessageRespDto> responseBody = scoreboardService.joinConfirmedGame(gameId, memberId, confirmedCode.get("code"));
        log.info("Game ID: {}", gameId);
        return responseBody;

    }

    @PostMapping("/saveScore")
    public ResponseEntity<CodeMessageRespDto> saveScore(@RequestParam Long memberId, @RequestParam Long gameId, @RequestBody ScoreboardReqDto scores) {
        ResponseEntity<CodeMessageRespDto> responseBody = scoreboardService.saveScores(memberId, gameId, scores);
        log.info("Game ID: {}", gameId);
        return responseBody;
    }

    @PostMapping("/stopScoreCounting")
    public ResponseEntity<CodeMessageRespDto> stopScoreCounting(@RequestParam Long gameId) {
        ResponseEntity<CodeMessageRespDto> responseBody = scoreboardService.stopScoreCounting(gameId);
        log.info("Game ID: {}", gameId);
        return responseBody;
    }

    @PostMapping("/stop")
    public ResponseEntity<CodeMessageRespDto> stopGame(@RequestBody ScoreboardStopGameReqDto scoreboardStopGameReqDto) {
        ResponseEntity<CodeMessageRespDto> responseBody = scoreboardService.stopGame(scoreboardStopGameReqDto);
        return responseBody;
    }
}
