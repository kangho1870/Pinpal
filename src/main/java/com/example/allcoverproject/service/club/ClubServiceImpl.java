package com.example.allcoverproject.service.club;

import com.example.allcoverproject.dto.request.club.AddClubReqDto;
import com.example.allcoverproject.dto.response.CodeMessageRespDto;
import com.example.allcoverproject.dto.response.clubDtl.GetCeremonyRespDto;
import com.example.allcoverproject.dto.response.clubDtl.GetClubDtlRespDto;
import com.example.allcoverproject.dto.response.clubMst.GetClubListRespDto;
import com.example.allcoverproject.dto.response.clubMst.GetClubMstRespDto;
import com.example.allcoverproject.entity.*;
import com.example.allcoverproject.repository.ClubMst.ClubMstRepository;
import com.example.allcoverproject.repository.ceremony.CeremonyRepository;
import com.example.allcoverproject.repository.clubDtl.ClubDtlRepository;
import com.example.allcoverproject.repository.game.GameRepository;
import com.example.allcoverproject.repository.member.MemberRepository;
import com.example.allcoverproject.repository.scoreboard.ScoreboardRepository;
import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClubServiceImpl implements ClubService {

    private final ClubDtlRepository clubDtlRepository;
    private final ClubMstRepository clubMstRepository;
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

    @Override
    public ResponseEntity<CodeMessageRespDto> addClub(AddClubReqDto addClubReqDto) {
        Member member = memberRepository.findMemberById(addClubReqDto.getMemberId());
        if (member == null) return CodeMessageRespDto.noExistMemberData();

        ClubMst byMemberId = clubMstRepository.findByMemberId(member.getId());
        if(byMemberId != null) return CodeMessageRespDto.noExistMemberData();

        try {

            ClubMst clubMst = new ClubMst(addClubReqDto, member);
            clubMstRepository.save(clubMst);

            ClubDtl clubDtl = new ClubDtl(member, clubMst, "MASTER");
            clubDtlRepository.save(clubDtl);
        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }

        return CodeMessageRespDto.success();
    }

    @Override
    public ResponseEntity<? super GetClubMstRespDto> getClubData(Long clubId) {
        Optional<ClubMst> clubMstOpt = clubMstRepository.findById(clubId);
        if(clubMstOpt.isEmpty()) return CodeMessageRespDto.noExistMemberData();

        ClubMst clubMst = null;
        try {

            clubMst = clubMstOpt.get();

        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }

        return GetClubMstRespDto.success(clubMst);
    }

    @Override
    public ResponseEntity<? super GetClubListRespDto> getClubList(int page) {
        int count = 5;
        List<Tuple> clubTupleList = clubMstRepository.getClubList(page, count);

        List<ClubMst> clubMst = new ArrayList<>();
        List<Long> clubCount = new ArrayList<>();
        try {
            QClubMst QclubMst = QClubMst.clubMst;
            QClubDtl QclubDtl = QClubDtl.clubDtl;

            // clubTupleList에서 데이터를 추출하여 clubMst와 clubCount에 저장
            for (Tuple tuple : clubTupleList) {
                ClubMst club = tuple.get(QclubMst);
                if(club == null) {
                    continue;
                }
                clubMst.add(club);
                Long memberCount = tuple.get(QclubDtl.count());
                clubCount.add(memberCount);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();  // DB 오류 처리
        }

        return GetClubListRespDto.success(clubMst, clubCount);  // 정상 응답
    }

    @Override
    public ResponseEntity<CodeMessageRespDto> joinClub(Long clubId, Long memberId) {
        Member member = memberRepository.findMemberById(memberId);
        if(member == null) return CodeMessageRespDto.noExistMemberData();
        ClubDtl byMemberId = clubDtlRepository.findByMemberId(memberId);
        if(byMemberId != null) return CodeMessageRespDto.noExistMemberData();
        Optional<ClubMst> clubMst = clubMstRepository.findById(clubId);
        if(clubMst.isEmpty()) return CodeMessageRespDto.noExistMemberData();

        try {

            ClubDtl clubDtl = new ClubDtl(member, clubMst.get(), "MEMBER");
            clubDtlRepository.save(clubDtl);

        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }


        return CodeMessageRespDto.success();
    }

    @Override
    public ResponseEntity<CodeMessageRespDto> updateOfMembersAvg(Map<String, List<Object>> map) {
        List<Object> ids = map.get("ids");
        List<Object> avg = map.get("avg");
        List<Object> grades = map.get("grades");
        if(ids == null || avg == null) return CodeMessageRespDto.noExistMemberData();

        try {

            for (int i = 0; i < ids.size(); i++) {
                Long memberId = Long.valueOf(ids.get(i).toString()); // Integer to Long 변환
                ClubDtl clubDtl = clubDtlRepository.findByMemberId(memberId);
                Integer avgNum = Integer.valueOf(avg.get(i).toString());
                Integer gradeNum = Integer.valueOf(grades.get(i).toString());
                clubDtl.setAvg(avgNum);
                clubDtl.setGrade(gradeNum);
                clubDtlRepository.save(clubDtl);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return CodeMessageRespDto.databaseError();
        }


        return CodeMessageRespDto.success();
    }


}
