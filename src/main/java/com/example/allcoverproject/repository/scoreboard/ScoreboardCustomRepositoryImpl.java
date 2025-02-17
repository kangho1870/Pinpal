package com.example.allcoverproject.repository.scoreboard;

import com.example.allcoverproject.common.object.ScoreboardResp;
import com.example.allcoverproject.entity.*;
import com.querydsl.core.types.Projections;
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
    public List<ScoreboardResp> findAllMembers(Long gameId) {
        QScoreboard scoreboard = QScoreboard.scoreboard;
        QGame game = QGame.game;
        QMember member = QMember.member;
        QClubDtl clubDtl = QClubDtl.clubDtl;

        return queryFactory
                .select(Projections.constructor(ScoreboardResp.class,
                        member.id,
                        game.id,
                        member.name,
                        game.name,
                        clubDtl.avg,
                        scoreboard.grade,
                        scoreboard.game_1,
                        scoreboard.game_2,
                        scoreboard.game_3,
                        scoreboard.game_4,
                        scoreboard.side_grade1,
                        scoreboard.side_avg,
                        scoreboard.confirmedJoin,
                        scoreboard.team_number,
                        game.scoreCounting,
                        member.profile,
                        clubDtl.role,
                        member.gender))
                .from(scoreboard)
                .leftJoin(game).on(game.id.eq(scoreboard.game.id))
                .leftJoin(member).on(member.id.eq(scoreboard.member.id))
                .leftJoin(clubDtl).on(clubDtl.member.id.eq(member.id))
                .where(scoreboard.game.id.eq(gameId))
                .orderBy(scoreboard.member_avg.desc())
                .fetch();
    }

}
