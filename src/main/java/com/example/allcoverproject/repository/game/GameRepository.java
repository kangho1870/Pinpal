package com.example.allcoverproject.repository.game;

import com.example.allcoverproject.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long>, GameCustomRepository {
}
