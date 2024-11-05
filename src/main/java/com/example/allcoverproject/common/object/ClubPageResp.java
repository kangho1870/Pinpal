package com.example.allcoverproject.common.object;

import com.example.allcoverproject.dto.response.ceremony.CeremonyRespDto;
import com.example.allcoverproject.dto.response.clubDtl.GetClubDtlRespDto;
import com.example.allcoverproject.type.GameType;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class ClubPageResp {

    private Long memberId;
    private String memberName;
    private String memberProfile;
    private String memberRole;
    private Integer memberAvg;

    private Long gameId;
    private String gameName;
    private GameType gameType;
    private Long joinCount;

    private Long gameIdByCeremony;
    private String total1st;
    private String grade1_1st;
    private String grade2_1st;
    private String grade3_1st;
    private String grade4_1st;
    private String avg1st;
    private String team1st;

    private ClubPageResp(GetClubDtlRespDto clubDtl, GameResp game, CeremonyRespDto ceremony) {


        this.gameId = game.getGameId();
        this.gameName = game.getGameName();
        this.gameType = game.getGameType();


        this.gameIdByCeremony = ceremony.getGameId();
        this.total1st = ceremony.getTotal1st();
        this.grade1_1st = ceremony.getGrade1_1st();
        this.grade2_1st = ceremony.getGrade2_1st();
        this.grade3_1st = ceremony.getGrade3_1st();
        this.grade4_1st = ceremony.getGrade4_1st();
        this.avg1st = ceremony.getAvg1st();
        this.team1st = ceremony.getTeam1st();

    }

}
