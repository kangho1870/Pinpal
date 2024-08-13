package com.example.allcoverproject.repository.scoreboard;

import com.example.allcoverproject.entity.Member;
import com.example.allcoverproject.entity.QScoreboard;
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
    public List<Long> findMemberIdsByGameId(Long gameId) {
        QScoreboard scoreboard = QScoreboard.scoreboard;

        return queryFactory
                .select(scoreboard.member.id)
                .from(scoreboard)
                .where(scoreboard.game.id.eq(gameId))
                .fetch();
    }

    public Member findMemberByIdByGameId(Long memberId, Long gameId) {
        QScoreboard scoreboard = QScoreboard.scoreboard;

        return queryFactory
                .select(scoreboard.member)
                .from(scoreboard)
                .where(scoreboard.game.id.eq(gameId)
                        .and(scoreboard.member.id.eq(memberId)))
                .fetchOne();
    }
}
