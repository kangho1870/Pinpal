package com.example.allcoverproject.repository;

import com.example.allcoverproject.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
}
