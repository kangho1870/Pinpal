package com.example.allcoverproject.repository.clubDtl;

import com.example.allcoverproject.entity.ClubDtl;
import com.example.allcoverproject.entity.QClubDtl;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ClubDtlCustomRepositoryImpl implements ClubDtlCustomRepository{

    private final JPAQueryFactory queryFactory;

    @Autowired
    public ClubDtlCustomRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }


    @Override
    public ClubDtl getClubDtlByClubIdAndMemberId(Long clubId, Long memberId) {
        QClubDtl clubDtl = QClubDtl.clubDtl;

        return queryFactory
                .selectFrom(clubDtl)
                .where(clubDtl.clubMst.id.eq(clubId).and(clubDtl.member.id.eq(memberId)))
                .fetchOne();
    }

    @Override
    public List<ClubDtl> getClubDtlByClubMstId(Long clubId) {
        QClubDtl clubDtl = QClubDtl.clubDtl;

        return queryFactory
                .selectFrom(clubDtl)
                .where(clubDtl.clubMst.id.eq(clubId))
                .fetch();
    }
}
