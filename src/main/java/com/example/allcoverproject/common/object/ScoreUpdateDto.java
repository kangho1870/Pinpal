package com.example.allcoverproject.common.object;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScoreUpdateDto {
    private Long memberId;
    private Long gameId;
    private Integer game1Score;
    private Integer game2Score;
    private Integer game3Score;
    private Integer game4Score;
}
