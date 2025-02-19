package com.example.allcoverproject.dto.response.game;

import com.example.allcoverproject.common.object.GameResp;
import com.example.allcoverproject.common.object.ScoreboardResp;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.ResponseCode;
import com.example.allcoverproject.dto.response.ResponseMessage;
import com.example.allcoverproject.entity.Game;
import com.example.allcoverproject.entity.Scoreboard;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetGameListRespDto extends CodeMessageRespDto {

    private List<GameResp> games;

    private GetGameListRespDto(List<Game> games, List<List<ScoreboardResp>> scoreboards) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.games = GameResp.getClubPageRespList(games, scoreboards);
    }

    public static ResponseEntity<GetGameListRespDto> success(List<Game> games, List<List<ScoreboardResp>> scoreboards) {
        GetGameListRespDto getGameListRespDto = new GetGameListRespDto(games, scoreboards);
        return ResponseEntity.status(HttpStatus.OK).body(getGameListRespDto);
    }
}
