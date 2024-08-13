package com.example.allcoverproject.repository.scoreboard;

import com.example.allcoverproject.entity.Scoreboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScoreboardRepository extends JpaRepository<Scoreboard, Long>, ScoreboardCustomRepository {
    Optional<Scoreboard> findByGameIdAndMemberId(Long gameId, Long memberId);
}
