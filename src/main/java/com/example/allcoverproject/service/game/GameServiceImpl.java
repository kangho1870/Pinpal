package com.example.allcoverproject.service.game;

import com.example.allcoverproject.dto.request.game.AddGameReqDto;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.game.GetGameListRespDto;
import com.example.allcoverproject.entity.*;
import com.example.allcoverproject.repository.ClubMst.ClubMstRepository;
import com.example.allcoverproject.repository.game.GameRepository;
import com.example.allcoverproject.repository.scoreboard.ScoreboardRepository;
import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;
    private final ClubMstRepository clubMstRepository;
    private final ScoreboardRepository scoreboardRepository;

    @Override
    public ResponseEntity<? super GetGameListRespDto> getGames(Long clubId) {
        List<Game> games = new ArrayList<>();
        List<Tuple> tuples = new ArrayList<>();
        List<Long> count = new ArrayList<>();
        QGame qGame = QGame.game;
        QScoreboard qScoreboard = QScoreboard.scoreboard;
        try {

            tuples = gameRepository.findAllByClubId(clubId);
            for (Tuple tuple : tuples) {
                Game game = tuple.get(qGame);
                count.add(tuple.get(qScoreboard.count()));
                games.add(game);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }
        List<List<Scoreboard>> scoreboards = new ArrayList<>();

        try {
            
            games.forEach(game -> {
                System.out.println("game = " + game.getId());
                scoreboards.add(scoreboardRepository.findAllMembers(game.getId()));
            });

        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }
        System.out.println("scoreboards.get(1) = " + scoreboards.get(1));
        return GetGameListRespDto.success(games, count, scoreboards);
    }

    @Override
    public ResponseEntity<CodeMessageRespDto> addGame(AddGameReqDto addGameReqDto) {
        Optional<ClubMst> clubOpt = clubMstRepository.findById(addGameReqDto.getClubId());
        if(clubOpt.isEmpty()) return CodeMessageRespDto.noFundGame();

        try {
            Game game = new Game(addGameReqDto);
            game.setClubMst(clubOpt.get());
            gameRepository.save(game);
        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }

        return CodeMessageRespDto.success();
    }
}
