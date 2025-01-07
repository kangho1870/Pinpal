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

        try {

            games = gameRepository.findAllByClubIdAndEndGame(clubId, "NOT_END");

        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }
        List<List<Scoreboard>> scoreboards = new ArrayList<>();

        try {
            
            games.forEach(game -> {
                scoreboards.add(scoreboardRepository.findAllMembers(game.getId()));
            });

        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }
        return GetGameListRespDto.success(games, scoreboards);
    }

    @Override
    public ResponseEntity<CodeMessageRespDto> addGame(AddGameReqDto addGameReqDto) {
        Optional<ClubMst> clubOpt = clubMstRepository.findById(addGameReqDto.getClubId());
        if(clubOpt.isEmpty()) return CodeMessageRespDto.noExistClub();

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
