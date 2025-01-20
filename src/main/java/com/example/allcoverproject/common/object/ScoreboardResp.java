package com.example.allcoverproject.common.object;

import com.example.allcoverproject.entity.ClubDtl;
import com.example.allcoverproject.entity.Scoreboard;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class ScoreboardResp {
    private Long memberId;
    private Long gameId;
    private String memberName;
    private String gameName;
    private Integer memberAvg;
    private Integer grade;
    private Integer game1;
    private Integer game2;
    private Integer game3;
    private Integer game4;
    private Boolean sideGrade1;
    private Boolean sideAvg;
    private Boolean confirmedJoin;
    private Integer teamNumber;
    private Boolean scoreCounting;
    private String memberProfile;
    private String memberRole;
    private int gender;

    private ScoreboardResp(Scoreboard scoreboard) {
        this.memberId = scoreboard.getMember().getId();
        this.memberName = scoreboard.getMember().getName();
        this.gameId = scoreboard.getGame().getId();
        this.gameName = scoreboard.getGame().getName();
        this.memberAvg = scoreboard.getMember_avg();
        this.grade = scoreboard.getGrade();
        this.game1 = scoreboard.getGame_1();
        this.game2 = scoreboard.getGame_2();
        this.game3 = scoreboard.getGame_3();
        this.game4 = scoreboard.getGame_4();
        this.sideGrade1 = scoreboard.getSide_grade1();
        this.sideAvg = scoreboard.getSide_avg();
        this.confirmedJoin = scoreboard.getConfirmedJoin();
        this.teamNumber = scoreboard.getTeam_number();
        this.scoreCounting = scoreboard.getGame().getScoreCounting();
        this.gender = scoreboard.getMember().getGender();
        this.memberProfile = scoreboard.getMember().getProfile();
    }

    public static List<ScoreboardResp> getScoreboardList(List<Scoreboard> scoreboards) {
        List<ScoreboardResp> respList = new ArrayList<>();
        for(Scoreboard scoreboard : scoreboards) {
            ScoreboardResp resp = new ScoreboardResp(scoreboard);
            respList.add(resp);
        }
        return respList;
    }
}
