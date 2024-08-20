package com.example.allcoverproject.repository.scoreboard;

import com.example.allcoverproject.entity.Member;
import com.example.allcoverproject.entity.QGame;
import com.example.allcoverproject.entity.QScoreboard;
import com.example.allcoverproject.entity.Scoreboard;
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

}
