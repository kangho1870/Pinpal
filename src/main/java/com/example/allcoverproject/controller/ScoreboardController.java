package com.example.allcoverproject.controller;

import com.example.allcoverproject.dto.CMRespDto;
import com.example.allcoverproject.dto.MemberRespDto;
import com.example.allcoverproject.service.ScoreboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/scoreboard")
public class ScoreboardController {

    @Autowired
    private ScoreboardService scoreboardService;

    @GetMapping
    public ResponseEntity<?> getMembers(@RequestParam Long gameId, @RequestParam Long clubId, @RequestParam Long memberId) {
        Map<Object, Object> data = new HashMap<>();
        List<MemberRespDto> member = new ArrayList<MemberRespDto>();

        try {
            member = scoreboardService.getMembers(gameId, clubId);
            data.put("member", member);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().body(new CMRespDto<>(-1, "fail", data));
        }

        Map<String, Object> sideStatus = new HashMap<>();

        try {
            sideStatus = scoreboardService.getSideStatus(gameId, memberId);
            data.put("sideStatus", sideStatus);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        Map<String, Object> confirmedStatus = new HashMap<>();
        boolean confirmed;
        try {
            confirmed = scoreboardService.getConfirmedJoinStatus(gameId, memberId);
            confirmedStatus.put("confirmedJoin", confirmed);
            data.put("confirmedStatus", confirmedStatus);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok().body(new CMRespDto<>(1, "success", data));
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
    public ResponseEntity<?> confirmedJoinGame(@RequestParam Long gameId, @RequestParam Long memberId, @RequestHeader String confirmedCode) {
        boolean status = false;

        try {
            status = scoreboardService.joinConfirmedGame(gameId, memberId, confirmedCode);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().body(new CMRespDto<>(-1, "fail", status));
        }

        return ResponseEntity.ok().body(new CMRespDto<>(1, "success", status));
    }

}
