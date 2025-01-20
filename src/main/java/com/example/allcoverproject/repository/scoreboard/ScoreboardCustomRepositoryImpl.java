package com.example.allcoverproject.repository.scoreboard;

import com.example.allcoverproject.common.object.QScoreboardDto;
import com.example.allcoverproject.common.object.ScoreboardDto;
import com.example.allcoverproject.entity.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ScoreboardCustomRepositoryImpl implements ScoreboardCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Autowired
    public ScoreboardCustomRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<Scoreboard> findAllMembers(Long gameId) {
        QScoreboard scoreboard = QScoreboard.scoreboard;

        return queryFactory
                .selectFrom(scoreboard)
                .where(scoreboard.game.id.eq(gameId))
                .orderBy(scoreboard.member_avg.desc())
                .fetch();
    }

    @Override
    public List<ScoreboardDto> findAllScoreboardsByGameId(Long gameId) {
        QScoreboard scoreboard = QScoreboard.scoreboard;
        QMember member = QMember.member;
        QGame game = QGame.game;

        return queryFactory
                .select(new QScoreboardDto(
                        scoreboard.member.id,                        // memberId
                        scoreboard.member.name,                      // memberName
                        scoreboard.member.clubDtl.role,              // memberRole
                        scoreboard.member.profile,                   // memberProfile
                        scoreboard.grade,                            // grade
                        scoreboard.game_1,                           // game1
                        scoreboard.game_2,                           // game2
                        scoreboard.game_3,                           // game3
                        scoreboard.game_4,                           // game4
                        scoreboard.game.name,                        // gameName
                        scoreboard.confirmedJoin,                    // confirmedJoin (추가 필드)
                        scoreboard.side_avg,                          // sideAvg (추가 필드)
                        scoreboard.side_grade1,                       // sideGrade1 (추가 필드)
                        scoreboard.team_number,                       // teamNumber (추가 필드)
                        scoreboard.member_avg                         // memberAvg (추가 필드)
                ))
                .from(scoreboard)
                .leftJoin(scoreboard.member, member)
                .leftJoin(scoreboard.game, game)
                .where(scoreboard.game.id.eq(gameId))
                .fetch();
    }

}
