package com.example.allcoverproject.service.club;

import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.clubDtl.GetCeremonyRespDto;
import com.example.allcoverproject.dto.response.clubDtl.GetClubDtlRespDto;
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

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClubServiceImpl implements ClubService {

    private final ClubDtlRepository clubDtlRepository;
    private final MemberRepository memberRepository;
    private final ScoreboardRepository scoreboardRepository;
    private final CeremonyRepository ceremonyRepository;
    private final GameRepository gameRepository;

    @Override
    public ResponseEntity<? super GetClubDtlRespDto> getMemberList(Long clubId) {
        List<ClubDtl> members = new ArrayList<>();

        try {
            members = clubDtlRepository.getClubDtlByClubMstId(clubId);
        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }

        return GetClubDtlRespDto.success(members);
    }

    @Override
    public ResponseEntity<? super GetCeremonyRespDto> getCeremonyList(Long clubId) {
        List<Game> games = gameRepository.findAllByClubMst_idAndStatus(clubId, "END");

        List<List<Scoreboard>> allScoreboards = new ArrayList<>();
        List<Ceremony> ceremonys = new ArrayList<>();
        for (Game game :games) {
            List<Scoreboard> allMembers = scoreboardRepository.findAllMembers(game.getId());
            allScoreboards.add(allMembers);

            Ceremony ceremony = ceremonyRepository.findByGameId(game.getId());
            ceremonys.add(ceremony);
        }

        return GetCeremonyRespDto.success(ceremonys, allScoreboards, games, memberRepository);
    }
}
