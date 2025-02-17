package com.example.allcoverproject.common.object;

import com.example.allcoverproject.entity.ClubDtl;
import com.example.allcoverproject.entity.Scoreboard;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
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

//    private ScoreboardResp(Scoreboard scoreboard) {
//        this.memberId = scoreboard.getMember().getId();
//        this.memberName = scoreboard.getMember().getName();
//        this.gameId = scoreboard.getGame().getId();
//        this.gameName = scoreboard.getGame().getName();
//        this.memberAvg = scoreboard.getMember_avg();
//        this.grade = scoreboard.getGrade();
//        this.game1 = scoreboard.getGame_1();
//        this.game2 = scoreboard.getGame_2();
//        this.game3 = scoreboard.getGame_3();
//        this.game4 = scoreboard.getGame_4();
//        this.sideGrade1 = scoreboard.getSide_grade1();
//        this.sideAvg = scoreboard.getSide_avg();
//        this.confirmedJoin = scoreboard.getConfirmedJoin();
//        this.teamNumber = scoreboard.getTeam_number();
//        this.scoreCounting = scoreboard.getGame().getScoreCounting();
//        this.gender = scoreboard.getMember().getGender();
//        this.memberProfile = scoreboard.getMember().getProfile();
//        this.memberRole = scoreboard.getMember().getClubDtl().getRole();
//    }


    public ScoreboardResp(Long memberId, Long gameId, String memberName, String gameName, Integer memberAvg, Integer grade, Integer game1, Integer game2, Integer game3, Integer game4, Boolean sideGrade1, Boolean sideAvg, Boolean confirmedJoin, Integer teamNumber, Boolean scoreCounting, String memberProfile, String memberRole, int gender) {
        this.memberId = memberId;
        this.gameId = gameId;
        this.memberName = memberName;
        this.gameName = gameName;
        this.memberAvg = memberAvg;
        this.grade = grade;
        this.game1 = game1;
        this.game2 = game2;
        this.game3 = game3;
        this.game4 = game4;
        this.sideGrade1 = sideGrade1;
        this.sideAvg = sideAvg;
        this.confirmedJoin = confirmedJoin;
        this.teamNumber = teamNumber;
        this.scoreCounting = scoreCounting;
        this.memberProfile = memberProfile;
        this.memberRole = memberRole;
        this.gender = gender;
    }

//    public static List<ScoreboardResp> getScoreboardList(List<Scoreboard> scoreboards) {
//        List<ScoreboardResp> respList = new ArrayList<>();
//        for(Scoreboard scoreboard : scoreboards) {
////            ScoreboardResp resp = new ScoreboardResp(scoreboard);
////            respList.add(resp);
//        }
//        return respList;
//    }
}
