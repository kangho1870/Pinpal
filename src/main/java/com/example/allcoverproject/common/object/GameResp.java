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
    private Long joinCount;
    private List<ScoreboardResp> members = new ArrayList<>();

    private GameResp(Game game, Long count, List<Scoreboard> scoreboards) {
        this.gameId = game.getId();
        this.gameName = game.getName();
        this.gameType = game.getType();
        this.gameDate = game.getDate();
        this.gameTime = game.getTime();
        this.joinCount = count;
        this.members = ScoreboardResp.getList(scoreboards);
    }

    public static List<GameResp> getClubPageRespList(List<Game> games, List<Long> count, List<List<Scoreboard>> scoreboards) {
        List<GameResp> gameList = new ArrayList<GameResp>();
        for(int i = 0; i < games.size(); i++) {
            gameList.add(new GameResp(games.get(i), count.get(i), scoreboards.get(i)));
        }
        return gameList;
    }
}
