package com.example.allcoverproject.controller;

import com.example.allcoverproject.dto.CMRespDto;
import com.example.allcoverproject.dto.ScoreboardReqDto;
import com.example.allcoverproject.dto.ScoreboardRespDto;
import com.example.allcoverproject.service.scoreboard.ScoreboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/scoreboard")
public class ScoreboardController {

    @Autowired
    private ScoreboardService scoreboardService;

    @GetMapping
    public ResponseEntity<?> getMembers(@RequestParam Long gameId, @RequestParam Long clubId, @RequestParam Long memberId) {
        List<ScoreboardRespDto> member = new ArrayList<ScoreboardRespDto>();

        try {
            member = scoreboardService.getMembers(gameId, clubId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().body(new CMRespDto<>(-1, "fail", member));
        }

        return ResponseEntity.ok().body(new CMRespDto<>(1, "success", member));
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinGame(@RequestParam Long gameId, @RequestParam Long memberId) {
        boolean status = false;
        try {
            status = scoreboardService.joinGame(gameId, memberId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().body(new CMRespDto<>(-1, "fail", status));
        }

        return ResponseEntity.ok().body(new CMRespDto<>(1, "success", status));
    }

    @PostMapping("/setGrade")
    public ResponseEntity<?> setGrade(@RequestBody Map<String, List<Map<String, Object>>> members) {
        try {
            scoreboardService.setGrade(members);
        } catch (Exception e) {
            return ResponseEntity.ok().body(new CMRespDto<>(-1, "fail", null));
        }

        return ResponseEntity.ok().body(new CMRespDto<>(1, "success", null));
    }

    @PostMapping("/setTeam")
    public ResponseEntity<?> setTeam(@RequestBody Map<String, List<Map<String, Object>>> members) {
        try {
            scoreboardService.setTeam(members);
        } catch (Exception e) {
            return ResponseEntity.ok().body(new CMRespDto<>(-1, "fail", null));
        }

        return ResponseEntity.ok().body(new CMRespDto<>(1, "success", null));
    }

    @PostMapping("/joinSide/{sideType}")
    public ResponseEntity<?> joinSide(@RequestParam Long gameId, @RequestParam Long memberId, @PathVariable String sideType) {
        boolean status = false;

        try {
            scoreboardService.joinSideGame(gameId, memberId, sideType);
            status = true;
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().body(new CMRespDto<>(-1, "fail", status));
        }

        return ResponseEntity.ok().body(new CMRespDto<>(1, "success", status));
    }

    @PostMapping("/confirmedJoin")
    public ResponseEntity<?> confirmedJoinGame(@RequestParam Long gameId, @RequestParam Long memberId, @RequestBody Map<String, String> confirmedCode) {
        boolean status = false;

        try {
            status = scoreboardService.joinConfirmedGame(gameId, memberId, confirmedCode.get("code"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().body(new CMRespDto<>(-1, "fail", status));
        }

        return ResponseEntity.ok().body(new CMRespDto<>(1, "success", status));
    }

    @PostMapping("/saveScore")
    public ResponseEntity<?> saveScore(@RequestParam Long memberId, @RequestParam Long gameId, @RequestBody ScoreboardReqDto scores) {
        try {
            scoreboardService.saveScores(memberId, gameId, scores);
        } catch (Exception e) {
            return ResponseEntity.ok().body(new CMRespDto<>(-1, "fail", null));
        }

        return ResponseEntity.ok().body(new CMRespDto<>(1, "sucsess", null));
    }

    @PostMapping("/stopScoreCounting")
    public ResponseEntity<?> stopScoreCounting(@RequestParam Long gameId) {
        try {
            scoreboardService.stopScoreCounting(gameId);
        } catch (Exception e) {
            return ResponseEntity.ok().body(new CMRespDto<>(-1, "fail", null));
        }

        return ResponseEntity.ok().body(new CMRespDto<>(1, "sucsess", null));
    }
}
