package com.example.allcoverproject.repository.scoreboard;

import java.util.List;

public interface ScoreboardCustomRepository {
    List<Long> findMemberIdsByGameId(Long gameId);
}
