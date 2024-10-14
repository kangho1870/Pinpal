package com.example.allcoverproject.repository.game;


import com.example.allcoverproject.entity.Game;
import com.example.allcoverproject.entity.QGame;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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

}
