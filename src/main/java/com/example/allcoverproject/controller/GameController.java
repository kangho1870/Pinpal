package com.example.allcoverproject.controller;

import com.example.allcoverproject.dto.request.game.AddGameReqDto;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.game.GetGameListRespDto;
import com.example.allcoverproject.service.game.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/game")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @GetMapping("/{clubId}")
    public ResponseEntity<? super GetGameListRespDto> getGames(@PathVariable Long clubId) {
        ResponseEntity<? super GetGameListRespDto> responseBody = gameService.getGames(clubId);
        return responseBody;
    }

    @PostMapping(value = {"", "/"})
    public ResponseEntity<CodeMessageRespDto> addGame(@RequestBody AddGameReqDto addGameReqDto) {
        ResponseEntity<CodeMessageRespDto> responseBody = gameService.addGame(addGameReqDto);
        return responseBody;
    }
}
