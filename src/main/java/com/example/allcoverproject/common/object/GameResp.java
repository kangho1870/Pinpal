package com.example.allcoverproject.common.object;

import com.example.allcoverproject.entity.Game;
import com.example.allcoverproject.entity.Scoreboard;
import com.example.allcoverproject.type.GameType;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Getter
public class GameResp {

    private Long gameId;
    private String gameName;
    private GameType gameType;
    private LocalDate gameDate;
    private LocalTime gameTime;
    private List<ScoreboardResp> members = new ArrayList<>();


    private GameResp(Game game, List<ScoreboardResp> scoreboards) {
        this.gameId = game.getId();
        this.gameName = game.getName();
        this.gameType = game.getType();
        this.gameDate = game.getDate();
        this.gameTime = game.getTime();
        this.members = scoreboards;
    }

    public static List<GameResp> getClubPageRespList(List<Game> games, List<List<ScoreboardResp>> scoreboards) {
        List<GameResp> gameList = new ArrayList<GameResp>();
        for(int i = 0; i < games.size(); i++) {
            gameList.add(new GameResp(games.get(i), scoreboards.get(i)));
        }
        return gameList;
    }
}
