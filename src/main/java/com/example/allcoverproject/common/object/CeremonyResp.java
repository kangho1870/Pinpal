package com.example.allcoverproject.common.object;

import com.example.allcoverproject.entity.Ceremony;
import com.example.allcoverproject.entity.Game;
import com.example.allcoverproject.entity.Scoreboard;
import com.example.allcoverproject.repository.member.MemberRepository;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.JoinColumn;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class CeremonyResp {


    private Long ceremonyId;
    private Long gameId;
    private String gameName;
    private String gameType;
    private LocalDate gameDate;
    private LocalTime gameTime;
    private String total1stId;
    private String grade1_1stId;
    private String grade2_1stId;
    private String grade3_1stId;
    private String grade4_1stId;
    private String avg1stId;
    private String highScoreOfMan;
    private String highScoreOfGirl;

    private List<Long> team1stIds;

    private List<String> team1stNames = new ArrayList<>();
    private List<ScoreboardResp> scoreboards = new ArrayList<>();

//    private CeremonyResp(Ceremony ceremony, List<Scoreboard> scoreboards, Game game, MemberRepository memberRepository) {
//        this.memberRepository = memberRepository;
//        this.gameId = game.getId();
//        this.gameName = game.getName();
//        this.gameType = game.getType().toString();
//        this.gameDate = game.getDate();
//        this.gameTime = game.getTime();
//        setMemberName(ceremony);
////        this.scoreboards = ScoreboardResp.getScoreboardList(scoreboards);
//    }



//    private void setMemberName(Ceremony ceremony) {
//        this.total1stId = memberRepository.findMemberById(ceremony.getTotal1stId()) == null ? "" : memberRepository.findMemberById(ceremony.getTotal1stId()).getName();
//        this.grade1_1stId = memberRepository.findMemberById(ceremony.getGrade1_1stId()) == null ? "" : memberRepository.findMemberById(ceremony.getGrade1_1stId()).getName();
//        this.grade2_1stId = memberRepository.findMemberById(ceremony.getGrade2_1stId()) == null ? "" : memberRepository.findMemberById(ceremony.getGrade2_1stId()).getName();
//        this.grade3_1stId = memberRepository.findMemberById(ceremony.getGrade3_1stId()) == null ? "" : memberRepository.findMemberById(ceremony.getGrade3_1stId()).getName();
//        this.grade4_1stId = memberRepository.findMemberById(ceremony.getGrade4_1stId()) == null ? "" : memberRepository.findMemberById(ceremony.getGrade4_1stId()).getName();
//        this.avg1stId = memberRepository.findMemberById(ceremony.getAvg1stId()) == null ? "" : memberRepository.findMemberById(ceremony.getAvg1stId()).getName();
//        this.highScoreOfMan = memberRepository.findMemberById(ceremony.getHighScoreOfMan()) == null ? "" : memberRepository.findMemberById(ceremony.getHighScoreOfMan()).getName();
//        this.highScoreOfGirl = memberRepository.findMemberById(ceremony.getHighScoreOfGirl()) == null ? "" : memberRepository.findMemberById(ceremony.getHighScoreOfGirl()).getName();
//
//        List<Long> ids = ceremony.getTeam1stIds();
//        for(int i = 0; i < ids.size(); i++){
//            if(i == ids.size() -1){
//                team1stIds.add(memberRepository.findMemberById(ids.get(i)).getName());
//            }else {
//                team1stIds.add(memberRepository.findMemberById(ids.get(i)).getName() + ", ");
//            }
//
//        }
//    }

    public CeremonyResp(CeremonyResp ceremonyResp, List<ScoreboardResp> scoreboardResp) {
        this.ceremonyId = ceremonyResp.ceremonyId;
        this.gameId = ceremonyResp.gameId;
        this.gameName = ceremonyResp.getGameName();
        this.gameType = ceremonyResp.getGameType();
        this.gameDate = ceremonyResp.getGameDate();
        this.gameTime = ceremonyResp.getGameTime();
        this.total1stId = ceremonyResp.getTotal1stId();
        this.grade1_1stId = ceremonyResp.getGrade1_1stId();
        this.grade2_1stId = ceremonyResp.getGrade2_1stId();
        this.grade3_1stId = ceremonyResp.getGrade3_1stId();
        this.grade4_1stId = ceremonyResp.getGrade4_1stId();
        this.avg1stId = ceremonyResp.getAvg1stId();
        this.highScoreOfMan = ceremonyResp.getHighScoreOfMan();
        this.highScoreOfGirl = ceremonyResp.getHighScoreOfGirl();
        this.team1stIds = ceremonyResp.getTeam1stIds();
        this.team1stNames = ceremonyResp.getTeam1stNames();
        this.scoreboards = scoreboardResp;
    }

    public CeremonyResp(CeremonyResp ceremonyResp) {
        this.ceremonyId = ceremonyResp.ceremonyId;
        this.gameId = ceremonyResp.gameId;
        this.gameName = ceremonyResp.getGameName();
        this.gameType = ceremonyResp.getGameType();
        this.gameDate = ceremonyResp.getGameDate();
        this.gameTime = ceremonyResp.getGameTime();
        this.total1stId = ceremonyResp.getTotal1stId();
        this.grade1_1stId = ceremonyResp.getGrade1_1stId();
        this.grade2_1stId = ceremonyResp.getGrade2_1stId();
        this.grade3_1stId = ceremonyResp.getGrade3_1stId();
        this.grade4_1stId = ceremonyResp.getGrade4_1stId();
        this.avg1stId = ceremonyResp.getAvg1stId();
        this.highScoreOfMan = ceremonyResp.getHighScoreOfMan();
        this.highScoreOfGirl = ceremonyResp.getHighScoreOfGirl();
        this.team1stIds = ceremonyResp.getTeam1stIds();
        this.team1stNames = ceremonyResp.getTeam1stNames();
        this.scoreboards = ceremonyResp.getScoreboards();
    }

    public static List<CeremonyResp> getCeremonyList(List<CeremonyResp> ceremony, List<List<ScoreboardResp>> scoreboards) {
        List<CeremonyResp> resp = new ArrayList<>();
        for(int i = 0; i < ceremony.size(); i++) {
            CeremonyResp ceremonyResp = new CeremonyResp(ceremony.get(i), scoreboards.get(i));
            resp.add(ceremonyResp);
        }
        return resp;
    }

    public static List<CeremonyResp> getCeremonyList(List<CeremonyResp> ceremony) {
        List<CeremonyResp> resp = new ArrayList<>();
        for (CeremonyResp ceremonyResp : ceremony) {
            ceremonyResp = new CeremonyResp(ceremonyResp);
            resp.add(ceremonyResp);
        }
        return resp;
    }
}
