package com.example.allcoverproject.repository.scoreboard;

import com.example.allcoverproject.common.object.ScoreboardDto;
import com.example.allcoverproject.entity.Scoreboard;

import java.util.List;

public interface ScoreboardCustomRepository {
    List<Scoreboard> findAllMembers(Long gameId);
    List<ScoreboardDto> findAllScoreboardsByGameId(Long gameId);
}
