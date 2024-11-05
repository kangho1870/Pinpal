package com.example.allcoverproject.repository.game;

import com.example.allcoverproject.entity.Game;
import com.querydsl.core.Tuple;

import java.util.List;

public interface GameCustomRepository {
    Game findGameById(Long gameId);
    List<Tuple> findAllByClubId(Long clubId);
}
