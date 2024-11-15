package com.example.allcoverproject.repository.game;

import com.example.allcoverproject.entity.Game;
import com.querydsl.core.Tuple;

import java.time.LocalDate;
import java.util.List;

public interface GameCustomRepository {
    Game findGameById(Long gameId);
    List<Tuple> findAllByClubId(Long clubId);
    List<Game> findAllByClubIdAndEndGame(Long clubId, String status);
    List<Game> findGamesByClubIdAndBetweenStartDateAndEndDate(Long clubId, LocalDate startDate, LocalDate endDate, int gameType);
}
