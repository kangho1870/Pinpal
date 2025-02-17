package com.example.allcoverproject.repository.game;

import com.example.allcoverproject.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long>, GameCustomRepository {
    List<Game> findAllByClubMst_IdOrderByDateAscTimeAsc(Long clubId);
    List<Game> findAllByClubMst_idAndStatus(Long clubId, String status);
}
