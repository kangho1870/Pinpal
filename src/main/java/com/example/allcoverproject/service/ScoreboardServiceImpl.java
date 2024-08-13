package com.example.allcoverproject.service;

import com.example.allcoverproject.dto.MemberRespDto;
import com.example.allcoverproject.entity.Game;
import com.example.allcoverproject.entity.Member;
import com.example.allcoverproject.entity.Scoreboard;
import com.example.allcoverproject.repository.GameRepository;
import com.example.allcoverproject.repository.MemberRepository;
import com.example.allcoverproject.repository.scoreboard.ScoreboardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScoreboardServiceImpl implements ScoreboardService{

    private final ScoreboardRepository scoreboardRepository;
    private final MemberRepository memberRepository;
    private final GameRepository gameRepository;

    @Override
    public List<MemberRespDto> getMembers(Long gameId) throws Exception {
        List<MemberRespDto> members = new ArrayList<MemberRespDto>();

        List<Long> ids = scoreboardRepository.findMemberIdsByGameId(gameId);

        memberRepository.findMembersById(ids).forEach(member -> {
            members.add(member.toMemberDto());
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
            scoreboard.setId(3L);
            scoreboard.setGame(game);
            scoreboard.setMember(member);

            scoreboardRepository.save(scoreboard);
            result = true;
        }

        return result;
    }
}
