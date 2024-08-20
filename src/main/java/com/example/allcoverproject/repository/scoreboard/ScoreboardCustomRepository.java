package com.example.allcoverproject.repository.scoreboard;

import com.example.allcoverproject.entity.Scoreboard;

import java.util.List;

public interface ScoreboardCustomRepository {
    List<Scoreboard> findAllMembers(Long gameId);
}
