package com.example.allcoverproject.repository.game;


import com.example.allcoverproject.common.object.CeremonyResp;
import com.example.allcoverproject.common.object.ScoreboardResp;
import com.example.allcoverproject.entity.*;
import com.example.allcoverproject.type.GameType;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public class GameCustomRepositoryImpl implements GameCustomRepository {


    private final JPAQueryFactory queryFactory;

    @Autowired
    public GameCustomRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public Game findGameById(Long id) {
        QGame game = QGame.game;
        return queryFactory
                .selectFrom(game)
                .where(game.id.eq(id))
                .fetchOne();
    }

    @Override
    public List<Game> findAllByClubIdAndEndGame(Long clubId, String status) {
        QGame game = QGame.game;

        return queryFactory
                .selectFrom(game)
                .where(game.clubMst.id.eq(clubId).and(game.status.eq(status)))
                .orderBy(game.date.desc())
                .fetch();
    }

    @Override
    public List<Game> findAllByClubIdAndEndRecentGame(Long clubId, String status) {
        QGame game = QGame.game;

        return queryFactory
                .selectFrom(game)
                .where(game.clubMst.id.eq(clubId).and(game.status.eq(status)))
                .orderBy(game.date.desc())
                .limit(5)
                .fetch();
    }

    @Override
    public List<CeremonyResp> findGameByClubIdBetweenDateAndEndDate(Long clubId, LocalDate startDate, LocalDate endDate, int gameType) {
        QCeremony ceremony = QCeremony.ceremony;
        QGame game = QGame.game;
        QScoreboard scoreboard = QScoreboard.scoreboard;
        QClubDtl clubDtl = QClubDtl.clubDtl;

        List<Long> gameIds = queryFactory
                .select(game.id)
                .from(game)
                .where(
                        game.clubMst.id.eq(clubId)
                                .and(game.date.between(startDate, endDate))
                                .and(game.status.eq("END"))
                                .and(gameType == 1 ? game.type.eq(GameType.정기모임) :
                                        gameType == 2 ? game.type.eq(GameType.정기번개) :
                                        gameType == 3 ? game.type.eq(GameType.기타) : null)
                )
                .orderBy(game.date.desc())
                .fetch();


        QMember member = QMember.member;


        List<CeremonyResp> ceremonyResp = queryFactory
                .select(Projections.fields(CeremonyResp.class,
                        ceremony.id.as("ceremonyId"),
                        game.id.as("gameId"),
                        game.name.as("gameName"),
                        game.type.stringValue().as("gameType"),
                        game.date.as("gameDate"),
                        game.time.as("gameTime")
                ))
                .from(ceremony)
                .leftJoin(game).on(game.id.eq(ceremony.game.id))
                .where(ceremony.game.id.in(gameIds))
                .fetch();

        for (CeremonyResp resp : ceremonyResp) {
            List<ScoreboardResp> scoreboardResps = queryFactory
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
                    .where(scoreboard.game.id.eq(resp.getGameId()))
                    .orderBy(scoreboard.member_avg.desc())
                    .fetch();
            resp.setScoreboards(scoreboardResps);
        }

        return ceremonyResp;
    }
}
