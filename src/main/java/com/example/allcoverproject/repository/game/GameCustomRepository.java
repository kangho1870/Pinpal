package com.example.allcoverproject.repository.game;

import com.example.allcoverproject.common.object.CeremonyResp;
import com.example.allcoverproject.entity.Game;
import com.querydsl.core.Tuple;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface GameCustomRepository {
    Game findGameById(Long gameId);
    List<Game> findAllByClubIdAndEndGame(Long clubId, String status);
    List<Game> findAllByClubIdAndEndRecentGame(Long clubId, String status);
    List<CeremonyResp> findGameByClubIdBetweenDateAndEndDate(Long clubId, LocalDate startDate, LocalDate endDate, int gameType);

}
