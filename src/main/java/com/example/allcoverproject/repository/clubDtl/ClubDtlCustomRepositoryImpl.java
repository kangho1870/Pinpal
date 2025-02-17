package com.example.allcoverproject.repository.clubDtl;

import com.example.allcoverproject.common.object.ClubDtlResp;
import com.example.allcoverproject.entity.ClubDtl;
import com.example.allcoverproject.entity.QClubDtl;
import com.example.allcoverproject.entity.QMember;
import com.querydsl.core.types.Projections;
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
    public List<ClubDtlResp> getClubDtlByClubMstId(Long clubId) {
        QClubDtl clubDtl = QClubDtl.clubDtl;
        QMember member = QMember.member;

        return queryFactory
                .select(Projections.constructor(ClubDtlResp.class,
                        member.id,
                        member.name,
                        member.profile,
                        clubDtl.role,
                        clubDtl.avg,
                        clubDtl.grade,
                        clubDtl.createDate))
                .from(clubDtl)
                .leftJoin(member).on(clubDtl.member.id.eq(member.id))
                .where(clubDtl.clubMst.id.eq(clubId))
                .orderBy(clubDtl.createDate.asc())
                .fetch();
    }
}
