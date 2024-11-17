package com.example.allcoverproject.repository.game;


import com.example.allcoverproject.entity.Game;
import com.example.allcoverproject.entity.QGame;
import com.example.allcoverproject.entity.QScoreboard;
import com.example.allcoverproject.type.GameType;
import com.querydsl.core.Tuple;
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
    public List<Tuple> findAllByClubId(Long clubId) {
        QGame game = QGame.game;
        QScoreboard scoreboard = QScoreboard.scoreboard;

        return queryFactory
                .select(game, scoreboard.count())  // 게임과 해당 게임에 속한 Scoreboard 카운트
                .from(game)
                .leftJoin(scoreboard).on(scoreboard.game.id.eq(game.id))  // Game과 Scoreboard를 gameId로 조인
                .where(game.clubMst.id.eq(clubId))  // clubId가 같은 Game에 대해서만 필터링
                .groupBy(game.id)  // gameId로 그룹화
                .orderBy(game.date.asc())
                .fetch();
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
    public List<Game> findGamesByClubIdAndBetweenStartDateAndEndDate(Long clubId, LocalDate startDate, LocalDate endDate, int gameType) {
        QGame game = QGame.game;

        return queryFactory
                .selectFrom(game)
                .where(
                        game.clubMst.id.eq(clubId)
                        .and(game.date.between(startDate, endDate))
                        .and(game.status.eq("END"))
                        .and(gameType == 0 ? null : game.type.eq(gameType == 1 ? GameType.정기모임 : gameType == 2 ? GameType.정기번개 : GameType.기타)))
                .orderBy(game.date.desc())
                .fetch();

    }
}
