package com.example.allcoverproject.dto;

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
    private int memberAvg;
    private int game1;
    private int game2;
    private int game3;
    private int game4;
    private boolean sideGrade1;
    private boolean sideAvg;
}
