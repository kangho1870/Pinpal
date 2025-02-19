package com.example.allcoverproject.dto.response.scoreboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ScoreboardRespDto {
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
    private Boolean ScoreCounting;
    private int gender;
}
