package com.example.allcoverproject.entity;

import com.example.allcoverproject.dto.ScoreboardRespDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;


@Entity
@Table(name = "scoreboard")
@Getter
@Setter
@ToString
public class Scoreboard {

    @Id @GeneratedValue
    @Column(name = "scoreboard_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", unique = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", unique = false)
    private Game game;

    @Column
    private Integer member_avg;

    @Column
    private Integer grade;

    @Column(nullable = true)
    private Integer game_1;

    @Column(nullable = true)
    private Integer game_2;

    @Column(nullable = true)
    private Integer game_3;

    @Column(nullable = true)
    private Integer game_4;

    @ColumnDefault("false")
    private Boolean side_grade1;

    @ColumnDefault("false")
    private Boolean side_avg;

    @ColumnDefault("false")
    private Boolean confirmedJoin;

    @Column
    private Integer team_number;

    private int all_cover;

    public void setMember(Member member) {
        this.member = member;
        member.getScoreboards().add(this);
    }

    public ScoreboardRespDto toScoreboardRespDto() {
        return ScoreboardRespDto.builder()
                .memberName(member.getName())
                .memberId(member.getId())
                .gameId(game.getId())
                .gameName(game.getName())
                .game1(game_1)
                .game2(game_2)
                .game3(game_3)
                .game4(game_4)
                .memberAvg(member_avg)
                .grade(grade)
                .sideGrade1(side_grade1)
                .sideAvg(side_avg)
                .confirmedJoin(confirmedJoin)
                .teamNumber(team_number)
                .ScoreCounting(game.getScoreCounting())
                .gender(member.getGender())
                .build();
    }
}
