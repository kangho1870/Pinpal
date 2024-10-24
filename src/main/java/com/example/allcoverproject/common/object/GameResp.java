package com.example.allcoverproject.common.object;

import com.example.allcoverproject.entity.Game;
import com.example.allcoverproject.type.GameType;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class MyClubPageResp {

    private Long gameId;
    private String gameName;
    private GameType gameType;

    private MyClubPageResp(Game game) {
        this.gameId = game.getId();
        this.gameName = game.getName();
        this.gameType = game.getType();
    }

    public static List<MyClubPageResp> getClubPageRespList(List<Game> games) {
        List<MyClubPageResp> clubPageResps = new ArrayList<MyClubPageResp>();
        for (Game game : games) {
            clubPageResps.add(new MyClubPageResp(game));
        }
        return clubPageResps;
    }
}
