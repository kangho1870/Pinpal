package com.example.allcoverproject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScoreboardReqDto {
    private Integer game1Score;
    private Integer game2Score;
    private Integer game3Score;
    private Integer game4Score;
}
