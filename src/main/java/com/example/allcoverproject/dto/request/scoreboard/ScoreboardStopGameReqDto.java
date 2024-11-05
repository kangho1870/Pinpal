package com.example.allcoverproject.dto.request.scoreboard;

import lombok.Getter;

import java.util.List;

@Getter
public class ScoreboardStopGameReqDto {
    private Long gameId;
    private Long clubId;
    private Long pin1st;
    private Long avgTopScoreMember;
    private Long grade1st;
    private Long grade2st;
    private Long grade3st;
    private Long grade4st;
    private Long highScoreOfMan;
    private Long highScoreOfGirl;
    private List<Long> team1stIds;
}
