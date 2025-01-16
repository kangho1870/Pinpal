package com.example.allcoverproject.common.object;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class ScoreboardUpdate {
    private String action;
    private ScoreUpdateDto score;
}
