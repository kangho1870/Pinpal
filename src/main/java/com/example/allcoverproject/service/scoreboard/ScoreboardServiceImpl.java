package com.example.allcoverproject.service.scoreboard;

import com.example.allcoverproject.dto.request.scoreboard.ScoreboardReqDto;
import com.example.allcoverproject.dto.request.scoreboard.ScoreboardStopGameReqDto;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.scoreboard.GetScoreboardListRespDto;
import com.example.allcoverproject.entity.*;
import com.example.allcoverproject.repository.ClubMst.ClubMstRepository;
import com.example.allcoverproject.repository.ceremony.CeremonyRepository;
import com.example.allcoverproject.repository.clubDtl.ClubDtlRepository;
import com.example.allcoverproject.repository.game.GameRepository;
import com.example.allcoverproject.repository.member.MemberRepository;
import com.example.allcoverproject.repository.scoreboard.ScoreboardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ScoreboardServiceImpl implements ScoreboardService{

    private final ScoreboardRepository scoreboardRepository;
    private final MemberRepository memberRepository;
    private final GameRepository gameRepository;
    private final CeremonyRepository ceremonyRepository;
    private final ClubMstRepository clubMstRepository;
    private final ClubDtlRepository clubDtlRepository;

    @Override
    public ResponseEntity<? super GetScoreboardListRespDto> getMembers(Long gameId, Long clubId) {
        List<Scoreboard> scoreboards = new ArrayList<>();

        try {

            scoreboards = scoreboardRepository.findAllMembers(gameId);

        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }

        return GetScoreboardListRespDto.success(scoreboards);
    }

    @Override
    public ResponseEntity<CodeMessageRespDto> joinGame(Long gameId, Long memberId) {
        Member member = memberRepository.findMemberById(memberId);
        if(member == null) return CodeMessageRespDto.noExistMemberId();
        Game game = gameRepository.findGameById(gameId);
        if(game == null) return CodeMessageRespDto.noFundGame();
        ClubDtl clubDtl = clubDtlRepository.findByMemberId(memberId);
        if(clubDtl == null) return CodeMessageRespDto.noExistMemberData();

        Optional<Scoreboard> existingScoreboard = scoreboardRepository.findByGameIdAndMemberId(gameId, memberId);

        try {
            if(existingScoreboard.isPresent()) {
                scoreboardRepository.delete(existingScoreboard.get());
                return CodeMessageRespDto.scoreboardJoinCancle();
            }
            Scoreboard scoreboard = new Scoreboard(member, game, clubDtl);
            scoreboardRepository.save(scoreboard);
        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }

        return CodeMessageRespDto.success();
    }

    @Override
    public ResponseEntity<CodeMessageRespDto> joinSideGame(Long gameId, Long memberId, String sideType) {
        Optional<Scoreboard> byGameIdAndMemberId = scoreboardRepository.findByGameIdAndMemberId(gameId, memberId);
        if(byGameIdAndMemberId.isEmpty()) return CodeMessageRespDto.noExistMemberId();

        try {
            if(sideType.equals("grade1")) {
                byGameIdAndMemberId.get().setSide_grade1(!byGameIdAndMemberId.get().getSide_grade1());
                byGameIdAndMemberId.get().setUpdateDate(LocalDateTime.now());
                scoreboardRepository.save(byGameIdAndMemberId.get());
            }else if(sideType.equals("avg")) {
                byGameIdAndMemberId.get().setSide_avg(!byGameIdAndMemberId.get().getSide_avg());
                byGameIdAndMemberId.get().setUpdateDate(LocalDateTime.now());
                scoreboardRepository.save(byGameIdAndMemberId.get());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }

        return CodeMessageRespDto.success();
    }

    @Override
    public ResponseEntity<CodeMessageRespDto> joinConfirmedGame(Long gameId, Long memberId, String confirmedCode) {
        String confirmCode =  gameRepository.findGameById(gameId).getConfirmedCode();

        try {
            if(confirmCode.equals(confirmedCode)) {
                scoreboardRepository.findByGameIdAndMemberId(gameId, memberId).ifPresent(scoreboard -> {
                    scoreboard.setConfirmedJoin(true);
                    scoreboard.setUpdateDate(LocalDateTime.now());
                    scoreboardRepository.save(scoreboard);
                });
            }else {
                return CodeMessageRespDto.confirmFail();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }

        return CodeMessageRespDto.success();
    }

    @Override
    public ResponseEntity<CodeMessageRespDto> setGrade(Map<String, List<Map<String, Object>>> members) {
        List<Scoreboard> scoreboardsToUpdate = new ArrayList<>();

        List<Map<String, Object>> updatedMembers = members.get("updatedMembers");
        if(updatedMembers == null) return CodeMessageRespDto.noExistMemberData();

        try {
            for (Map<String, Object> member : updatedMembers) {
                Long gameId = Long.valueOf(member.get("gameId").toString());
                Long memberId = Long.valueOf(member.get("memberId").toString());
                Integer grade = (Integer) member.get("grade");

                Optional<Scoreboard> optionalScoreboard = scoreboardRepository.findByGameIdAndMemberId(gameId, memberId);
                if(optionalScoreboard.isEmpty()) return CodeMessageRespDto.noExistMemberData();

                Scoreboard scoreboard = optionalScoreboard.get();
                scoreboard.setGrade(grade);
                scoreboard.setUpdateDate(LocalDateTime.now());
                scoreboardsToUpdate.add(scoreboard);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }

        try {
            scoreboardRepository.saveAll(scoreboardsToUpdate);
        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }

        return CodeMessageRespDto.success();
    }

    @Override
    public ResponseEntity<CodeMessageRespDto> setTeam(Map<String, List<Map<String, Object>>> members) {
        List<Scoreboard> scoreboardsToUpdate = new ArrayList<>();

        List<Map<String, Object>> updatedMembers = members.get("members");
        if(updatedMembers == null) return CodeMessageRespDto.noExistMemberData();

        try {
            for (Map<String, Object> member : updatedMembers) {
                Long gameId = Long.valueOf(member.get("gameId").toString());
                Long memberId = Long.valueOf(member.get("memberId").toString());
                Integer teamNumber = (Integer) member.get("teamNumber");

                Optional<Scoreboard> optionalScoreboard = scoreboardRepository.findByGameIdAndMemberId(gameId, memberId);
                if(optionalScoreboard.isEmpty()) return CodeMessageRespDto.noExistMemberData();

                Scoreboard scoreboard = optionalScoreboard.get();
                scoreboard.setTeam_number(teamNumber);
                scoreboard.setUpdateDate(LocalDateTime.now());
                scoreboardsToUpdate.add(scoreboard);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }

        try {
            scoreboardRepository.saveAll(scoreboardsToUpdate);
        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }

        return CodeMessageRespDto.success();
    }

    @Override
    public ResponseEntity<CodeMessageRespDto> saveScores(Long memberId, Long gameId, ScoreboardReqDto scores) {
        Optional<Scoreboard> byGameIdAndMemberId = scoreboardRepository.findByGameIdAndMemberId(gameId, memberId);
        if(byGameIdAndMemberId.isEmpty()) return CodeMessageRespDto.noExistMemberData();

        Scoreboard scoreboard = byGameIdAndMemberId.get();

        try {
            scoreboard.setGame_1(scores.getGame1Score());
            scoreboard.setGame_2(scores.getGame2Score());
            scoreboard.setGame_3(scores.getGame3Score());
            scoreboard.setGame_4(scores.getGame4Score());
            scoreboard.setUpdateDate(LocalDateTime.now());
            scoreboardRepository.save(scoreboard);
        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }

        return CodeMessageRespDto.success();
    }

    @Override
    public ResponseEntity<CodeMessageRespDto> stopScoreCounting(Long gameId) {
        Game game = gameRepository.findGameById(gameId);
        if(game == null) return CodeMessageRespDto.noFundGame();

        try {
            game.setScoreCounting(false);
            game.setUpdateDate(LocalDateTime.now());
        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }

        gameRepository.save(game);

        return CodeMessageRespDto.success();
    }

    @Override
    public ResponseEntity<CodeMessageRespDto> stopGame(ScoreboardStopGameReqDto scoreboardStopGameReqDto) {

        Game game = gameRepository.findGameById(scoreboardStopGameReqDto.getGameId());
        if(game == null) return CodeMessageRespDto.noFundGame();

        Optional<ClubMst> clubMst = clubMstRepository.findById(scoreboardStopGameReqDto.getClubId());
        if(clubMst.isEmpty()) return CodeMessageRespDto.noFundGame();

        try {
            List<Scoreboard> allMembers = scoreboardRepository.findAllMembers(scoreboardStopGameReqDto.getGameId());
            if(allMembers.isEmpty()) return CodeMessageRespDto.noExistMemberData();
            for (Scoreboard scoreboard : allMembers) {
                scoreboard.setStatus("DELETED");
                scoreboard.setUpdateDate(LocalDateTime.now());
            }
            scoreboardRepository.saveAll(allMembers);

            Ceremony ceremony = ceremonyRepository.findByGameId(scoreboardStopGameReqDto.getGameId());
            if(ceremony != null) return CodeMessageRespDto.noFundCeremony();

            Ceremony newCeremony = new Ceremony(scoreboardStopGameReqDto, clubMst.get(), game);
            ceremonyRepository.save(newCeremony);


        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }


        return CodeMessageRespDto.success();
    }
}
