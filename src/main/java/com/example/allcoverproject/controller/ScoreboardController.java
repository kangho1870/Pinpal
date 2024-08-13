package com.example.allcoverproject.controller;

import com.example.allcoverproject.dto.CMRespDto;
import com.example.allcoverproject.dto.MemberRespDto;
import com.example.allcoverproject.service.ScoreboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/scoreboard")
public class ScoreboardController {

    @Autowired
    private ScoreboardService scoreboardService;

    @GetMapping
    public ResponseEntity<?> getMembers(@RequestParam Long gameId) {
        List<MemberRespDto> member = new ArrayList<MemberRespDto>();
        System.out.println("test");
        try {
            member = scoreboardService.getMembers(gameId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().body(new CMRespDto<>(-1, "fail", member));
        }

        return ResponseEntity.ok().body(new CMRespDto<>(1, "success", member));
    }

    @GetMapping("/join")
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
}
