package com.example.allcoverproject.repository.ceremony;

import com.example.allcoverproject.entity.Ceremony;
import com.example.allcoverproject.entity.QCeremony;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CeremonyCustomRepositoryImpl implements CeremonyCustomRepository {


    private JPAQueryFactory queryFactory;

    @Autowired
    public CeremonyCustomRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }


    @Override
    public Ceremony findByGameId(Long gameId) {
        QCeremony ceremony = QCeremony.ceremony;

        return queryFactory
                .selectFrom(ceremony)
                .where(ceremony.game.id.eq(gameId))
                .fetchOne();
    }
}
