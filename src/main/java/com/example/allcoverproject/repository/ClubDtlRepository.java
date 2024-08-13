package com.example.allcoverproject.repository;

import com.example.allcoverproject.entity.QClubDtl;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ClubDtlRepository {

    @Autowired
    private JPAQueryFactory queryFactory;

    public int findMemberAvgByMemberId(Long memberId) {
        QClubDtl clubDtl = QClubDtl.clubDtl;
        return queryFactory
                .select(clubDtl.avg)
                .from(clubDtl)
                .where(clubDtl.member.id.eq(memberId))
                .fetchOne();
    }
}
