package com.example.allcoverproject.service;

import com.example.allcoverproject.dto.MemberRespDto;
import com.example.allcoverproject.dto.ScoreboardRespDto;
import com.example.allcoverproject.entity.ClubDtl;
import com.example.allcoverproject.entity.Game;
import com.example.allcoverproject.entity.Member;
import com.example.allcoverproject.entity.Scoreboard;
import com.example.allcoverproject.repository.GameRepository;
import com.example.allcoverproject.repository.MemberRepository;
import com.example.allcoverproject.repository.clubDtl.ClubDtlRepository;
import com.example.allcoverproject.repository.scoreboard.ScoreboardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ScoreboardServiceImpl implements ScoreboardService{

    private final ScoreboardRepository scoreboardRepository;
    private final MemberRepository memberRepository;
    private final GameRepository gameRepository;

    @Override
    public List<ScoreboardRespDto> getMembers(Long gameId, Long clubId) throws Exception {
        List<ScoreboardRespDto> members = new ArrayList<ScoreboardRespDto>();

        scoreboardRepository.findAllMembers(gameId).forEach(member -> {
            members.add(member.toScoreboardRespDto());
        });

        return members;
    }

    @Override
    public boolean joinGame(Long gameId, Long memberId) throws Exception {
        boolean result = false;
        Member member = memberRepository.findMemberById(memberId);
        Game game = gameRepository.findGameById(gameId);

        Optional<Scoreboard> existingScoreboard = scoreboardRepository.findByGameIdAndMemberId(gameId, memberId);
        if(!existingScoreboard.isPresent()) {
            Scoreboard scoreboard = new Scoreboard();
            scoreboard.setId(3L); // 추후 autoIncrement
            scoreboard.setMember_avg(member.getClubDtl().getAvg());
            scoreboard.setGame(game);
            scoreboard.setMember(member);
            scoreboard.setGrade(2);
            scoreboard.setSide_avg(false);
            scoreboard.setSide_grade1(false);
            scoreboard.setConfirmedJoin(false);

            scoreboardRepository.save(scoreboard);
            result = true;
        }

        return result;
    }

    @Override
    public void joinSideGame(Long gameId, Long memberId, String sideType) throws Exception {
        Optional<Scoreboard> byGameIdAndMemberId = scoreboardRepository.findByGameIdAndMemberId(gameId, memberId);

        byGameIdAndMemberId.ifPresent(scoreboard -> {
            if(sideType.equals("grade1")) {
                scoreboard.setSide_grade1(!scoreboard.getSide_grade1());
                scoreboardRepository.save(scoreboard);
            }else if(sideType.equals("avg")) {
                scoreboard.setSide_avg(!scoreboard.getSide_avg());
                scoreboardRepository.save(scoreboard);
            }
        });
    }

    @Override
    public boolean joinConfirmedGame(Long gameId, Long memberId, String confirmedCode) throws Exception {
        boolean result = false;
        String confirmCode =  gameRepository.findGameById(gameId).getConfirmedCode();

        if(confirmCode.equals(confirmedCode)) {
            scoreboardRepository.findByGameIdAndMemberId(gameId, memberId).ifPresent(scoreboard -> {
                scoreboard.setConfirmedJoin(true);
                scoreboardRepository.save(scoreboard);
            });
            result = true;
        }

        return result;
    }
}
