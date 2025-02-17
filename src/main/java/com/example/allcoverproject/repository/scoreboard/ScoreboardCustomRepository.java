package com.example.allcoverproject.repository.scoreboard;

import com.example.allcoverproject.common.object.ScoreboardResp;
import com.example.allcoverproject.entity.Scoreboard;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScoreboardCustomRepository {
    List<ScoreboardResp> findAllMembers(Long gameId);
}
