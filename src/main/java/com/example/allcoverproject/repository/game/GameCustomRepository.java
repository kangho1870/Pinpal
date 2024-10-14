package com.example.allcoverproject.repository.game;

import com.example.allcoverproject.entity.Game;

public interface GameCustomRepository {
    Game findGameById(Long gameId);
}
