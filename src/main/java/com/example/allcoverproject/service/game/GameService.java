package com.example.allcoverproject.service.game;

import com.example.allcoverproject.common.object.GameResp;
import com.example.allcoverproject.dto.request.game.AddGameReqDto;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.game.GetGameListRespDto;
import org.springframework.http.ResponseEntity;

public interface GameService {
    public ResponseEntity<? super GetGameListRespDto> getGames(Long clubId);
    public ResponseEntity<CodeMessageRespDto> addGame(AddGameReqDto addGameReqDto);
}
