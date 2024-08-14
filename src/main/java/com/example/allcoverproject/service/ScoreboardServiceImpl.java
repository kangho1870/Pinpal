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
    private final ClubDtlRepository clubDtlRepository;

    @Override
    public List<MemberRespDto> getMembers(Long gameId, Long clubId) throws Exception {
        List<MemberRespDto> members = new ArrayList<MemberRespDto>();

        scoreboardRepository.findAllMembers(gameId).forEach(member -> {
            members.add(member.getMember().toMemberDto());
        });

        members.forEach(member -> {
            ClubDtl findClubDtl = clubDtlRepository.getClubDtlByClubIdAndMemberId(clubId, member.getMemberId());
            member.setMemberAvg(findClubDtl.getAvg());
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
            scoreboard.setGame(game);
            scoreboard.setMember(member);

            scoreboardRepository.save(scoreboard);
            result = true;
        }

        return result;
    }

    @Override
    public Map<String, Object> getSideStatus(Long gameId, Long memberId) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        scoreboardRepository.findByGameIdAndMemberId(gameId, memberId).ifPresent(scoreboard -> {
            result.put("sideGrade1", scoreboard.getSide_grade1());
            result.put("sideAvg", scoreboard.getSide_avg());
        });

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
    public boolean getConfirmedJoinStatus(Long gameId, Long memberId) throws Exception {
        return scoreboardRepository.findByGameIdAndMemberId(gameId, memberId)
                .map(scoreboard -> scoreboard.getConfirmedJoin())
                .orElse(false);
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
