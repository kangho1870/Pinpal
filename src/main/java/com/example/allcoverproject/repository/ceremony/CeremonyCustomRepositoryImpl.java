package com.example.allcoverproject.repository.ceremony;

import com.example.allcoverproject.common.object.CeremonyResp;
import com.example.allcoverproject.entity.*;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class CeremonyCustomRepositoryImpl implements CeremonyCustomRepository {


    private JPAQueryFactory queryFactory;
    private EntityManager entityManager;

    @Autowired
    public CeremonyCustomRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }


    @Override
    public CeremonyResp findByGameId(Long gameId) {
        QCeremony ceremony = QCeremony.ceremony;
        QGame game = QGame.game;
        QMember member = QMember.member;

        QMember total1stMember = new QMember("total1stMember");
        QMember grade1_1stMember = new QMember("grade1_1stMember");
        QMember grade2_1stMember = new QMember("grade2_1stMember");
        QMember grade3_1stMember = new QMember("grade3_1stMember");
        QMember grade4_1stMember = new QMember("grade4_1stMember");
        QMember avg1stMember = new QMember("avg1stMember");
        QMember highScoreMan = new QMember("highScoreMan");
        QMember highScoreGirl = new QMember("highScoreGirl");

        // CeremonyResp 조회
        CeremonyResp ceremonyResp = queryFactory
                .select(Projections.fields(CeremonyResp.class,
                        ceremony.id.as("ceremonyId"),
                        game.id.as("gameId"),
                        game.name.as("gameName"),
                        game.type.stringValue().as("gameType"),
                        game.date.as("gameDate"),
                        game.time.as("gameTime"),
                        total1stMember.name.as("total1stId"),
                        grade1_1stMember.name.as("grade1_1stId"),
                        grade2_1stMember.name.as("grade2_1stId"),
                        grade3_1stMember.name.as("grade3_1stId"),
                        grade4_1stMember.name.as("grade4_1stId"),
                        avg1stMember.name.as("avg1stId"),
                        highScoreMan.name.as("highScoreOfMan"),
                        highScoreGirl.name.as("highScoreOfGirl")
                ))
                .from(ceremony)
                .leftJoin(game).on(game.id.eq(ceremony.game.id))
                .leftJoin(total1stMember).on(total1stMember.id.eq(ceremony.total1stId))
                .leftJoin(grade1_1stMember).on(grade1_1stMember.id.eq(ceremony.grade1_1stId))
                .leftJoin(grade2_1stMember).on(grade2_1stMember.id.eq(ceremony.grade2_1stId))
                .leftJoin(grade3_1stMember).on(grade3_1stMember.id.eq(ceremony.grade3_1stId))
                .leftJoin(grade4_1stMember).on(grade4_1stMember.id.eq(ceremony.grade4_1stId))
                .leftJoin(avg1stMember).on(avg1stMember.id.eq(ceremony.avg1stId))
                .leftJoin(highScoreMan).on(highScoreMan.id.eq(ceremony.highScoreOfMan))
                .leftJoin(highScoreGirl).on(highScoreGirl.id.eq(ceremony.highScoreOfGirl))
                .where(ceremony.game.id.eq(gameId))
                .fetchOne();

        QCeremonyTeam1st ceremonyTeam1st = QCeremonyTeam1st.ceremonyTeam1st;
        List<Long> team1stIds = queryFactory
                .select(ceremonyTeam1st.team1stId)
                .from(ceremonyTeam1st)
                .where(ceremonyTeam1st.ceremonyId.eq(ceremonyResp.getCeremonyId()))
                .fetch();

        List<String> team1stNames = queryFactory
                .select(member.name)
                .from(member)
                .where(member.id.in(team1stIds))
                .fetch();
        ceremonyResp.setTeam1stNames(team1stNames);

        return ceremonyResp;
    }

}
