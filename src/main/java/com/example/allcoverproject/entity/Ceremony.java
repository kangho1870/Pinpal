package com.example.allcoverproject.entity;

import com.example.allcoverproject.dto.request.scoreboard.ScoreboardStopGameReqDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "ceremony")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Ceremony {

    @Id @GeneratedValue
    @Column(name = "ceremony_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id")
    private ClubMst clubMst;

    @Column(name = "total_1st")
    private Long total1stId;

    @Column(name = "grade1_1st")
    private Long grade1_1stId;

    @Column(name = "grade2_1st")
    private Long grade2_1stId;

    @Column(name = "grade3_1st")
    private Long grade3_1stId;

    @Column(name = "grade4_1st")
    private Long grade4_1stId;

    @Column(name = "avg_1st")
    private Long avg1stId;

    @Column(name = "high_score_man")
    private Long highScoreOfMan;

    @Column(name = "high_score_girl")
    private Long highScoreOfGirl;

    @ElementCollection
    @CollectionTable(name = "ceremony_team_1st", joinColumns = @JoinColumn(name = "ceremony_id"))
    @Column(name = "team_1st_id")
    private List<Long> team1stIds = new ArrayList<>();

    public Ceremony(ScoreboardStopGameReqDto scoreboardStopGameReqDto, ClubMst clubMst, Game game) {
        this.game = game;
        this.clubMst = clubMst;
        this.total1stId = scoreboardStopGameReqDto.getPin1st();
        this.grade1_1stId = scoreboardStopGameReqDto.getGrade1st();
        this.grade2_1stId = scoreboardStopGameReqDto.getGrade2st();
        this.grade3_1stId = scoreboardStopGameReqDto.getGrade3st();
        this.grade4_1stId = scoreboardStopGameReqDto.getGrade4st();
        this.avg1stId = scoreboardStopGameReqDto.getAvgTopScoreMember();
        this.team1stIds = scoreboardStopGameReqDto.getTeam1stIds();
        this.highScoreOfMan = scoreboardStopGameReqDto.getHighScoreOfMan();
        this.highScoreOfGirl = scoreboardStopGameReqDto.getHighScoreOfGirl();
    }
}
